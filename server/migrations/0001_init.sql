-- Portfolio AI backend — initial schema.
-- Docs: docs/backend/02-data-model.md
-- Apply with:  psql "$DATABASE_URL" -f migrations/0001_init.sql
-- (Supabase: paste into the SQL editor.) Requires the pgvector extension.

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- gen_random_uuid() on PG < 13

-- One logical source of knowledge (seed export, case study, resume, ...).
CREATE TABLE IF NOT EXISTS documents (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source       text NOT NULL UNIQUE,          -- stable slug, e.g. 'portfolio:projects'
    kind         text NOT NULL DEFAULT 'note',  -- profile | project | service | case_study | resume | note
    title        text NOT NULL,
    content      text NOT NULL,
    content_hash text NOT NULL,                 -- sha256(content) — re-ingest dedupe key
    r2_key       text,                          -- raw mirror in R2 (optional)
    metadata     jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS documents_content_hash_idx ON documents (content_hash);

-- Embeddable slices of a document; only chunks carry vectors.
CREATE TABLE IF NOT EXISTS chunks (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id uuid NOT NULL REFERENCES documents (id) ON DELETE CASCADE,
    ordinal     integer NOT NULL,
    content     text NOT NULL,
    metadata    jsonb NOT NULL DEFAULT '{}'::jsonb,
    embedding   vector(1024),                   -- MUST match EMBEDDING_DIMS env
    UNIQUE (document_id, ordinal)
);

-- HNSW: no rebuild step needed as chunks are appended/replaced by ingestion.
CREATE INDEX IF NOT EXISTS chunks_embedding_hnsw_idx
    ON chunks USING hnsw (embedding vector_cosine_ops);

-- Curated structured profile (base system prompt) — mirrors client/src/data.
CREATE TABLE IF NOT EXISTS profile_sections (
    key        text PRIMARY KEY,                -- site | about | contact | projects | ...
    data       jsonb NOT NULL DEFAULT '{}'::jsonb,
    updated_at timestamptz NOT NULL DEFAULT now()
);
