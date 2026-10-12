# Documentation – MyPortfolio (Frontend)

> Organized, living documentation for the frontend: **TypeScript + Vite + TailwindCSS + Motion**.

## How docs are organized

```
docs/
├── README.md                 ← you are here (index + how to use)
├── overview/
│   ├── 01-project-vision.md
│   ├── 02-tech-stack.md
│   └── 03-roadmap.md
├── getting-started/
│   ├── 01-prerequisites.md
│   ├── 02-installation.md
│   └── 03-scripts.md
├── architecture/
│   ├── 01-folder-structure.md
│   ├── 02-routing.md
│   ├── 03-state-management.md
│   ├── 04-component-conventions.md
│   └── 05-file-and-folder-rules.md (LAW — naming, placement, imports)
├── styling/
│   ├── 01-tailwind-setup.md
│   ├── 02-design-tokens.md (defers to design-system v1.0)
│   └── 03-theming-dark-mode.md
├── design-system/            ← VISUAL LAW v1.0 (colors, type, spacing, sections, tokens, proposals)
│   ├── 00-overview.md (start here: versioning + proposal process)
│   ├── 01-colors.md … 09-themes.md (LOCKED spec)
│   ├── 10-content-model.md + 11-tokens-reference.md (build from these)
│   ├── 12-accessibility.md … 14-implementation.md (checklists)
│   ├── CHANGELOG.md + proposals/ (room for future updates)
├── animation/
│   ├── 01-motion-setup.md
│   └── 02-animation-patterns.md
├── typescript/
│   ├── 01-config-strictness.md
│   └── 02-type-conventions.md
├── vite/
│   ├── 01-vite-config.md
│   ├── 02-env-variables.md
│   └── 03-build-deploy.md
└── contributing/
    ├── 01-git-workflow.md
    ├── 02-commit-conventions.md
    └── 03-code-review.md
```

Number prefixes (`01-`, `02-`) keep files sorted in explorers and GitHub.

## Reading order for newcomers

1. `overview/01-project-vision.md` → `overview/02-tech-stack.md`
2. `getting-started/` (1 → 2 → 3)
3. `architecture/01-folder-structure.md` → `05-file-and-folder-rules.md` (read the law)
4. `styling/` + `animation/` + `typescript/` + `vite/`
5. `contributing/` before first PR

## Conventions

- One topic per file, ≤ 200 lines where possible
- Every guide has: Purpose, Prerequisites, Steps/Concepts, Example, Checklist / Next steps
- Code blocks specify language: ```ts, ```tsx, ```bash, ```css
- `TODO:` marks decisions not yet locked (searchable)
- Update docs in same PR as code change
