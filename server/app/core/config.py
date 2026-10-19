"""Application settings — the ONLY place that reads environment variables.

Mirrors the client-side rule in client/src/lib/env.ts: secrets never leave the
server environment. Values come from .env (see .env.example) or the process env.
"""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # App
    cors_origins: str = "http://localhost:3000"
    ingest_token: str = ""

    # Database (PostgreSQL / Supabase with pgvector)
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/portfolio"

    # Chat LLM — any OpenAI-compatible /chat/completions provider
    llm_api_key: str = ""
    llm_base_url: str = "https://api.groq.com/openai/v1"
    llm_model: str = "llama-3.3-70b-versatile"
    llm_max_tokens: int = 512
    llm_temperature: float = 0.4
    llm_timeout_seconds: float = 30.0

    # Embeddings — any OpenAI-compatible /embeddings provider
    embedding_api_key: str = ""
    embedding_base_url: str = "https://api.openai.com/v1"
    embedding_model: str = "text-embedding-3-small"
    embedding_dims: int = 1536
    embedding_timeout_seconds: float = 30.0

    # Cloudflare R2 / S3-compatible object storage (optional mirror)
    r2_account_id: str = ""
    r2_bucket: str = ""
    r2_access_key_id: str = ""
    r2_secret_access_key: str = ""

    # Retrieval / chunking
    retrieval_top_k: int = 6
    retrieval_keep: int = 4
    chunk_size: int = 800
    chunk_overlap: int = 150

    # Rate limiting (per-IP sliding window on /api/chat)
    rate_window_seconds: int = 60
    rate_max_requests: int = 12

    # ---- Derived helpers -------------------------------------------------
    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def llm_configured(self) -> bool:
        return bool(self.llm_api_key)

    @property
    def embeddings_configured(self) -> bool:
        return bool(self.embedding_api_key)

    @property
    def r2_endpoint(self) -> str:
        if not self.r2_account_id:
            return ""
        return f"https://{self.r2_account_id}.r2.cloudflarestorage.com"

    @property
    def r2_configured(self) -> bool:
        return bool(
            self.r2_endpoint and self.r2_bucket and self.r2_access_key_id and self.r2_secret_access_key
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
