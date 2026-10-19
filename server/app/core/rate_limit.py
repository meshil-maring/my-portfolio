"""Per-key (per-IP) sliding-window rate limiter.

Port of the in-memory limiter in client/src/app/api/chat/route.ts: buckets
reset with the process, which matches the site's stateless deployment. Swap
for a Redis-backed implementation before running multiple instances.
"""
import time
from collections import defaultdict, deque


class SlidingWindowRateLimiter:
    def __init__(self, max_requests: int, window_seconds: float) -> None:
        self._max_requests = max_requests
        self._window_seconds = window_seconds
        self._hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        """True when the request may proceed; records the hit."""
        now = time.monotonic()
        bucket = self._hits[key]
        while bucket and now - bucket[0] >= self._window_seconds:
            bucket.popleft()
        if len(bucket) >= self._max_requests:
            return False
        bucket.append(now)
        self._prune(now)
        return True

    def _prune(self, now: float) -> None:
        # Bound memory: drop buckets whose last hit fell out of the window.
        if len(self._hits) <= 10_000:
            return
        for key in list(self._hits):
            bucket = self._hits[key]
            if not bucket or now - bucket[-1] >= self._window_seconds:
                del self._hits[key]
