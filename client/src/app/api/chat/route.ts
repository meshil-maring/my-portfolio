// POST /api/chat — streams an AI reply grounded in this portfolio.
// The provider key never leaves the server: the browser only ever talks to
// this route. Any OpenAI-compatible endpoint works (Groq/OpenRouter via env).
//
// Upstream replies as OpenAI SSE; we re-emit a plain UTF-8 token stream so the
// client can simply append decoded chunks (no SSE parsing in the browser).
import type { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/assistant-prompt";
import { env } from "@/lib/env";
import type { ChatMessage } from "@/types/chat";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const UPSTREAM_TIMEOUT_MS = 30_000;

// Simple per-IP sliding-window limit (in-memory: resets with the server,
// which matches this site's stateless deployment).
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 12;
const requestLog = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    requestLog.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestLog.set(ip, recent);
  // Bound memory: drop stale buckets once the map grows.
  if (requestLog.size > 1_000) {
    for (const [key, times] of requestLog) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) requestLog.delete(key);
    }
  }
  return false;
}

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

// Validates the request body and returns a clean message history, or null.
function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null;

  const messages: ChatMessage[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_CHARS) return null;
    messages.push({ role, content: trimmed });
  }
  // A turn must end on a visitor message (otherwise the model speaks first).
  if (messages[messages.length - 1].role !== "user") return null;
  return messages;
}

// Decodes the upstream OpenAI-style SSE byte stream into a plain text stream
// of assistant tokens.
function sseToTextStream(source: ReadableStream<Uint8Array>): ReadableStream<string> {
  const decoder = new TextDecoder();
  let buffer = "";

  return source.pipeThrough(
    new TransformStream<Uint8Array, string>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[];
            };
            const text = parsed.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(text);
          } catch {
            // Ignore keep-alives / partial frames.
          }
        }
      },
    }),
  );
}

export async function POST(req: NextRequest) {
  // Order matters: cheap abuse protection first, then input validation
  // (a malformed request must fail with 400 even when unconfigured),
  // then configuration, then the upstream call.
  const ip = clientIp(req);
  if (isRateLimited(ip)) return error("rate_limited", 429);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error("bad_request", 400);
  }
  const messages = parseMessages(body);
  if (!messages) return error("bad_request", 400);

  // Proxy mode (docs/backend/03-api-contract.md): when CHAT_BACKEND_URL is
  // set, the FastAPI backend owns the key + RAG; this route stays a thin
  // validating pass-through with the exact same wire contract. The visitor
  // IP is forwarded so the backend's per-IP rate limit stays accurate.
  if (env.chatBackendUrl) {
    let backend: Response;
    try {
      backend = await fetch(`${env.chatBackendUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
        body: JSON.stringify({ messages }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });
    } catch {
      return error("upstream_unreachable", 502);
    }
    if (!backend.ok || !backend.body) {
      if (backend.status === 500) {
        return Response.json(
          {
            error: "not_configured",
            message:
              "The assistant backend isn't configured — set LLM_API_KEY (and EMBEDDING_API_KEY) in the backend's environment, then redeploy.",
          },
          { status: 500 },
        );
      }
      return error("upstream_error", 502);
    }
    return new Response(backend.body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  }

  // Standalone mode: the AI key is required to answer directly.
  if (!env.aiApiKey) {
    return Response.json(
      {
        error: "not_configured",
        message:
          "The assistant isn't configured — set AI_API_KEY in your hosting environment (or CHAT_BACKEND_URL to use the backend).",
      },
      { status: 500 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${env.aiBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.aiApiKey}`,
      },
      body: JSON.stringify({
        model: env.aiModel,
        stream: true,
        temperature: 0.4,
        max_tokens: 512,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return error("upstream_unreachable", 502);
  }

  if (!upstream.ok || !upstream.body) {
    return error("upstream_error", 502);
  }

  return new Response(sseToTextStream(upstream.body), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      // Disable proxy buffering so tokens render as they arrive.
      "X-Accel-Buffering": "no",
    },
  });
}
