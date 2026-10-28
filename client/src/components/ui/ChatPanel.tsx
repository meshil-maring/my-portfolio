"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Maximize2, Minimize2, Send, Sparkles, Square, X } from "lucide-react";
import { assistant } from "@/data/assistant";
import { cn } from "@/lib/cn";
import type { ChatMessage } from "@/types/chat";

interface ChatPanelProps {
  onClose: () => void;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

// Field styling mirrors DiscussProject's fieldClass (design-system §05:
// 44px min touch target, 8px radius, border + accent focus ring).
const fieldClass =
  "w-full min-h-[44px] rounded-btn border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

const bubbleClass =
  "max-w-[85%] whitespace-pre-wrap break-words px-3 py-2 text-sm leading-relaxed";

// Floating assistant panel (proposal 2026-10-16). Streams replies from
// POST /api/chat; the conversation lives only in this component's state and
// resets when the panel closes. The dialog is non-modal (Esc handled by the
// launcher in ChatWidget), so page content stays usable behind it.
const COOKIE_NAME = "chat_conversation";
const COOKIE_DAYS = 7;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}


export function ChatPanel({
  onClose,
  fullscreen = false,
  onToggleFullscreen,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const accumulatedRef = useRef("");
  const displayedRef = useRef("");
  const typingRef = useRef<number | null>(null);

  function stopTyping() {
    if (typingRef.current !== null) {
      window.clearInterval(typingRef.current);
      typingRef.current = null;
    }
  }

  // Focus the composer as soon as the panel opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Abort any in-flight stream if the panel unmounts (closed or navigated).
  useEffect(() => () => {
    abortRef.current?.abort();
    stopTyping();
  }, []);

  // Restore conversation from cookie on mount.
  useEffect(() => {
    const raw = readCookie(COOKIE_NAME);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) setMessages(parsed);
      } catch {
        // ignore corrupt cookie
      }
    }
    setLoaded(true);
  }, []);

  // Persist conversation to cookie whenever it changes.
  useEffect(() => {
    if (!loaded) return;
    try {
      writeCookie(COOKIE_NAME, JSON.stringify(messages), COOKIE_DAYS);
    } catch {
      // ignore quota/serialization errors
    }
  }, [messages, loaded]);

  // Keep the newest message in view while streaming.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, error]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || status === "sending") return;

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setStatus("sending");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      let serverMessage: string | null = null;
      if (!res.ok) {
        try {
          const data = (await res.json()) as { message?: unknown };
          if (typeof data?.message === "string") serverMessage = data.message;
        } catch {
          // body may be empty or non-JSON
        }
      }

      if (res.status === 429)
        throw new Error(serverMessage ?? assistant.rateLimitedMessage);
      if (res.status === 500)
        throw new Error(serverMessage ?? assistant.notConfiguredMessage);
      if (!res.ok || !res.body) throw new Error(assistant.errorMessage);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      accumulatedRef.current = "";
      displayedRef.current = "";

      // Reveal the incoming text word-by-word so the reply feels live
      // instead of appearing all at once when the stream finishes.
      typingRef.current = window.setInterval(() => {
        if (displayedRef.current.length < accumulatedRef.current.length) {
          const nextSpace = accumulatedRef.current.indexOf(" ", displayedRef.current.length);
          const end =
            nextSpace === -1 ? accumulatedRef.current.length : nextSpace + 1;
          displayedRef.current = accumulatedRef.current.slice(0, end);
          setMessages([...history, { role: "assistant", content: displayedRef.current }]);
        }
      }, 35);

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulatedRef.current += decoder.decode(value, { stream: true });
      }

      // Make sure the full reply is shown once the stream ends.
      stopTyping();
      displayedRef.current = accumulatedRef.current;
      setMessages([...history, { role: "assistant", content: displayedRef.current }]);

      // Stream opened but produced nothing — surface the generic error.
      if (!accumulatedRef.current.trim()) throw new Error(assistant.errorMessage);
    } catch (err) {
      stopTyping();
      const aborted = err instanceof DOMException && err.name === "AbortError";
      // Drop a placeholder that never received tokens; keep partial output.
      setMessages((current) => {
        const last = current[current.length - 1];
        return last?.role === "assistant" && !last.content.trim() ? history : current;
      });
      if (!aborted) {
        setError(err instanceof Error && err.message ? err.message : assistant.errorMessage);
      }
    } finally {
      abortRef.current = null;
      setStatus("idle");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift+Enter inserts a newline.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  const sending = status === "sending";
  const lastMessage = messages[messages.length - 1];
  const showThinking =
    sending && lastMessage?.role === "assistant" && lastMessage.content === "";

  return (
    <div
      id="ai-assistant-panel"
      role="dialog"
      aria-label={assistant.panelTitle}
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-surface shadow-[0_16px_48px_rgba(20,50,32,0.18)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.45)]",
        fullscreen
          ? "fixed inset-3 z-50 rounded-card sm:inset-6"
          : "h-[min(68vh,560px)] w-[min(92vw,380px)] rounded-card",
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-border bg-soft px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight text-text">
              {assistant.panelTitle}
            </p>
            <p className="text-[11px] leading-tight text-muted">
              {assistant.panelSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {onToggleFullscreen && (
            <button
              type="button"
              aria-label={
                fullscreen
                  ? assistant.exitFullscreenLabel
                  : assistant.fullscreenLabel
              }
              onClick={onToggleFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-soft hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {fullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
          <button
            type="button"
            aria-label={assistant.closeLabel}
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-soft hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div
              className={cn(
                bubbleClass,
                "mr-auto rounded-card border border-border bg-soft text-text",
              )}
            >
              {assistant.greeting}
            </div>
            <div className="flex flex-wrap gap-2">
              {assistant.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void send(suggestion)}
                  disabled={sending}
                  className="rounded-chip border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={cn(
                bubbleClass,
                message.role === "user"
                  ? "ml-auto rounded-card bg-accent text-accent-text"
                  : "mr-auto rounded-card border border-border bg-soft text-text",
              )}
            >
              {message.content ||
                (index === messages.length - 1 && showThinking ? (
                  <span className="text-muted">
                    {assistant.thinking}
                    <span className="ml-0.5 inline-block animate-caret-blink text-accent">
                      ▍
                    </span>
                  </span>
                ) : (
                  ""
                ))}
            </div>
          ))
        )}

        {error && (
          <p
            role="alert"
            className="rounded-chip border border-border bg-soft px-3 py-2 text-xs text-[#B42318] dark:text-[#FF8B80]"
          >
            {error}
          </p>
        )}
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="border-t border-border p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleComposerKeyDown}
            rows={1}
            maxLength={2000}
            placeholder={assistant.placeholder}
            aria-label={assistant.placeholder}
            className={cn(fieldClass, "max-h-24 flex-1 resize-none py-2.5")}
          />
          <button
            type={sending ? "button" : "submit"}
            aria-label={sending ? assistant.stopLabel : assistant.sendLabel}
            onClick={sending ? () => abortRef.current?.abort() : undefined}
            disabled={!sending && !input.trim()}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-btn transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              sending
                ? "border border-border bg-surface text-text hover:border-accent"
                : "bg-accent text-accent-text hover:opacity-90 disabled:opacity-40",
            )}
          >
            {sending ? (
              <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
