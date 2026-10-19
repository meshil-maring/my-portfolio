# 02 – Backend Data Model (PostgreSQL + pgvector + R2)

- Date: 2026-10-17
- Status: ACCEPTED (implements `01-architecture.md`)
- Schema lives in `server/migrations/0001_init.sql`; models in
  `server/app/models.py` (SQLAlchemy 2.0 + `pgvector.sqlalchemy`).

## Principles

1. **One database.** Curated profile JSON and vector chunks share Postgres —
   re-ingest stays transactional, no second store to keep in sync.
2. **Documents vs chunks.** `documents` = one logical source (a seed export, a
   case study, the resume). `chunks` = embeddable slices of a document; only
   chunks carry vectors.
3. **Everything mutable is replaceable.** Re-ingesting a source with changed
   content deletes its chunks and rewrites them in one transaction. Content
   hashing makes no-op re-ingests free.
4. **No visitor data.** Conversations are never stored (see architecture §Key
   decisions), so the schema contains only owner-authored knowledge.

## Tables

### `documents`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `source` | `text` UNIQUE | Stable slug, e.g. `portfolio:projects`, `case-study:epm`, `resume` |
| `kind` | `text` | `profile` · `project` · `service` · `case_study` · `resume` · `note` |
| `title` | `text` | Human label used in `[source]` prompt headers |
| `content` | `text` | Full plain-text/markdown content |
| `content_hash` | `text` | sha256 of `content` — dedupe key |
| `r2_key` | `text` NULL | Object key of the raw mirror in R2, if mirrored |
| `metadata` | `jsonb` | Free-form (slug, urls, status, …) |
| `created_at` / `updated_at` | `timestamptz` | |

### `chunks`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` PK | |
| `document_id` | `uuid` FK → `documents.id` ON DELETE CASCADE | |
| `ordinal` | `int` | Position within the document |
| `content` | `text` | ~800 chars, 150-char overlap between neighbours |
| `metadata` | `jsonb` | Chunk-level extras (section title, page, …) |
| `embedding` | `vector(1536)` | **Must equal `EMBEDDING_DIMS` env** |

- Index: `CREATE INDEX chunks_embedding_hnsw_idx ON chunks USING hnsw
  (embedding vector_cosine_ops);` — HNSW beats IVFFlat for a small corpus that
  grows by appends (no reindex step after ingests).

### `profile_sections`

| Column | Type | Notes |
|---|---|---|
| `key` | `text` PK | `persona`, `site`, `about`, `projects`, `services`, `skills`, `process`, `contact` |
| `data` | `jsonb` | Curated content mirroring `client/src/data/*.ts` |
| `updated_at` | `timestamptz` | |

`profile_sections` is the structured counterpart of the old
`buildSystemPrompt()`: every chat request loads all sections and the prompt
builder embeds them verbatim. It answers "who is he" without retrieval;
`chunks` answer "tell me about <specific thing>" via pgvector.

## R2 layout (optional mirror)

```
documents/
  portfolio:site.json          ← raw seed payloads, one object per source
  portfolio:projects.json
  portfolio:services.json
  portfolio:skills.json
  portfolio:process.json
  resume.pdf                   ← future binary originals
  case-study:epm.md
```

- Bucket stays **private**; access only via the S3 API from the backend.
- `documents.r2_key` records the mirror path; deleting the row's R2 object is
  safe at any time (Postgres is the source of truth for retrieval).

## Seed data

`server/seed/portfolio.json` mirrors `client/src/data/*.ts` (site, projects,
services, skills, process, about) as ingest payloads. `scripts/seed.py` posts
each entry to `POST /api/admin/ingest`. Workflow after editing frontend data:

1. Update the corresponding entry in `server/seed/portfolio.json`
   (or export it fresh from the TS files).
2. `python scripts/seed.py` — unchanged sources are skipped by hash; changed
   sources get new chunks; `profile_sections` rows are upserted.
