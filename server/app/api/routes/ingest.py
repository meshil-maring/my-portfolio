"""POST /api/admin/ingest — owner-only knowledge ingestion (docs/backend/02).

Upserts profile_sections, then (re)chunks + embeds the document content into
pgvector, mirroring the raw text to R2 when configured. Unchanged content
(hash dedupe) is a no-op.
"""
import asyncio
import hashlib
import logging
import secrets
import uuid

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.db.session import get_session
from app.models import Chunk, Document, ProfileSection
from app.schemas import IngestRequest, IngestResponse
from app.services.chunking import chunk_text
from app.services.embeddings import EmbeddingError, embed_texts
from app.services.storage import mirror_raw

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["admin"])


def _error(message: str, status: int) -> JSONResponse:
    return JSONResponse({"error": message}, status_code=status)


async def _upsert_profile_sections(
    session: AsyncSession, sections: dict
) -> None:
    for key, data in sections.items():
        section = await session.get(ProfileSection, key)
        if section is None:
            session.add(ProfileSection(key=key, data=data))
        else:
            section.data = data
    await session.flush()


@router.post("/ingest")
async def ingest(
    body: IngestRequest,
    x_ingest_token: str | None = Header(default=None, alias="X-Ingest-Token"),
    session: AsyncSession = Depends(get_session),
):
    settings = get_settings()

    # Constant-time token check; ingest disabled entirely when unset.
    expected = settings.ingest_token
    if not expected or not x_ingest_token or not secrets.compare_digest(
        x_ingest_token, expected
    ):
        return _error("unauthorized", 401)

    content = body.content.strip()
    content_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()

    if body.profile_sections:
        await _upsert_profile_sections(session, body.profile_sections)

    document = (
        await session.execute(select(Document).where(Document.source == body.source))
    ).scalar_one_or_none()

    if document is not None and document.content_hash == content_hash:
        await session.commit()  # keep any profile-section upserts
        return IngestResponse(status="unchanged", chunks=0, r2_key=document.r2_key)

    pieces = chunk_text(
        content, size=settings.chunk_size, overlap=settings.chunk_overlap
    )
    try:
        vectors = await embed_texts(pieces)
    except EmbeddingError:
        logger.exception("ingest failed: embeddings provider error")
        await session.rollback()
        return _error("embeddings_unreachable", 502)

    if document is None:
        document = Document(
            id=uuid.uuid4(),
            source=body.source,
            kind=body.kind,
            title=body.title or body.source,
            content=content,
            content_hash=content_hash,
            metadata_=body.metadata,
        )
        session.add(document)
        await session.flush()
    else:
        document.kind = body.kind
        document.title = body.title or document.title
        document.content = content
        document.content_hash = content_hash
        document.metadata_ = body.metadata
        await session.execute(
            delete(Chunk).where(Chunk.document_id == document.id)
        )

    for ordinal, (piece, vector) in enumerate(zip(pieces, vectors, strict=True)):
        session.add(
            Chunk(
                id=uuid.uuid4(),
                document_id=document.id,
                ordinal=ordinal,
                content=piece,
                embedding=vector,
            )
        )

    # Blocking boto3 call → threadpool. Failure here never fails ingestion:
    # Postgres remains the source of truth for retrieval.
    try:
        r2_key = await asyncio.to_thread(
            mirror_raw,
            f"documents/{body.source}",
            content.encode("utf-8"),
            "text/plain; charset=utf-8",
        )
    except Exception:
        logger.exception("R2 mirror failed (ingestion continues without it)")
        r2_key = None

    if r2_key:
        document.r2_key = r2_key
    await session.commit()
    return IngestResponse(status="ingested", chunks=len(pieces), r2_key=r2_key)
