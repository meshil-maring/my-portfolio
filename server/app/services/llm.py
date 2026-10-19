"""Chat-completions client — any OpenAI-compatible /chat/completions provider.

Upstream replies as OpenAI SSE; we yield plain text deltas so routes can emit
a plain UTF-8 token stream (no SSE parsing in the browser — same transform the
old Next route did).
"""
import json
from collections.abc import AsyncIterator

import httpx

from app.core.config import get_settings


class LLMError(RuntimeError):
    """Provider unreachable, misconfigured or returned an error."""


async def stream_chat(messages: list[dict[str, str]]) -> AsyncIterator[str]:
    settings = get_settings()
    if not settings.llm_configured:
        raise LLMError("LLM_API_KEY is not configured")

    timeout = httpx.Timeout(settings.llm_timeout_seconds)
    payload = {
        "model": settings.llm_model,
        "stream": True,
        "temperature": settings.llm_temperature,
        "max_tokens": settings.llm_max_tokens,
        "messages": messages,
    }

    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            async with client.stream(
                "POST",
                f"{settings.llm_base_url.rstrip('/')}/chat/completions",
                headers={
                    "Authorization": f"Bearer {settings.llm_api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
            ) as response:
                if response.status_code != 200:
                    await response.aread()
                    raise LLMError(
                        f"LLM provider returned HTTP {response.status_code}: "
                        f"{response.text[:200]}"
                    )
                async for line in response.aiter_lines():
                    line = line.strip()
                    if not line.startswith("data:"):
                        continue  # event names, keep-alives
                    data = line[5:].strip()
                    if data == "[DONE]":
                        break
                    try:
                        parsed = json.loads(data)
                    except json.JSONDecodeError:
                        continue  # partial frame / keep-alive
                    choices = parsed.get("choices") or []
                    if not choices:
                        continue
                    text = (choices[0].get("delta") or {}).get("content")
                    if text:
                        yield text
        except httpx.HTTPError as exc:  # connect/timeout/TLS mid-stream
            raise LLMError(f"LLM provider unreachable: {exc}") from exc
