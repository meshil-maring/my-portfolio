"""Embeddings client — any OpenAI-compatible /embeddings provider."""
import httpx

from app.core.config import get_settings


class EmbeddingError(RuntimeError):
    """Provider unreachable or misbehaving."""


async def embed_texts(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    settings = get_settings()
    if not settings.embeddings_configured:
        raise EmbeddingError("EMBEDDING_API_KEY is not configured")

    async with httpx.AsyncClient(timeout=settings.embedding_timeout_seconds) as client:
        try:
            response = await client.post(
                f"{settings.embedding_base_url.rstrip('/')}/embeddings",
                headers={"Authorization": f"Bearer {settings.embedding_api_key}"},
                json={"model": settings.embedding_model, "input": texts},
            )
        except httpx.HTTPError as exc:  # connect/timeout/TLS
            raise EmbeddingError(f"embeddings provider unreachable: {exc}") from exc

    if response.status_code != 200:
        raise EmbeddingError(
            f"embeddings provider returned HTTP {response.status_code}: {response.text[:200]}"
        )

    data = response.json().get("data", [])
    rows = sorted(data, key=lambda item: item.get("index", 0))
    vectors = [row["embedding"] for row in rows]
    if len(vectors) != len(texts):
        raise EmbeddingError("embeddings provider returned an unexpected vector count")
    return vectors


async def embed_query(text: str) -> list[float]:
    return (await embed_texts([text]))[0]
