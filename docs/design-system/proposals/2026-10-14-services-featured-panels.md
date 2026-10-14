# Proposal: Services — all four rows as featured panels (02 AI & RAG, 03 Backend, 04 Dashboards/CMS alongside 01)

- Date: 2026-10-14
- Status: APPLIED
- Affects: section (07) + content model (10) + code (`Services`, `FeaturedService`, `services.ts`, `BrandIcons`)
- Version bump: minor (1.0 → 1.1)

## Problem / opportunity
Only 01 Full-Stack Web Applications got the large featured treatment (number, icon, accent-highlighted title, floating stack tiles). 02 AI and RAG Solutions — the second headline capability in the owner brief — rendered as a small compact card, underselling it. Same for 03 Backend and API Development, then 04 Dashboards and CMS Platforms (follow-up requests the same day).

## Proposed change
Render all of `services` with `FeaturedService` (01 Full-Stack · 02 AI & RAG · 03 Backend & APIs · 04 Dashboards & CMS as stacked panels); the compact-card grid is removed from `Services.tsx`. `data/services.ts` row 02 gains `accentWord: 'Solutions'` and `stack: [python, fastapi, huggingface, postgresql, supabase, react]` (all provable from skills + `college-ai-assistant`); row 03 gains `accentWord: 'Development'` and `stack: [nodedotjs, python, fastapi, docker, postgresql, supabase]` (Node/Express, Python, FastAPI, Docker from skills; multi-DB from projects); row 04 gains `accentWord: 'Platforms'` and `stack: [react, tailwindcss, postgresql, supabase, mongodb, firebase]` (admin UI + CMS/DB tooling already proven in projects/01 — no new logos needed). `FeaturedService` now resolves its glyph from `service.icon` via shared `ui/serviceIcons.ts` (was hardcoded `Code2`) and derives the desktop cluster slots from `service.stack` — 01's stack order matches the original slots, so its layout stays pixel-identical. New BrandIcons: Python #3776AB, FastAPI #009688, Hugging Face #FFD21E, Supabase #3ECF8E, Docker #2496ED (simple-icons paths).

## Light + dark impact
No token changes. Panel 02 uses the same surface/border/glow treatment as 01 in both themes. New tiles reuse the existing frosted-tile pattern (HF yellow follows the Firebase #FFCA28 precedent already in 01).

## Responsive + a11y impact
Four panels stack in one column on mobile; tiles wrap at 52px (existing pattern); the compact-card grid no longer exists. Same Reveal fade-up; reduced-motion still renders static. Tiles keep `role="img"` + `aria-label` + hover labels.

## Alternatives considered
Swap 02 into the single featured slot and demote 01 (rejected — owner wants BOTH featured). Restyle only 02's compact card (rejected — owner asked for the 01 treatment).

## Decision
Accepted by owner via chat request 2026-10-14 ("make … 02 AI and RAG Solutions like 01 Full-Stack Web applications"), clarified to: show BOTH as large featured panels. Applied same day. Follow-ups the same day ("make it backend and API Development section", "make it for 04 dashboards and CMS flatforms") → all four services are featured panels; compact-card path removed from `Services.tsx` (still one uncommitted 1.1 change set).
