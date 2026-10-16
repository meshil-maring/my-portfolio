# Design System CHANGELOG

## [1.3.1] — 2026-10-15 — Consistency pass (tokens, one header, one label style)

- FIXED: 11-tokens, 14-implementation — registered `--radius-card` / `--radius-btn` / `--radius-chip` / `--shadow-card` in `@theme inline` (`globals.css`). Until now `rounded-card`, `rounded-btn`, `rounded-chip` compiled to **nothing** site-wide (verified against built CSS), so cards, buttons, tags and inputs rendered square; all ad-hoc radii (`rounded-2xl`, `rounded-[10px]`, `rounded-[7px]`, `rounded-[18px]`, `rounded-[10px]` icon tiles) now use the tokens (card 12 / button 8 / chip 6).
- CHANGED: 02, 05, 07 — one shared type scale: new `client/src/lib/typography.ts` (`eyebrowClass` 11px/700/+0.12em mono, `sectionTitleClass` 28/36, `cardTitleClass` 18/20 w700, `featuredTitleClass` 22/26 w700). `Projects` now renders through the shared `Section` header (GlassNumber 01 · mono eyebrow · shared H2, spec §03 padding 28/34/40 and gaps 12/14/16), `Process` lost its smaller H2 override, `Contact` reuses `sectionTitleClass`, card H3s (About/Skills/Discuss/Projects) unified at 18/20.
- CHANGED: 05 — `Button` accepts `href` and renders an `<a>` with the identical §05 styles (44px/8px radius/13px/700); Hero + Contact CTAs use it instead of copied classes (Hero was 48px/radius-10). `Projects` tags use the `Tag` component (was `rounded-[7px]`/12px inline copies).
- CHANGED: 01, 09 — dark mode now runs purely on the locked dark palette: removed ~50 hardcoded `dark:…-[#hex]` overrides across Hero, Projects, Services/FeaturedService, HeroCodeCard, TypingSearchCard, GlassNumber, DiscussProject; `Navbar` is theme-aware (`bg-surface`/`border-border`/token text) per §09 instead of always-dark `#07110D`.
- CHANGED: 02 — uppercase micro-labels unified at the §02 label style (was 0.18em/0.2em/0.22em in seven places): hero intro, hero capability strip, card status lines, code-card title, logo `DEV` suffix.
- CHANGED: 01 — one accent-yellow pair site-wide: `#EAB308` (light) / `#FACC15` (dark) for the hero period, process step dot and project corner mark (previously also `#EFC65C`/`#F6D47E`).
- CHANGED: 03 — hero micro-spacing aligned to spec (badge→intro 24 → intro→H1 12 → H1→role 16 → desc→CTA 20); 40px icon tiles standardized on `rounded-card`; Contact social links reuse `BrandIcons` (one icon registry site-wide).

## [1.3] — 2026-10-14 — About: floating "I know how to" typing command card

- CHANGED: 07-sections — About (#about) right column is now a floating AI-style command card; intro + education card stack in the left column (desktop), card spans both rows vertically centered; mobile stacks intro → card → education (proposal: proposals/2026-10-14-about-typing-command-card.md).
- ADDED: components/ui/TypingSearchCard — reusable typing/deleting loop (55/28ms per char, 1600ms hold, 320ms gap) with a blinking accent caret (new `--animate-caret-blink` token + `caret-blink` keyframes); the rotation runs the five capabilities first, then brings the three progressively blurred suggestions up into the label line one by one (the active row sharpens from blur to accent green); one-time sr-only announcement of the full rotation; static first message with zero timers under prefers-reduced-motion, all timeouts cleared in effect cleanup (proposal: proposals/2026-10-14-about-typing-command-card.md).

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
