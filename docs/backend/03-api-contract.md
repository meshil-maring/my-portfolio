# 03 – Backend API Contract & Frontend Integration

- Date: 2026-10-17
- Status: ACCEPTED (implements `01-architecture.md`)
- Base URL: `http://localhost:8000` (dev) · deployed FastAPI URL (prod)

## Endpoints

### `GET /api/health`

Liveness + config summary (no secrets). `200` always when the process is up.

```json
{ "status": "ok", "llm_configured": true, "embeddings_configured": true, "r2_configured": false }
```

### `POST /api/chat`

**Identical wire contract to the current Next route** — the widget keeps
working unchanged.

Request:

```json
{ "messages": [ { "role": "user" | "assistant", "content": "..." } ] }
```

Validation (400 `bad_request` if any fails): 1–20 messages; each 1–2000
trimmed chars; roles only `user`/`assistant`; last message must be `user`.

Response: `200`, `Content-Type: text/plain; charset=utf-8`, body = the reply
streamed as plain UTF-8 tokens (no SSE parsing in the browser). Headers:
`Cache-Control: no-cache, no-transform`, `X-Accel-Buffering: no`.

Errors — **same codes the widget already maps** (`client/src/data/assistant.ts`):

| Status | `{error}` code | Cause |
|---|---|---|
| 400 | `bad_request` | Body failed validation |
| 429 | `rate_limited` | >12 requests/min per IP (sliding window) |
| 500 | `not_configured` | `LLM_API_KEY` missing |
| 502 | `upstream_unreachable` / `upstream_error` | LLM provider down / bad response |

Client IP is taken from the first `X-Forwarded-For` entry (set by the platform
proxy) falling back to the socket peer — the proxy mode forwards the header.

### `POST /api/admin/ingest`

Owner-only. Header `X-Ingest-Token: $INGEST_TOKEN` (constant-time compare;
401 `unauthorized` otherwise).

```json
{
  "source": "case-study:epm",
  "kind": "case_study",
  "title": "EPM Staffing Services case study",
  "content": "full markdown/plain text…",
  "metadata": { "slug": "epm-staffing-services" },
  "profile_sections": { "projects": [ … ] }
}
```

- `content` + `source` required. Unchanged `content_hash` → `304`-style no-op
  (`{"status":"unchanged"}`).
- `profile_sections` (optional): keys → JSON values upserted into
  `profile_sections` (used by the seed script to load the structured profile).
- Response `200`: `{ "status": "ingested", "chunks": 7, "r2_key": "documents/…" }`.

## Frontend integration

### Option A — Next proxy (default, no CORS)

`client/.env.local`:

```
CHAT_BACKEND_URL=http://localhost:8000
```

With this set, `app/api/chat/route.ts` validates as before, then forwards to
`$CHAT_BACKEND_URL/api/chat` and streams the response straight through.
Unset → today's standalone behavior, byte-for-byte. The `AI_*` keys are only
needed in standalone mode.

### Option B — direct browser → FastAPI

Set `CORS_ORIGINS=http://localhost:3000,https://your-domain.dev` on the
server and point `ChatPanel.tsx`'s fetch at the FastAPI URL. One less hop,
but every deploy origin must be listed in CORS.

### Migration order

1. `docker`/local Postgres + `0001_init.sql` → run `server/` → `scripts/seed.py`
2. Set `CHAT_BACKEND_URL` in the client → assistant now answers via RAG
3. Remove `AI_*` keys from the client env (no longer used in proxy mode)
4. Deploy server, set envs (Supabase `DATABASE_URL`, R2, provider keys)
