"""POST /api/chat — streams an AI reply grounded in the portfolio (RAG).

Wire contract is identical to the old Next route (docs/backend/03-api-contract.md):
JSON {messages} in → plain UTF-8 token stream out; errors as {"error": code}
with 400/429/500/502 — so the existing chat widget works unchanged.
"""
import logging

from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse, StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.rate_limit import SlidingWindowRateLimiter
from app.db.session import get_session
from app.schemas import ChatRequest
from app.services.llm import LLMError, stream_chat
from app.services.prompting import build_system_prompt, load_profile
from app.services.retriever import retrieve

logger = logging.getLogger(__name__)
router = APIRouter(tags=["chat"])

_settings = get_settings()
_limiter = SlidingWindowRateLimiter(
    max_requests=_settings.rate_max_requests,
    window_seconds=_settings.rate_window_seconds,
)


def _error(message: str, status: int) -> JSONResponse:
    return JSONResponse({"error": message}, status_code=status)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    first = forwarded.split(",")[0].strip() if forwarded else None
    return first or (request.client.host if request.client else "unknown")


@router.post("/chat")
async def chat(
    request: Request,
    body: ChatRequest,
    session: AsyncSession = Depends(get_session),
):
    settings = get_settings()

    # Cheap abuse protection first (mirrors the Next route's ordering).
    if not _limiter.allow(_client_ip(request)):
        return _error("rate_limited", 429)
    if not settings.llm_configured:
        return _error("not_configured", 500)

    messages = [message.model_dump() for message in body.messages]
    latest_user = next(
        message["content"] for message in reversed(messages) if message["role"] == "user"
    )

    # RAG: retrieve relevant chunks + load the curated profile. Both degrade
    # to empty internally rather than failing the request.
    chunks = await retrieve(session, latest_user)
    profile = await load_profile(session)
    system_prompt = build_system_prompt(profile, chunks)

    upstream_messages = [{"role": "system", "content": system_prompt}, *messages]
    iterator = stream_chat(upstream_messages)
    try:
        # Prime the stream so connection/provider errors surface as a proper
        # 502 before any token is sent (the widget treats those as failures).
        first_token = await anext(iterator)
    except LLMError:
        logger.exception("chat degraded: LLM provider error")
        return _error("upstream_unreachable", 502)

    async def token_stream():
        yield first_token
        try:
            async for token in iterator:
                yield token
        except LLMError:
            # Mid-stream provider failure: stop; the client keeps whatever
            # tokens arrived (an empty stream maps to its generic error).
            logger.exception("chat stream aborted mid-reply")

    return StreamingResponse(
        token_stream(),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-cache, no-transform",
            # Disable proxy buffering so tokens render as they arrive.
            "X-Accel-Buffering": "no",
        },
    )
