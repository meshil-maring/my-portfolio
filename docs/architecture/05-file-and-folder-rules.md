# 05 – File & Folder Structure Rules

## Purpose
Single enforceable rulebook for **where files go, what they're named, and what they may contain**. If `01-folder-structure.md` is the map, this file is the law.

Applies to: Vite + React + TypeScript + TailwindCSS + Motion (`motion` package).

> Rule priority: this file wins on conflicts. Update code + this file in the same PR when rules change.

---

## 1. Root layout (locked)

```
my-portfolio/
├── docs/                  ← documentation ONLY. No code.
├── public/                ← static, unprocessed (favicon, og-image, resume.pdf)
├── src/                   ← all source code. Nothing outside src/ is imported.
├── index.html             ← entry HTML only (title/meta/fonts).
├── tailwind.config.ts     ← theme tokens only.
├── vite.config.ts         ← build/dev config only.
├── tsconfig.json          ← TS config only.
├── package.json           ← scripts + deps only.
└── .env.example           ← documented empty keys. Never secrets.
```

**Rules:**
1.1. App code MUST live under `src/`. No `components/` or `utils/` at root.
1.2. `public/` files are referenced by URL (`/og-image.png`), never `import`ed.
1.3. `dist/`, `node_modules/`, `.env.local` are NEVER committed.
1.4. No new root folders without updating this file + `01-folder-structure.md`.

---

## 2. `src/` layout (locked)

```
src/
├── main.tsx               ← entry ONLY: StrictMode + providers. Max ~30 lines.
├── App.tsx                ← composition ONLY: layout + sections/routes.
├── index.css              ← tailwind directives + @layer base only.
├── vite-env.d.ts          ← vite/client refs + ImportMetaEnv.
├── assets/                ← images/fonts imported by code (processed by Vite)
├── components/
│   ├── layout/            ← Navbar, Footer, Section, Container
│   ├── ui/                ← Button, Badge, Card, SectionHeading (dumb, reusable)
│   └── sections/          ← Hero, About, Skills, Projects, Experience, Contact
├── data/                  ← projects.ts, skills.ts, experience.ts, socials.ts
├── hooks/                 ← useTheme, useMediaQuery (one hook per file)
├── lib/                   ← cn.ts, format.ts, constants.ts, env.ts (no JSX)
├── styles/                ← tokens.css, animations.css (imported once)
└── types/                 ← portfolio.ts, common.ts (types ONLY)
```

Rules: `lib/env.ts` is the ONLY place touching `import.meta.env`. `lib/` has no hooks — those go in `hooks/`.

---

## 3. Naming conventions

| Kind | Case | Example |
|---|---|---|
| Component files | `PascalCase.tsx` | `ProjectCard.tsx` → `ProjectCard` |
| Hook files | `camelCase`, `use*` | `useTheme.tsx` |
| Data files | `camelCase.ts`, plural | `projects.ts` |
| Type files | `camelCase.ts` | `portfolio.ts` |
| Helper files | `camelCase.ts` | `cn.ts`, `formatDate.ts` |
| Style files | `kebab-case.css` | `tokens.css` |
| Asset files | `kebab-case.ext` | `hero-portrait.webp` |
| Docs files | `NN-kebab-case.md` | `05-file-and-folder-rules.md` |
| Folders | `kebab-case` | `components/sections/` |

**Rules:**
3.1. File name === exported component name. No spaces or mixed case.
3.2. NEVER generic names: `utils.ts`, `helpers.ts`, `common.tsx`, `data.ts`, `stuff.ts`.
3.3. Tests colocate: `Button.test.tsx` next to `Button.tsx`.
3.4. Types are `PascalCase` (`Project`); type files stay `camelCase`.
3.5. Constants are `UPPER_SNAKE_CASE` (`NAV_LINKS`); files stay `camelCase`.

---

## 4. File contents – one job per file

| Folder | MAY contain | MUST NEVER contain |
|---|---|---|
| `components/ui/` | Presentational JSX + Tailwind + `cn()` + local prop types | Data fetching, `src/data` imports*, router, `localStorage` |
| `components/sections/` | Section composition + `motion` + `src/data` mapping to `ui/` | Reusable primitives (promote to `ui/` if used twice) |
| `components/layout/` | Frame: nav, footer, section wrappers | Section content, project data |
| `data/` | Typed exported consts | JSX, hooks, side-effect functions |
| `hooks/` | One hook per file (`use*` named export) | JSX (except providers), raw `fetch` without cleanup |
| `lib/` | Pure functions, constants, `cn`, `env` wrapper | JSX, hooks, `import.meta.env` outside `env.ts` |
| `types/` | `interface`/`type` + `import type` only | Runtime values, functions |
| `styles/` | CSS vars, `@keyframes`, `@layer` | Per-component CSS files |

`*` `ui/` gets data via props. `sections/` pass `data/*.ts` entries as props. Keeps `ui/` portable.

**Size rule:** soft limit 150 lines per component. Over that → split into sub-component or `ui/` primitive.

---

## 5. Colocation vs. shared – decision tree

