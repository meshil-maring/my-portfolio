# server — Portfolio AI backend (Python + FastAPI + pgvector)

RAG backend for the portfolio's floating AI assistant. Architecture:
`docs/backend/01-architecture.md` · Data model: `docs/backend/02-data-model.md`
· API contract: `docs/backend/03-api-contract.md`.

Stack: FastAPI · PostgreSQL/Supabase (pgvector) · Cloudflare R2 (optional raw
mirror) · OpenAI-compatible LLM + embeddings APIs.

## Setup

```bash
cd server
py -m venv .venv            # or: python3 -m venv .venv
.venv\Scripts\activate      # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env      # then fill in keys (see table below)
```

Apply the schema (needs Postgres ≥14 with pgvector — Supabase has it on by default):

```bash
psql "$DATABASE_URL" -f migrations/0001_init.sql
# Supabase: paste migrations/0001_init.sql into the SQL editor instead.
```

Run + seed:

```bash
uvicorn app.main:app --reload --port 8000
python scripts/seed.py --token "$INGEST_TOKEN"
curl http://localhost:8000/api/health
```

Try it:

```bash
curl -N -X POST http://localhost:8000/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"What projects has he built?\"}]}"
```

(`^` is the PowerShell line-continuation; use `\` on macOS/Linux.)

## Environment (`.env`)

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `LLM_API_KEY` | yes (chat) | — | OpenAI-compatible chat provider (Groq by default) |
| `LLM_BASE_URL` / `LLM_MODEL` | no | Groq / `llama-3.3-70b-versatile` | Provider + model |
| `EMBEDDING_API_KEY` | yes (RAG) | — | OpenAI-compatible embeddings (default `text-embedding-3-small`, 1536 dims) |
| `EMBEDDING_BASE_URL` / `EMBEDDING_MODEL` / `EMBEDDING_DIMS` | no | OpenAI / `text-embedding-3-small` / `1536` | Dim must match `vector(n)` in the migration |
| `DATABASE_URL` | yes | local Postgres | Supabase session/pooler URL works as-is |
| `INGEST_TOKEN` | for writes | — | `X-Ingest-Token` for `/api/admin/ingest`; empty = ingestion disabled |
| `CORS_ORIGINS` | no | `http://localhost:3000` | Direct browser→FastAPI mode |
| `R2_ACCOUNT_ID` / `R2_BUCKET` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | no | — | Raw-document mirror in Cloudflare R2 |

## Connect the frontend

In `client/.env.local`:

```
CHAT_BACKEND_URL=http://localhost:8000
```

The existing `/api/chat` Next route then proxies to this server (same wire
contract, widget unchanged). See `docs/backend/03-api-contract.md` for the
direct browser→FastAPI alternative.

## Notes

- Conversations are never stored (stateless by design).
- Without embeddings/DB configured, chat still answers from whatever
  `profile_sections` exists (or degrades gracefully) — but seed first.
- Re-ingesting after editing `seed/portfolio.json` is idempotent (hash dedupe).
