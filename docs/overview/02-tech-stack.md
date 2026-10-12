# 02 – Tech Stack

## Purpose
Single source of truth for frontend tech choices and versions.

## Core
| Layer      | Choice                        | Why                                  |
|------------|-------------------------------|--------------------------------------|
| Language   | TypeScript (~5.x, strict)     | Type safety, better refactor         |
| Bundler    | Vite (v5/v6)                  | Fast dev, optimized build            |
| UI         | React 18 + TSX                | Component model, ecosystem           |
| Styling    | TailwindCSS v3 (or v4)        | Utility-first, theming via tokens    |
| Animation  | Motion (Framer Motion successor, `motion` pkg) | Declarative animations, gestures |
| Icons      | lucide-react                  | Lightweight, consistent              |
| Fonts      | Inter + JetBrains Mono        | Per design-system v1.0 §02           |
| Routing    | react-router-dom (if multi-page) | Optional for /projects/:slug      |
| Forms      | Native + controlled inputs    | Keep simple; add RHF only if needed  |

## Design system
Locked visual spec: `docs/design-system/` v1.0 (emerald light/dark, 1160px, compact spacing). Never restyle ad-hoc — propose via `docs/design-system/proposals/`.

## Dev tools
- ESLint + Prettier + editorconfig
- `vite-tsconfig-paths` for `@/` alias
- Vitest + React Testing Library (optional v1)

## Versioning rule
- Pin majors in `package.json`, let lockfile hold exact versions.
- Record actual versions here once scaffolded:
  - TODO: `node -v`, `npm -v`, `vite`, `react`, `tailwindcss`, `motion`, `typescript`

## Alternatives considered
- Next.js → overkill for static portfolio, Vite is lighter.
- CSS Modules / styled-components → Tailwind covers 95% + tokens.
- Framer Motion → use `motion` (the renamed package) for future-proofing:
  ```bash
  npm install motion
  ```
