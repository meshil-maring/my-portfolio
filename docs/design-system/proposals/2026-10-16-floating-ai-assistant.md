# Proposal: Floating AI assistant (chat widget)

- Date: 2026-10-16
- Status: ACCEPTED (owner request via chat, 2026-10-16) → APPLIED same day
- Affects: component / layout / motion (new feature; no existing tokens or sections changed)
- Version bump: minor

## Problem / opportunity

Visitors (recruiters, clients) want fast answers about Meshil's projects,
skills, services and availability without reading the whole page. An AI
assistant grounded in the portfolio's own data answers those questions in
place, and doubles as a live demo of his "AI Application Engineer" positioning.

## Proposed change

- **Launcher**: fixed bottom-right 48px circle (`ChatWidget`), accent fill,
  `z-50` (above the `z-40` Navbar; the pointer-events-none custom cursor still
  renders over it). Toggles a `role="dialog"` panel; Esc closes; `aria-expanded`
  + `aria-controls` on the button.
- **Panel**: `min(92vw, 380px) × min(68vh,560px)`, `rounded-card`, `bg-surface`,
  1px `border-border`, soft elevation shadow (dark: black-tinted). Header
  (`bg-soft`, sparkles chip, title + subtitle, close button) → scrollable
  messages (`aria-live="polite"`, greeting + 3 suggestion chips when empty,
  user bubbles `bg-accent`/`accent-text` right-aligned, assistant bubbles
  `bg-soft` left-aligned, blinking caret "Thinking…" while streaming, inline
  `role="alert"` error row) → composer (textarea + 44px send/stop button, Enter
  sends / Shift+Enter newline).
- **Backend**: `POST /api/chat` (Next route handler) validates input
  (≤20 messages, ≤2000 chars, must end on a user turn), applies a 12 req/min
  per-IP sliding window, then streams tokens from an OpenAI-compatible
  provider (Groq default; OpenRouter via env) through an SSE→text transform.
  The API key lives only in `.env.local` / server env (`src/lib/env.ts`).
- **Grounding**: system prompt built from `src/data/*.ts`
  (`site`, `projects`, `services`, `skills`, `process`) with a no-hallucination
  rule: answers outside the context defer to the contact sections.
- **Copy**: all UI strings in `src/data/assistant.ts`.

## Light + dark impact

No token changes. All surfaces use existing tokens (`surface`, `soft`,
`accent`, `accent-soft`, `border`, `muted`), so both themes work automatically.
Two one-off hexes only: the launcher shadow and the error text color
(light `#B42318` / dark `#FF8B80`), following the Projects badge precedent.

## Responsive + a11y impact

- Panel width/height are viewport-clamped; fits ≥320px viewports.
- Focus moves to the composer on open; `focus-visible` rings everywhere;
  semantic `role="dialog"`, `aria-label`, `aria-live` replies, `role="alert"`
  errors; Enter/Shift+Enter composer keys; global reduced-motion rule flattens
  the caret blink and scroll smoothing.
- Custom cursor keeps its I-beam over the textarea (existing
  `html.has-custom-cursor input, textarea` rule).

## Alternatives considered

1. **Full /chat page** — heavier navigation for quick questions; rejected.
2. **In-page section only** — not "always available"; rejected for the bubble,
   which can later seed a section entry point.
3. **Non-AI FAQ accordion** — no interactivity/demo value; rejected.
4. **AI SDK (`groq-sdk`/`openai`)** — adds a dependency for one endpoint;
   `fetch` against the OpenAI-compatible API keeps deps at zero and works with
   any provider.

## Decision

Accepted and applied 2026-10-16. Conversation state is session-local (resets
when the panel closes); rate-limit buckets are in-memory (reset on server
restart) — both consistent with the site's stateless, backend-free design.
