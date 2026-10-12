# 01 – Folder Structure

## Purpose
Where code lives. Proposed Vite + React + TS layout at repo root.

```
my-portfolio/
├── docs/                    ← this documentation
├── public/                  ← static assets (favicon, og-image, resume.pdf)
├── src/
│   ├── main.tsx             ← entry: StrictMode + router + providers
│   ├── App.tsx              ← routes / section composition
│   ├── index.css            ← tailwind directives + tokens + base styles
│   ├── vite-env.d.ts
│   ├── assets/              ← images, fonts (imported)
│   ├── components/
│   │   ├── layout/          ← Navbar, Footer, Section, Container
│   │   ├── ui/              ← Button, Badge, Card, SectionHeading (reusable)
│   │   └── sections/        ← Hero, About, Skills, Projects, Experience, Contact
│   ├── data/                ← projects.ts, skills.ts, experience.ts, socials.ts
│   ├── hooks/               ← useTheme, useInView, useMediaQuery
│   ├── lib/                 ← cn(), formatters, constants
│   ├── styles/              ← tokens.css (optional split from index.css)
│   └── types/               ← shared TS types (Project, Experience, ...)
├── index.html               ← title, meta, OG tags, font links
├── tailwind.config.ts       ← theme tokens (colors, fonts, animations)
├── vite.config.ts
└── tsconfig.json
```

## Rules
- Sections compose `ui/` primitives — never duplicate buttons/cards.
- All copy/content data lives in `src/data/` (no hard-coded lists in components).
- Images < 200KB; prefer WebP/SVG; lazy-load below fold.
- Absolute imports via `@/` (see `vite/01-vite-config.md`).
- Visual spec: [`../design-system/00-overview.md`](../design-system/00-overview.md) — locked v1.0 tokens + proposal process for changes.

## Checklist
- [ ] Alias `@` → `src` configured
- [ ] `data/` typed with interfaces in `types/`

## Law
Full enforceable rules: [`05-file-and-folder-rules.md`](./05-file-and-folder-rules.md) — naming, placement, imports, forbidden patterns. This file is the map; that file is the law.
