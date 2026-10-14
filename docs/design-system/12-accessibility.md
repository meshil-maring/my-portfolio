# 12 — Accessibility (v1.1 checklist)

- Semantic landmarks: `header/nav/main/section/footer`, one `h1`, ordered headings.
- Keyboard: all interactive elements reachable, visible `:focus-visible` ring (accent), Esc closes menu, skip-to-content link.
- Contrast AA in BOTH themes (accent-on-bg checked per §01).
- `alt` on all images; decorative `aria-hidden`. Form labels + error text, not color-only.
- `prefers-reduced-motion`: disable smooth scroll, reveals, hover lifts.
- Touch targets ≥ 44px. No content hidden on mobile. Test with keyboard only + one screen reader pass.
