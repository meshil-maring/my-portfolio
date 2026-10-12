# 10 — Content Model (v1.0 LOCKED)

Every section maps to typed data in `src/data/` + types in `src/types/portfolio.ts`. No hard-coded lists in components.

## Projects (`data/projects.ts: Project[]`)

```ts
interface Project {
  slug: string;            // 'college-ai-assistant'
  title: string;
  status: 'Live' | 'In Progress';
  type: string;            // 'AI / RAG Application'
  description: string;     // 1–2 sentences
  highlights: string[];    // 4–8 bullets
  tags: string[];          // tech tags
  image: string;           // 16:10 real screenshot
  liveUrl?: string; repoUrl?: string; caseStudyUrl?: string;
  featured?: boolean;
}
```

v1 rows: `college-ai-assistant` (In Progress, React/TS/Python/FastAPI/RAG/PostgreSQL/Supabase) · `epm-staffing-services` (Live, React/Node/Express/PostgreSQL) · `projectg` (Live, React/TS/Prisma/Docker/Supabase). New project = append row (patch). New field = minor + type update.

## Services (`data/services.ts`)

`{ n: '01'..'04', title, description, icon: 'Code2'|'BrainCircuit'|'Server'|'LayoutDashboard' }` — Full-Stack / AI&RAG / Backend&APIs / Dashboards&CMS.

## Skills (`data/skills.ts`)

`{ label: 'Frontend Development', skills: [...] }[]` — 4 groups per §07. Reorder/add skill = patch; new group = minor.

## Socials/links (`data/socials.ts`), nav (`lib/constants.ts`)

`NAV_LINKS: [{ label, href: '#work'... }]` · socials `{ label, href, icon }` — email/LinkedIn/GitHub/resume. All URLs verified; dead links are PR-blocking.

## Copy rules

Real screenshots only. Honest statuses. No fake metrics. One accent word per heading. 60–75ch paragraphs.
