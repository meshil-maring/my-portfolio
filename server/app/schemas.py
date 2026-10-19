"""Pydantic request/response schemas (API contract: docs/backend/03-api-contract.md)."""
from typing import Any, Literal

from pydantic import BaseModel, Field, field_validator, model_validator


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)

    @field_validator("content")
    @classmethod
    def _trim_and_reject_blank(cls, value: str) -> str:
        # Mirrors the Next route: trim, then reject empty-after-trim.
        trimmed = value.strip()
        if not trimmed:
            raise ValueError("content must not be blank")
        return trimmed


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)

    @model_validator(mode="after")
    def _must_end_on_user_turn(self) -> "ChatRequest":
        # Mirrors the Next route: a turn must end on a visitor message,
        # otherwise the model would speak first.
        if self.messages[-1].role != "user":
            raise ValueError("conversation must end on a user message")
        return self


class IngestRequest(BaseModel):
    source: str = Field(min_length=1, max_length=200)
    kind: str = "note"
    title: str | None = None
    content: str = Field(min_length=1)
    metadata: dict[str, Any] = Field(default_factory=dict)
    # Optional: keys to upsert into profile_sections (structured base prompt).
    profile_sections: dict[str, Any] | None = None


class IngestResponse(BaseModel):
    status: Literal["ingested", "unchanged"]
    chunks: int = 0
    r2_key: str | None = None


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    llm_configured: bool
    embeddings_configured: bool
    r2_configured: bool
