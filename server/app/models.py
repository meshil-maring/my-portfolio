"""ORM models — mirror server/migrations/0001_init.sql (docs/backend/02-data-model.md)."""
import uuid
from datetime import datetime
from typing import Any

from pgvector.sqlalchemy import Vector
from sqlalchemy import DateTime, ForeignKey, Integer, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.core.config import get_settings


class Base(DeclarativeBase):
    pass


class Document(Base):
    """One logical knowledge source (seed export, case study, resume, ...)."""

    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    source: Mapped[str] = mapped_column(Text, unique=True)
    kind: Mapped[str] = mapped_column(Text, default="note")
    title: Mapped[str] = mapped_column(Text)
    content: Mapped[str] = mapped_column(Text)
    content_hash: Mapped[str] = mapped_column(Text, index=True)
    r2_key: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Named metadata_ because ORMBase.metadata is taken by SQLAlchemy.
    metadata_: Mapped[dict[str, Any]] = mapped_column("metadata", JSONB, default=dict)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    chunks: Mapped[list["Chunk"]] = relationship(
        back_populates="document", cascade="all, delete-orphan"
    )


class Chunk(Base):
    """Embeddable slice of a document; carries the pgvector embedding."""

    __tablename__ = "chunks"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    document_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE")
    )
    ordinal: Mapped[int] = mapped_column(Integer)
    content: Mapped[str] = mapped_column(Text)
    metadata_: Mapped[dict[str, Any]] = mapped_column("metadata", JSONB, default=dict)
    # Dim must match EMBEDDING_DIMS and migrations/0001_init.sql.
    embedding: Mapped[list[float]] = mapped_column(
        Vector(get_settings().embedding_dims)
    )

    document: Mapped[Document] = relationship(back_populates="chunks")


class ProfileSection(Base):
    """Curated structured profile feeding the base system prompt."""

    __tablename__ = "profile_sections"

    key: Mapped[str] = mapped_column(Text, primary_key=True)
    data: Mapped[dict[str, Any]] = mapped_column(JSONB, default=dict)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
