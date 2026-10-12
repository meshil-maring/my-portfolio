# 05 — Components (v1.0 LOCKED)

Borders define structure more than shadows. Radius: card 12 / button 8 / input 8 / tag 6 / badge pill.

## Cards

- Bg: #FFFFFF light / #18231F dark. Border 1px (`--color-border`). Radius 12px. Pad 20/18/16.
- Light shadow: `0 6px 24px rgba(20,50,32,.06)`. Dark: none/subtle.
- Hover: translateY(-2px) + border/shadow lift, ~200ms. No thick borders or giant shadows.

## Buttons

- Primary: accent bg + accent-text, min-h 44px, radius 8, X-pad 20/18/16, 700 weight, 12–14px.
- Secondary: transparent/surface + 1px theme border + main text. Same height/radius.
- Hover: bg shift + optional -2px, 180–220ms. Focus: visible outline always.

## Tech tags

Radius 6, pad ~5px/8px, 10–12px, soft-surface bg, 1px border, muted text, 5–8px gap.
E.g. React, TypeScript, Python, FastAPI, PostgreSQL, Supabase, Docker, RAG, LLMs.

## Inputs

Radius 8, min-h 44px, 1px border, surface bg, hover + focus states, labels, validation feedback.

## Badges / availability

Pill, accent-soft bg, accent or text color, mono or 12px semibold. Green dot for "open".

## New components later

Spec in proposal (anatomy, states, tokens used, a11y) → build in `src/components/ui/` → minor bump.
