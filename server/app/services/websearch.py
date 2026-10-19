"""Approved web-search seam (01-architecture.md §Key decisions 6 / roadmap v3).

Disabled by default and intentionally unimplemented: when enabled later, only
results from ALLOWED_DOMAINS may be surfaced to the model, and the system
prompt may then mention the tool. Keep it off until there is an actual
approved provider wired in.
"""
from dataclasses import dataclass

ENABLED = False
ALLOWED_DOMAINS: tuple[str, ...] = ()  # e.g. ("github.com", "docs.python.org")


@dataclass
class SearchResult:
    url: str
    title: str
    snippet: str


async def search(query: str, *, limit: int = 3) -> list[SearchResult]:
    """Returns allowlisted results, or [] when disabled. Never raises."""
    if not ENABLED or not ALLOWED_DOMAINS:
        return []
    # Wire an approved search API here (results must come from ALLOWED_DOMAINS).
    raise NotImplementedError("web search is enabled but no provider is implemented")
