# 02 – Type Conventions

## Purpose
How we model domain data and props.

## Shared types (`src/types/`)
```ts
// src/types/portfolio.ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  start: string; // 'YYYY-MM'
  end?: string;  // undefined = present
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}
```

## Rules
- `interface` for objects, `type` for unions/intersections/aliases.
- Prefer `unknown` over `any`; narrow before use. `any` needs a `// TODO:` + reason.
- Optional (`?`) only when field is genuinely absent; avoid `| null` unless tri-state needed.
- Colocate narrow prop types with component; promote to `src/types/` when reused ≥ 2 places.
- Derive from data: `export type ProjectSlug = Project['slug']`.
- Validate external data (forms, APIs) at boundaries; trust typed `src/data/*.ts` inside.
