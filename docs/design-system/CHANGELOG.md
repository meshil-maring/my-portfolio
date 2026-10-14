# Design System CHANGELOG

## [1.2] — 2026-10-14 — Services: zigzag flow + connected dashed line

- CHANGED: 07-sections, 00-overview — Services & Capabilities panels now flow in a zigzag (01 left · 02 right · 03 left · 04 right at lg, 74% width; right-aligned rows mirror their internals via the new `FeaturedService` `mirror` prop) and are linked by a connected dashed line (`FlowConnector` in `Services.tsx`: percentage-coordinate SVG — no viewBox, no dash distortion — 70%/30% inner-edge anchors with accent node dots on lg, straight vertical link below lg) (proposal: proposals/2026-10-14-services-zigzag-flow.md).
- CHANGED: 07-sections — Featured panels sized down (padding 20/24/28px, 40px icon badge, 22/26px title, `gap-6`, 200px cluster) and desktop stack tiles re-slotted to fixed-pixel positions in a centered 240×176 box — every pair ≥16px apart vs ≤11px max float/hover motion, so logos can never touch (old percentage slots overlapped at the narrower zigzag width) (proposal: proposals/2026-10-14-services-zigzag-flow.md).

## [1.1] — 2026-10-14 — Services: 01–02 featured panels

- CHANGED: 07-sections, 10-content-model — Services now features all four rows (01 Full-Stack · 02 AI & RAG · 03 Backend & APIs · 04 Dashboards & CMS) as stacked featured panels (compact-card grid removed); `FeaturedService` takes its glyph from `service.icon` and derives the desktop cluster from `service.stack`; new BrandIcons (Python, FastAPI, Hugging Face, Supabase, Docker) (proposal: proposals/2026-10-14-services-featured-panels.md).

## [1.0] — 2026-10-12 — LOCKED

- Initial full spec from owner brief: emerald light/dark themes, Inter + JetBrains Mono, 1160px / 12-8-4 grid, 4px compact spacing, section order hero→work→services→skills→about→contact, 3 projects, 4 services, 4 skill groups.
- Files: `00-overview` … `14-implementation`.

## How to add entries

```
## [1.1] — YYYY-MM-DD — <title>
- CHANGED: <file> — <what + why> (proposal: proposals/YYYY-MM-DD-<slug>.md)
```
- Patch (1.0.1): copy fixes, new project row, skill reorder.
- Minor (1.1): token value change, new component/section/skill group, new page.
- Major (2.0): section removal, token rename, grid/breakpoint overhaul.
