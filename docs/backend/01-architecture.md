# 01 – Backend Architecture (AI assistant + RAG)

- Date: 2026-10-17
- Status: ACCEPTED (owner chose the stack: LLM API · Python/FastAPI · PostgreSQL/Supabase · Cloudflare R2 · pgvector · embeddings · approved APIs/web search · React/TypeScript)
- Affects: new `server/` project; `client/src/app/api/chat/route.ts` gains an opt-in proxy mode; the chat widget itself is unchanged.

## Purpose

The floating assistant (proposal `2026-10-16-floating-ai-assistant`) currently
grounds answers by stuffing the whole `src/data/*.ts` content into one system
prompt. That works for a tiny static site but does not scale to resumes, case
studies, project docs, or external references — and it couples the AI to the
frontend build. This backend replaces prompt-stuffing with a proper RAG
pipeline while keeping the visitor experience identical.

## Stack mapping (owner's table → concrete choices)

| Component | Choice | Notes |
|---|---|---|
| AI model | Chat model behind an **OpenAI-compatible API** — Groq by default (`llama-3.3-70b-versatile`), OpenRouter or any compatible provider via env | Same provider style as the current Next route; provider-agnostic by design |
| Backend | **Python 3.11+ / FastAPI / Uvicorn**, async end-to-end (`httpx`, `asyncpg`, SQLAlchemy 2.0 asyncio) | Lives in `server/`, one container |
| Structured personal data | **PostgreSQL (Supabase recommended)** — `profile_sections` table holding the curated JSON that seeds the base system prompt | Supabase gives managed Postgres **with pgvector pre-enabled** |
| Document storage | **Cloudflare R2** (S3-compatible; raw originals mirrored at `documents/{source}`) | Any S3-compatible store works (B2, MinIO, Wasabi) — only the endpoint env changes |
| Semantic search | **PostgreSQL + pgvector**, cosine distance, HNSW index over chunk embeddings | One database for both structured data and vectors — no extra vector DB |
| Embeddings | **OpenAI-compatible `/embeddings` endpoint** — default `text-embedding-3-small` (1536 dims) via OpenAI; swappable to Jina/Voyage/Ollama through env | Dim is configurable; must match the migration |
| External information | **Approved APIs + web search** behind an allowlist seam (`services/websearch.py`, disabled by default) | Only enabled sources may be cited; off until needed |
| Frontend | **React + TypeScript** (Next.js App Router in `client/`) | Talks to FastAPI either directly (CORS) or through the existing `/api/chat` route in proxy mode |

## High-level layout

```
                      ┌────────────────────────────────────────────┐
   Browser            │  client/  (Next.js — React + TypeScript)   │
  ───────────────────▶│  ChatWidget → ChatPanel → POST /api/chat   │
                      └───────────────┬────────────────────────────┘
                                      │  JSON {messages}
                                      │  ◀── text/plain token stream
                      ┌───────────────▼────────────────────────────┐
                      │  server/  (FastAPI)                        │
                      │  api/routes/chat.py    validation → RAG →  │
                      │                          stream            │
                      │  api/routes/ingest.py  admin ingestion     │
                      │  services/retriever.py pgvector search     │
                      │  services/prompting.py persona + context   │
                      └───┬───────────────┬────────────────┬───────┘
                          │               │                │
              ┌───────────▼──┐   ┌────────▼───────┐   ┌────▼──────────┐
              │ PostgreSQL    │   │ Cloudflare R2  │   │ LLM + Embed   │
              │ (Supabase)    │   │ raw documents  │   │ APIs (OpenAI- │
              │ pgvector      │   │ (S3-compatible)│   │ compatible)   │
              └───────────────┘   └────────────────┘   └───────────────┘
```

The Next route (`client/src/app/api/chat/route.ts`) has two modes:

