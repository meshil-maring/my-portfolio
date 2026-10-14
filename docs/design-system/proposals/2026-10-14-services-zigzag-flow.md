# Proposal: Services & Capabilities — zigzag flow + connected dashed line

- Date: 2026-10-14
- Status: APPLIED
- Affects: section (07) + code (`Services`, `FeaturedService`)
- Version bump: minor (1.1 → 1.2)

## Problem / opportunity
All four featured panels stack in one plain column, so the section reads as a list of four equal cards with nothing expressing progression from 01 → 04. The owner asked for a "Z flow design" with a "connected dashed line" to make the four capabilities read as one connected flow.

## Proposed change
Zigzag (alternating) flow in `Services.tsx`:
- Rows alternate at `lg`: **01 left · 02 right · 03 left · 04 right** — each panel `lg:w-[74%]` with `lg:mr-auto` / `lg:ml-auto`. Below `lg` panels keep the full-width single-column stack.
- `FeaturedService` gains an optional `mirror` prop: right-aligned rows swap internals at `lg` (`lg:grid-cols-[0.95fr_1.05fr]` + `lg:order-1/2` — cluster left, text right; text keeps `1.05fr`), so every dashed connector links tile-cluster to tile-cluster. Below `lg` nothing changes (text-first stack). Mirrors the existing `mirror` convention in `ProcessStepCurve`.
- New local `FlowConnector` in `Services.tsx` renders between panels: an `aria-hidden` SVG using **percentage coordinates with no viewBox** (dash rhythm never distorts at any width). On `lg` a dashed diagonal runs from the upper panel's inner edge to the lower panel's inner edge — anchors at **70%** (left panels: 74% width − 4% inset) and **30%** (right panels: 26% + 4%) — alternating ╲ ╱ ╲ (the Z/zigzag flow), with accent node dots (`r=4`) touching both panel edges. Below `lg` it renders a straight vertical dashed link at 50% between the stacked panels. Stroke: `stroke-accent/70` (`dark:stroke-[#B9F4CA]/55`), 1.5px, dash `6 7` (desktop) / `5 6` (vertical), `overflow-visible` so the end dots paint fully. Gap height `h-9` (mobile) / `lg:h-24` (desktop ≈13° diagonal). Connector wrapped in `Reveal` so it fades up with the panels.
- Data contract unchanged (`data/services.ts`, `Service` type untouched).

### Follow-up the same day: compact panels + non-overlapping tiles
Owner feedback: each card is too big, and the stack logos touch each other. Applied in the same 1.2 set:
- **Size down** (`FeaturedService`): panel padding `p-6 md:p-8 lg:p-9` → `p-5 md:p-6 lg:p-7` (20/24/28 — in line with the `--card-padding` 20/18/16 token scale), icon badge `h-12 w-12` → `h-10 w-10` (glyph 20 → 18), title `text-[26px] lg:text-[34px]` → `text-[22px] lg:text-[26px]` (the old 34px desktop title out-sized the section H2 at 32px; 26px also sits closer to the §02 Card H3 spec), grid `gap-8` → `gap-6`, desktop cluster `h-[240px]` → `h-[200px]`.
- **No touching tiles**: the old slots were percentage positions from the full-width mockup and provably overlapped once the panel narrowed to 74% (e.g. `left-[72%]`+54px vs `left-[60%]`+56px collide, plus `left-[36%]`+74px vs `left-[40%]`+48px as the column shrinks). The cluster now sits in a **fixed 240×176 box centered in its grid column** (`inset-y-3 left-1/2 w-[240px] -translate-x-1/2`) with **fixed-pixel slots** — sizes 60/42/48/50/44/48 at (96,12) (16,34) (172,50) (8,98) (76,108) (144,122). Every pair is separated by ≥16px on at least one axis; maximum tile motion is 11px (7px float + 4px hover lift), so tiles can never touch at any lg+ viewport. The 240px box fits the narrowest lg column (≈288px after the size-down) with ≥24px side margins.

## Light + dark impact
No token changes. Accent line/dots use the existing `--color-accent` (#176C4C light / #A5ECC0 dark via `@theme inline`) with the established `/70` opacity language plus the `#B9F4CA` dark-panel accent used by the featured panels — no new colors.

## Responsive + a11y impact
Mobile/tablet: unchanged full-width stack (tiles wrap at 52px) + centered vertical dashed link so the "connected" motif survives. Desktop: zigzag starts at `lg` (1024px) where the two-column panel interior exists. Connector is decorative (`aria-hidden`, no focusable content); reveal respects `prefers-reduced-motion` via `Reveal`.

## Alternatives considered
- 2×2 Z-grid (cards in four corners) — rejected: the owner explicitly chose the zigzag option; a 2×2 grid also cramps the featured-panel interior and its 02→03 connector is a near-flat stub.
- Single column with a left dashed spine (Process-style) — rejected: owner chose alternating sides.
- Animated marching dashes — rejected: static line keeps focus on content and avoids an infinite animation (only subtle hero accents loop per §08).

## Decision
Accepted by owner via chat request 2026-10-14 ("can you make \"Services & Capabilities section\" in z flow design and connected dashed line."), clarified via follow-up question the same day → zigzag flow with connected dashed line chosen over the 2×2 Z-grid and left-spine options. Applied same day. Follow-up the same day ("each of the card section eg. 01 (full-stack web applications) card is big can you reduce it. And logo of the stacks also don't touch each and others.") → compact panel sizing + non-overlapping fixed-pixel cluster slots folded into the same uncommitted 1.2 change set.