```
Need a component/helper/type?
├─ Used in ONE section only? → colocate INSIDE that section's folder
│   e.g. sections/Projects/ProjectCard.tsx
├─ Used in ≥2 places? → promote to shared:
│   ├─ UI primitive? → components/ui/
│   ├─ Layout/frame? → components/layout/
│   ├─ Hook? → hooks/   Pure helper? → lib/   Type? → types/
└─ Static content/list? → data/ (never hard-code lists in components)
```

Rules:
5.1. Colocated files live in a `PascalCase` subfolder named after the parent (e.g. `sections/Hero/HeroBadge.tsx`) OR as direct siblings (`sections/Projects/ProjectCard.tsx`). One style per section.
5.2. Colocated files MUST NOT be imported by other sections. Need it elsewhere → promote to shared first.
5.3. No barrel files for `sections/`. Barrels allowed ONLY for `ui/` and `lib/` (see §6).

---

## 6. Barrel files (`index.ts`) – strict

- ALLOWED: `components/ui/index.ts`, `lib/index.ts` only.
- FORBIDDEN: `sections/index.ts`, `data/index.ts`, `hooks/index.ts`, `src/index.ts`.
- Re-export direct children only, sorted, no logic:
```ts
// components/ui/index.ts — GOOD
export { Button } from './Button';
export { Card } from './Card';
```
```ts
// BAD
export * from './Button';
export const Everything = { ... };
```
- Circular import from a barrel → delete the barrel, import directly.

---

## 7. Import rules

Order:
```tsx
// 1. React / external
import { useState } from 'react';
import { motion } from 'motion/react';
// 2. Internal alias (@/)
import { Button } from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';
import type { Project } from '@/types/portfolio';
// 3. Relative (colocated siblings only)
import { ProjectCard } from './ProjectCard';
// 4. Assets (last)
import heroImg from '@/assets/hero-portrait.webp';
```

Rules:
7.1. `@/` for ALL cross-folder imports. Relative (`./`) ONLY for colocated siblings.
7.2. `import type` for types — always.
7.3. NEVER import from `public/`. NEVER `framer-motion` in new code (use `motion/react`).
7.4. No circular imports. `types/` imports nothing from `src/`. `data/` imports `types/` + `assets/` only.

Dependency direction (one way):
```
sections → ui, layout, data, hooks, lib, types
layout   → ui, hooks, lib, types
ui       → lib, types
hooks    → lib, types
data     → types, assets
```

---

## 8. Assets, styles, env rules

8.1. Content images → `assets/` (imported, hashed). Meta files (`favicon`, `og-*`, `resume.pdf`, `robots.txt`) → `public/`.
8.2. Prefer `.webp`/`.svg`; under 200KB each; `loading="lazy"` below fold.
8.3. No hex/font/magic numbers in components — use Tailwind tokens or `styles/tokens.css` vars.
8.4. `dark:` variant required on every new surface.
8.5. Env access ONLY via `src/lib/env.ts`. No raw `import.meta.env` elsewhere.

---

## 9. Good vs. bad

```tsx
// GOOD — ui primitive, props-driven, typed, tokens
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl2 px-5 py-2.5 font-medium transition',
        variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600',
        variant === 'ghost' && 'hover:bg-black/5 dark:hover:bg-white/10',
        className,
      )}
      {...rest}
    />
  );
}
```

```tsx
// BAD — old motion pkg, deep relative import, hard-coded data plus hex
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';

export function Projects() {
  return <div style={{ background: '#3382ff' }}>{[{ title: 'x' }].map(p => <div>{p.title}</div>)}</div>;
}
```

```ts
// GOOD — data file: typed, no JSX
import type { Project } from '@/types/portfolio';

export const projects: Project[] = [
  { slug: 'task-app', title: 'Task App', description: '...', tags: ['React', 'TS'], image: '...' },
];
```

---

## 10. Forbidden (PR-blocking)

- `utils/`, `helpers/`, `common/`, `shared/` junk-drawer folders
- `any` without a `TODO` reason
- New root or `src/` subfolders without updating this file
- Multiple components per file (except tiny colocated parts)
- `default export` for components (named exports; `default` only for lazy routes)
- Per-component CSS files (use Tailwind; `styles/` splits only)
- Copy-pasted button/card/heading instead of `ui/` primitive
- Hard-coded lists in components (must come from `data/`)
- `console.log`, commented-out code, owner-less TODO

---

## 11. New-file checklists

**New component:** right folder (sections 2+5)? `PascalCase`, named export, `Props` on top? `cn()` plus tokens plus `dark:` plus `className?` passthrough? Typed, no `any`, no hard-coded data? Alt/aria/focus states?

**New hook/helper/type/data:** one per file? Hook goes to `hooks/`, pure fn to `lib/`, type to `types/`, list to `data/`? No JSX in `hooks` return, no hooks in `lib/`?

**New asset/style/env:** `assets/` vs `public/` correct? Optimized? Token added first? Env key in `.env.example` plus `lib/env.ts` plus `vite-env.d.ts`?

---

## 12. Related docs

- `01-folder-structure.md` — the map (this file is the law)
- `04-component-conventions.md` — component style details
- `../typescript/02-type-conventions.md`, `../styling/02-design-tokens.md`


