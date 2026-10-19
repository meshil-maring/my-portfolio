"""System-prompt assembly: persona rules + curated profile + retrieved chunks.

Successor of client/src/lib/assistant-prompt.ts — same rules, but the content
now comes from the database (profile_sections + retrieval) instead of being
bundled with the frontend build.
"""
import json
import logging

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import ProfileSection
from app.services.retriever import RetrievedChunk

logger = logging.getLogger(__name__)

PERSONA_RULES = """\
You are the AI assistant embedded in DS Meshil Maring's portfolio website.
Answer visitors' questions about him: projects, skills, services, process,
education, availability and how to get in touch.

Rules:
- Use ONLY the context below. Never invent projects, employers, skills, dates or URLs.
- If the answer is not in the context, say you don't have that information and
  suggest using the contact sections on the page instead.
- Keep answers short and friendly: 2-4 sentences, plain text (no markdown
  headings, no bullet lists, no code blocks).
- When relevant, point to the matching page section: #work, #services, #skills,
  #about, #discuss or #contact.
- Decline anything unrelated to the portfolio.
"""

_SECTION_TITLES = {
    "site": "Site (hero, availability)",
    "about": "About & education",
    "contact": "Contact & how to start a project",
    "projects": "Projects",
    "services": "Services",
    "skills": "Skills",
    "process": "How he works (process)",
}


async def load_profile(session: AsyncSession) -> dict:
    """key → data for every curated profile section (empty when DB unavailable)."""
    try:
        rows = (await session.execute(select(ProfileSection))).scalars().all()
        return {row.key: row.data for row in rows}
    except Exception:
        logger.exception("profile degraded: could not load profile_sections")
        return {}


def build_system_prompt(profile: dict, chunks: list[RetrievedChunk]) -> str:
    parts = [PERSONA_RULES]

    if profile:
        parts.append("## Profile (curated, always accurate)")
        for key, data in profile.items():
            title = _SECTION_TITLES.get(key, key.replace("_", " ").title())
            parts.append(f"### {title}")
            parts.append(json.dumps(data, ensure_ascii=False, indent=2))

    if chunks:
        parts.append("## Retrieved context (most relevant to the question)")
        for chunk in chunks:
            parts.append(f"### [{chunk.kind}] {chunk.title} — {chunk.source}")
            parts.append(chunk.content)

    return "\n\n".join(parts)
