"""Offline smoke test — exercises the app without Postgres, R2 or API keys.

    python scripts/smoke_test.py

Covers: app import, route wiring, health, validation contract (400), auth
(401), rate limiting (429), not-configured handling (500), chunking, seed JSON.
"""
import json
import pathlib
import sys

# Windows consoles default to a legacy codepage (e.g. GBK); reconfigure so
# check names (which contain arrows) survive piping/redirects.
for _stream in (sys.stdout, sys.stderr):
    if _stream.encoding and _stream.encoding.lower() != "utf-8":
        _stream.reconfigure(encoding="utf-8", errors="replace")

from fastapi.testclient import TestClient

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent.parent))

from app.main import app  # noqa: E402
from app.services.chunking import chunk_text  # noqa: E402

SEED_PATH = pathlib.Path(__file__).resolve().parent.parent / "seed" / "portfolio.json"

failures: list[str] = []


def check(name: str, condition: bool, detail: str = "") -> None:
    status = "ok" if condition else "FAIL"
    print(f"  [{status}] {name}" + (f" — {detail}" if detail and not condition else ""))
    if not condition:
        failures.append(name)


def main() -> int:
    with TestClient(app) as client:
        print("http:")
        health = client.get("/api/health")
        check("GET /api/health → 200", health.status_code == 200, str(health.status_code))
        check(
            "health payload shape",
            health.json().get("status") == "ok"
            and set(health.json())
            == {"status", "llm_configured", "embeddings_configured", "r2_configured"},
            str(health.json()),
        )

        invalid = client.post("/api/chat", json={"messages": []})
        check("invalid body → 400 bad_request", invalid.status_code == 400
              and invalid.json() == {"error": "bad_request"}, str(invalid.content))

        wrong_turn = client.post(
            "/api/chat", json={"messages": [{"role": "assistant", "content": "hi"}]}
        )
        check("must end on a user turn → 400", wrong_turn.status_code == 400)

        # LLM_API_KEY unset in this environment → not_configured (no DB touched).
        chat = client.post(
            "/api/chat", json={"messages": [{"role": "user", "content": "hello"}]}
        )
        check("unconfigured chat → 500 not_configured",
              chat.status_code == 500 and chat.json() == {"error": "not_configured"},
              str(chat.content))

        # Exhaust the per-IP window (12/min default) → 429 on the next request.
        for _ in range(12):
            client.post("/api/chat", json={"messages": [{"role": "user", "content": "hi"}]})
        limited = client.post(
            "/api/chat", json={"messages": [{"role": "user", "content": "hi"}]}
        )
        check("13th request → 429 rate_limited",
              limited.status_code == 429 and limited.json() == {"error": "rate_limited"},
              str(limited.content))

        no_token = client.post(
            "/api/admin/ingest",
            json={"source": "t", "content": "x"},
        )
        check("ingest without token → 401 unauthorized",
              no_token.status_code == 401 and no_token.json() == {"error": "unauthorized"},
              str(no_token.content))

    print("chunking:")
    check("empty text → no chunks", chunk_text("") == [])
    check("short text → single chunk", chunk_text("Hello world.") == ["Hello world."])
    long_text = ". ".join(f"Sentence number {i} about building software" for i in range(80)) + "."
    pieces = chunk_text(long_text, size=400, overlap=80)
    check("long text → multiple bounded chunks",
          len(pieces) > 1 and all(len(p) <= 430 for p in pieces),
          str([len(p) for p in pieces]))

    print("seed:")
    entries = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    sources = [entry["source"] for entry in entries]
    check("seed parses (5 entries)", len(entries) == 5, str(len(entries)))
    check("sources unique", len(sources) == len(set(sources)))
    check("profile sections present",
          all("profile_sections" in entry for entry in entries))

    print()
    if failures:
        print(f"FAILED: {len(failures)} check(s): {failures}")
        return 1
    print("all smoke checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
