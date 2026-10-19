"""GET /api/health — liveness + config summary (no secrets)."""
from fastapi import APIRouter

from app.core.config import get_settings
from app.schemas import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(
        llm_configured=settings.llm_configured,
        embeddings_configured=settings.embeddings_configured,
        r2_configured=settings.r2_configured,
    )
