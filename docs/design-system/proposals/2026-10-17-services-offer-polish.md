# Proposal: Services "What I offer" — deliverable chips, panel hover lift, closing CTA

- Date: 2026-10-17
- Status: APPLIED (owner request via chat, 2026-10-17: improve the "What I offer" section following the design system)
- Affects: content model (10) + section (07) + code (`Services`, `FeaturedService`, `services.ts`, `types/portfolio.ts`)
- Version bump: minor (1.4 → 1.5; 1.4 was the accepted floating-assistant proposal, whose CHANGELOG entry was missing and is added retroactively with this set)

## Problem / opportunity

Three gaps against the locked spec and against the section's job (convert scanners into `#discuss` conversations):

1. **Panels are under-informative.** Each featured panel shows only a title + one-sentence description. §05's tag pattern (and the Projects section) already gives this site a proven "scannable chips" language; services — the section that sells — has none of it. A recruiter skimming 01→04 can't see concrete capabilities without reading every paragraph.
2. **Panels miss the §05 card hover contract.** §05: "Hover: translateY(-2px) + border/shadow lift, ~200ms" — `Card` implements it (`hover:-translate-y-0.5`); `FeaturedService` only transitions colors, so the largest cards on the page feel dead under the pointer.
3. **No next step.** After panel 04 the section ends; the zigzag's built-up momentum has nowhere to go. Hero and Contact both close with CTAs — Services doesn't.

## Proposed change

1. **Deliverable chips** (`data/services.ts` + `types/portfolio.ts`): `Service` gains `deliverables?: string[]` (3 short chips per row, every chip traceable to existing copy — no new claims per §10):
   - 01 → `Responsive frontends` · `REST APIs & auth` · `Database design`
   - 02 → `RAG pipelines` · `Semantic search` · `LLM integrations`
   - 03 → `Secure REST APIs` · `Role-based access` · `Multi-tenant design`
   - 04 → `Admin dashboards` · `Content workflows` · `Media handling`

   `FeaturedService` renders them under the description as a wrapped `<ul aria-label="What's included">` of existing `Tag` components (radius-6 chip, soft bg, 1px border, muted 11px text, `gap-2` = 8px — all per §05 "Tech tags"). No new component, no token changes; the optional field keeps the type backward-compatible.
2. **Panel hover lift**: panel surface gains `hover:-translate-y-0.5 hover:border-accent` with `transition-[transform,border-color] duration-200` (was `transition-colors`) — the exact Card/Button hover language (full-accent border on hover matches `Button` secondary and the Navbar emphasized link; no invented opacity steps).
3. **Closing CTA** (`Services.tsx`): one centered `Reveal` row after panel 04 — muted line "Not sure which one fits your project?" + secondary `Button` ("Discuss a project" → `#discuss`, reusing the contact section's CTA label). Closes the Z-flow with the section's conversion path.

## Light + dark impact

No token changes. Chips reuse `Tag` (surface-theme `bg-soft`/`border-border`/`text-muted`), so both themes are automatic. Hover accent border uses the existing `--color-accent` in both themes.

## Responsive + a11y impact

Chips wrap naturally below `lg` (panel is single-column on mobile); panel hover is pointer-only decoration (the global `prefers-reduced-motion` rule flattens transition durations to 0.01ms, and touch devices get no hover state). The chips list keeps list semantics with a clear accessible name; the CTA button inherits `Button`'s 44px target + visible focus ring. No layout shift: chips render inside the existing text column.

## Alternatives considered

1. **Checkmark icon per chip** — rejected: adds 12 decorative glyphs to a section that already carries icons, tiles and connectors; §05 tags are text-only.
2. **Accent-tinted chips (`bg-accent-soft`)** — rejected: the icon badge already uses accent-soft; tinting 12 more chips would overpower the panel hierarchy in both themes.
3. **Per-panel "Discuss this service" links (×4)** — rejected: four identical links dilute the CTA; one closing CTA matches the Hero/Contact pattern.
4. **Section intro paragraph under the H2** — rejected for now: no other section carries one (§07); copy bloat in the most compact section of the page.

## Decision

Accepted and applied 2026-10-17 per owner request ("improve 'What I offer' section follow design"). Content model extended per §10 (new field = minor + type update); §07/§10/CHANGELOG updated in the same change set.
