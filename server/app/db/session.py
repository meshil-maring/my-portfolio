"""Async SQLAlchemy engine/session factory."""
from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import get_settings


def _normalize_url(url: str) -> str:
    # Supabase hands out postgres:// URLs; asyncpg needs postgresql+asyncpg://.
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    return url


settings = get_settings()
# pool_pre_ping: recover cleanly from idle-connection drops (Supabase).
engine = create_async_engine(_normalize_url(settings.database_url), pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_session() -> AsyncIterator[AsyncSession]:
    """FastAPI dependency yielding one session per request."""
    async with SessionLocal() as session:
        yield session
