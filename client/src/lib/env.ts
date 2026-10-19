// Server-only environment access — the ONLY place that reads process.env
// (docs/architecture/05 rule 8.5, mirrored here for Next's server runtime).
// NEVER import this from a client component: none of these keys may reach
// the browser bundle. The AI key stays behind app/api/chat/route.ts.
export const env = {
  /** OpenAI-compatible provider key (Groq, OpenRouter, ...). */
  aiApiKey: process.env.AI_API_KEY,
  /** OpenAI-compatible base URL, no trailing slash. */
  aiBaseUrl: process.env.AI_BASE_URL ?? "https://api.groq.com/openai/v1",
  /** Chat model id served by the provider above. */
  aiModel: process.env.AI_MODEL ?? "llama-3.3-70b-versatile",
  /**
   * FastAPI RAG backend (server/). When set, /api/chat validates the request
   * and proxies to `$CHAT_BACKEND_URL/api/chat` instead of answering locally
   * (docs/backend/03-api-contract.md). Unset → standalone mode.
   */
  chatBackendUrl: process.env.CHAT_BACKEND_URL,
} as const;
