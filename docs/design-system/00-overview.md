# Design System v1.1 — DS Meshil Maring Portfolio

> **Status:** LOCKED for v1 build. **Personality:** Minimalist, Modern, Professional, Developer-Focused, Editorial.
> **Audience:** Recruiters, hiring managers, freelance clients, startups.
> **Role:** Full-Stack Developer & AI Application Engineer.

## How this folder works (read this first)

- `00-overview.md` — vision, principles, how to read this system.
- `01–09` — the locked v1 tokens + rules (colors, type, spacing, layout, components, nav, sections, motion, themes).
- `10-content-model.md` — every section's copy + data contract (what goes in `src/data/`).
- `11-tokens-reference.md` — copy-paste CSS variables + Tailwind config.
- `12-accessibility.md`, `13-responsive.md`, `14-implementation.md` — build checklists.
- `CHANGELOG.md` — every design change gets an entry. No silent edits.
- `proposals/` — future design/UX/structure ideas live here FIRST as dated proposals, then graduate into v1.x.

## Rule for future updates (the room you asked for)

1. NEVER edit `01–09` silently. Open a file in `proposals/YYYY-MM-DD-<idea>.md` instead.
2. Proposal states: `DRAFT → ACCEPTED → APPLIED` (then CHANGELOG entry + version bump).
3. Token changes bump minor (`1.0 → 1.1`); new sections/components bump minor; breaking renames bump major (`1.x → 2.0`).
4. Code PRs that change visuals MUST link the proposal + CHANGELOG line.

## Version

- Current: **v1.2** (this spec, locked).
- Next candidate: v1.3 (TBD via proposals).

## Map to code

| Doc | Code |
|---|---|
| `01-colors.md` + `11-tokens-reference.md` | `tailwind.config.ts`, `src/styles/tokens.css` |
| `02-typography.md` | `index.html` fonts, `tailwind.config` fontSize |
| `03-spacing.md`, `04-layout.md` | `Container`, `Section` layout primitives |
| `05-components.md` | `src/components/ui/*` |
| `06-navigation.md`, `07-sections.md` | `src/components/layout/*`, `src/components/sections/*` |
| `08-motion.md` | `motion/react` patterns in `docs/animation/` |
| `10-content-model.md` | `src/data/*.ts` + `src/types/portfolio.ts` |
