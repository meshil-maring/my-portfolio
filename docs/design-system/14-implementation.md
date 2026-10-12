# 14 — Implementation (stack + build order)

## Stack (locked for v1)

Vite + React 18 + TypeScript strict · Tailwind v3 (`darkMode:'class'`, tokens from §11) · `motion` pkg (`motion/react`) · `lucide-react` icons · CSS vars for theme. React Router only if a second real page appears. No `framer-motion` in new code.

## Build order

1. Tokens + fonts + `Container/Section` primitives (§11, §04).
2. `ThemeProvider` + toggle, no-flash script (§09).
3. Layout: Navbar (06) + Footer.
4. Sections in order: Hero → Work → Services → Skills → About → Contact (§07 + §10 data).
5. Motion pass (§08). A11y + responsive passes (§12–13). SEO/meta/OG + preview + deploy.

## Definition of done (per section)

Tokens used (no raw hex) · `dark:` verified · responsive at 4 widths · keyboard + focus states · reduced-motion honored · data-driven from `src/data/` · docs linked.