1. **Standalone (today's behavior)** — used when `CHAT_BACKEND_URL` is unset.
   The route answers from `src/data/*.ts` with no backend. Keeps the site
   deployable with zero infrastructure.
2. **Proxy** — when `CHAT_BACKEND_URL` is set, the route validates the request
   (unchanged rules) and forwards to FastAPI, streaming the body straight
   through. The API key then only lives in the FastAPI environment, and the
   browser never needs CORS changes.

In production the browser may also call FastAPI directly (`CORS_ORIGINS`);
both paths are supported, proxy is the default recommendation.

## Request flow (chat)

```
1. ChatPanel POSTs {messages}                 (≤20 msgs, ≤2000 chars, ends on user)
2. Rate limit: sliding window per IP          (12 req/min, in-memory — same as today)
3. Retrieval:
   a. embed the latest user message           (embeddings API)
   b. pgvector cosine search top-k (k=6)      over chunks.embedding
   c. dedupe per document → keep top 4
4. Prompt assembly:
   persona rules + profile_sections (DB JSON) + retrieved chunks w/ [source] labels
5. Stream: chat model → SSE → plain UTF-8 token stream → client
6. Errors map to the existing widget contract: 400 / 429 / 500 / 502 + {error: code}
```

If retrieval returns nothing (empty DB, embedding outage degraded mode) the
assistant still answers from the curated profile sections only — the same
grounding quality as today, never a hard failure.

## Ingestion flow

```
sources                                   pipeline (POST /api/admin/ingest)
───────────────────────────────────────   ──────────────────────────────────
seed/portfolio.json  ─┐
client/src/data/*.ts ─┼─▶ documents row ─▶ chunk (~800 chars, 150 overlap)
case studies (PDF/md)─┤   (content-hash     ─▶ embed batch ─▶ chunks rows
resume, notes …      ─┘   dedupe)            ─▶ mirror raw → R2 documents/{source}
```

- **Hash dedupe:** `documents.content_hash` (sha256) skips unchanged sources
  on re-ingest; changed sources replace their chunks in one transaction.
- **Auth:** `X-Ingest-Token` header compared against `INGEST_TOKEN` env —
  ingest is an owner-only operation, never exposed to visitors.
- **R2 mirror is optional:** ingestion works without R2 configured (Postgres
  holds the text); R2 keeps the original artifact for audit/republish.

## Key decisions

1. **Stateless conversations.** Messages live only in the widget's React state
   (as today); the backend is stateless per request. No chat persistence → no
   PII retention, no auth, no session store. Can be revisited later.
2. **Wire contract preserved.** `POST /api/chat` request/response stays
   byte-compatible with the current Next route (JSON in, `text/plain` token
   stream out, same error codes), so `ChatPanel.tsx` needs no changes to run
   against FastAPI.
3. **OpenAI-compatible everywhere.** LLM and embeddings both speak the
   OpenAI REST shape via `httpx`; swapping providers is env-only, no code.
4. **One database.** Structured profile data + vector chunks share Postgres;
   pgvector avoids a second vector service and keeps re-ingest transactional.
5. **No chat persistence / no analytics.** Consistent with the site's
   privacy-respecting, stateless design.
6. **Web search is an opt-in seam.** `services/websearch.py` is stubbed with an
   allowlist model and disabled by default; the model is only told about it
   when enabled, so prompts never reference tools that do not exist.

## Security

- API keys (`LLM_API_KEY`, `EMBEDDING_API_KEY`, R2 secret) live only in the
  server environment — never in the client bundle (mirrors the
  `client/src/lib/env.ts` rule).
- `INGEST_TOKEN` guards all write paths; compare with `secrets.compare_digest`.
- Input limits identical to the Next route (message count/length, turn order).
- CORS locked to an explicit origin list (`CORS_ORIGINS`), including the
  production site origin.
- R2 bucket stays private (access via S3 API only); no public URLs are minted.
- Per-IP sliding-window rate limit on `/api/chat` (in-memory v1; Redis when
  multi-instance — see roadmap).

## Deployment

- **App:** single container (`uvicorn app.main:app`) → Fly.io / Render /
  Railway / Coolify / Cloud Run. One stateless process; horizontal scaling
  works once rate limiting moves to Redis.
- **Database:** Supabase Postgres (pgvector enabled by default, including on
  the free plan). Any Postgres ≥14 with `CREATE EXTENSION vector` works.
- **Object store:** Cloudflare R2 bucket + API token (S3-compatible).
- **Migrations:** plain SQL in `server/migrations/`, applied with
  `psql $DATABASE_URL -f migrations/0001_init.sql` (or the Supabase SQL editor).

## Roadmap

- **v1 (this scaffold):** chat proxy mode, RAG over portfolio seed data,
  pgvector retrieval, ingestion endpoint + seed script, R2 mirror, rate limit.
- **v2:** hybrid search (pgvector cosine + `tsvector` full-text, reciprocal
  rank fusion); HNSW tuning per data size; ingestion from PDF/DOCX via
  `pypdf`/`unstructured`.
- **v3:** approved web-search tool loop (domain allowlist, citation rendering);
  Redis-backed rate limiting; optional conversation persistence behind an
  explicit consent flag; admin UI for re-ingestion.

