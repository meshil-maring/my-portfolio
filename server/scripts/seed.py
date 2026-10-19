"""Seeds the running backend from server/seed/portfolio.json.

Run after migrations + `uvicorn app.main:app`:
    python scripts/seed.py --token "$INGEST_TOKEN"

Unchanged sources are skipped server-side by content hash, so re-running is
safe and cheap. See docs/backend/02-data-model.md §Seed data.
"""
import argparse
import json
import os
import pathlib
import sys

import httpx

SEED_PATH = pathlib.Path(__file__).resolve().parent.parent / "seed" / "portfolio.json"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="http://localhost:8000")
    parser.add_argument(
        "--token",
        default=os.environ.get("INGEST_TOKEN", ""),
        help="X-Ingest-Token value (defaults to $INGEST_TOKEN)",
    )
    args = parser.parse_args()

    if not args.token:
        print("error: pass --token or set INGEST_TOKEN", file=sys.stderr)
        return 2

    entries = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    headers = {"X-Ingest-Token": args.token}

    with httpx.Client(base_url=args.base_url, timeout=120.0) as client:
        try:
            client.get("/api/health").raise_for_status()
        except httpx.HTTPError:
            print(f"error: backend not reachable at {args.base_url}", file=sys.stderr)
            return 2
        for entry in entries:
            response = client.post(
                "/api/admin/ingest", json=entry, headers=headers
            )
            if response.status_code == 401:
                print("error: unauthorized — check INGEST_TOKEN", file=sys.stderr)
                return 2
            response.raise_for_status()
            result = response.json()
            print(f"{entry['source']}: {result['status']} ({result['chunks']} chunks)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
