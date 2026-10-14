# 08 — Motion (v1.1 LOCKED)

Subtle, meaningful, GPU-only (opacity/transform). Respect `prefers-reduced-motion` — render statically when set.

- Buttons/cards hover: -2px, 180–220ms / ~200ms.
- Section entrance: fade-up 12px, 250–300ms, once, no drama.
- Theme switch: 200ms on bg/text/border/surface.
- Smooth anchors where motion-safe. No infinite loops except subtle hero accent (pause offscreen).
- One easing curve per page. No scroll-jacking.

New animation patterns → proposal + `docs/animation/` update. Removing motion for perf = patch note.
