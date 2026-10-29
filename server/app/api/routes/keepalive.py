"""GET /api/keepalive — lightweight DB-touching ping for keep-alive.

Hits a real table (profile_sections) so both the API process and its
database connection stay warm. Used by the GitHub Actions cron and any
external uptime monitor to keep Render (and Supabase) from idling.
"""
from fastapi import APIRouter

from app.db.session import SessionLocal
from app.models import ProfileSection
from sqlalchemy import select

router = APIRouter(tags=["keepalive"])


@router.get("/keepalive")
async def keepalive() -> dict:
    db_ok = False
    rows = 0
    try:
        async with SessionLocal() as session:
            result = await session.execute(select(ProfileSection.key))
            rows = len(result.scalars().all())
            db_ok = True
    except Exception:  # noqa: BLE001 - keep-alive must not crash the worker
        db_ok = False
    return {"status": "ok", "db_ok": db_ok, "rows": rows}
