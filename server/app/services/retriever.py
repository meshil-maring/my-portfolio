"""pgvector retrieval: embed the query → cosine top-k → dedupe per document."""
import logging
from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models import Chunk, Document
from app.services.embeddings import embed_query

logger = logging.getLogger(__name__)


@dataclass
class RetrievedChunk:
    source: str
    title: str
    kind: str
    content: str
    score: float  # cosine similarity (1 - cosine distance), higher = closer


async def retrieve(session: AsyncSession, query: str) -> list[RetrievedChunk]:
    """Best chunk per matching document, closest first.

    Degrades to an empty list on any failure (missing key, provider down):
    the prompt then falls back to the curated profile sections only — the
    documented never-a-hard-failure behavior (01-architecture.md §Request flow).
    """
    settings = get_settings()
    try:
        query_vector = await embed_query(query)
    except Exception:
        logger.exception("retrieval degraded: embedding the query failed")
        return []

    distance = Chunk.embedding.cosine_distance(query_vector)
    stmt = (
        select(Chunk, Document, distance.label("distance"))
        .join(Document, Chunk.document_id == Document.id)
        .order_by(distance)
        .limit(settings.retrieval_top_k)
    )

    try:
        rows = (await session.execute(stmt)).all()
    except Exception:
        logger.exception("retrieval degraded: vector search failed")
        return []

    best: dict[str, RetrievedChunk] = {}
    for chunk, document, dist in rows:
        if document.source in best:
            continue  # keep the closest chunk per document
        best[document.source] = RetrievedChunk(
            source=document.source,
            title=document.title,
            kind=document.kind,
            content=chunk.content,
            score=1.0 - float(dist),
        )
        if len(best) >= settings.retrieval_keep:
            break
    return list(best.values())
