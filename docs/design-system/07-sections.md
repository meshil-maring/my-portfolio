# 07 — Sections (v1.1 LOCKED)

Order + ids: `#home` hero → `#work` 01 → `#services` 02 → `#skills` 03 → `#about` 04 → `#contact` 05. Footer unnumbered.

## Numbering style

Accent color, Inter or JetBrains Mono, 700–800, left-aligned number + uppercase label above H2 + optional divider. Number sections only, not every card.

## Hero (#home)

Badge: "Open to opportunities & freelance collaborations." Intro: `HI, I'M DS MESHIL MARING`. H1: `Engineering ideas into reality.` Role: `Full-Stack Developer & AI Application Engineer`. Desc: scalable web apps, secure backends, AI solutions. CTAs: `View My Projects` (primary) / `Work With Me` (secondary). Desktop 2-col (content + small code graphic); mobile stacks, illustration optional/hidden.

## Work (#work) — most important after hero

Featured card (40:60 image:text, status, title, problem, features, stack, links) + 2-col grid of secondary cards (16:10 images). Real screenshots only; mark In-Progress honestly; no unverified metrics. Case studies: problem, solution, role, architecture, decisions, challenges, lessons.

## Services (#services) — 01–04 zigzag featured panels

Full-Stack Web Apps · AI & RAG Solutions · Backend & APIs · Dashboards & CMS all render as featured panels (number, service icon, accent word, floating stack tiles from `stack`) with compact sizing (20/24/28px padding, 40px icon badge, 22/26px title). Panels flow in a zigzag: 01 left · 02 right · 03 left · 04 right (lg+, 74% wide; right-aligned rows mirror their internals so clusters face the gap), linked by a connected dashed line between panels (accent nodes on each end; straight vertical link below lg where panels stack full-width). Desktop cluster tiles use fixed-pixel slots in a centered 240×176 box — never overlapping; tiles wrap on mobile. Icons + concise copy. (proposal 2026-10-14-services-zigzag-flow) Each panel shows three scannable capability chips (`deliverables`, §05 tags) under the description and follows the §05 card hover (−2px lift + accent border, 200ms); the section closes with a centered CTA row — muted line + secondary Button ("Discuss a project" → #discuss). (proposal 2026-10-17-services-offer-polish)

## Skills (#skills) — grouped tags, no % bars

Frontend (React, TS, JS, HTML, CSS, Tailwind, Vite) · Backend (Python, FastAPI, Node, Express, REST, auth, RBAC) · AI/ML (RAG, LLMs, embeddings, semantic search, NLP, HF, sklearn) · Data/Infra (PostgreSQL, Supabase, pgvector, R2, Docker, Git/GitHub). Only what projects prove.

## About (#about) — desc + education card left, typing command card right; stack mobile (desc → card → education)

CSE student (Data Science & ML), Quest Group of Institutions Punjab. Full-stack + backend + AI. Areas: DSA, DBMS, ML, stats, vision, linear algebra. Right column: floating "I know how to" command card (`TypingSearchCard`) typing five capabilities — full-stack apps, secure REST APIs, AI assistants, scalable databases, workflow automation — then bringing the three blurred suggestions below up into the line one by one (active row sharpens to accent green); blinking accent caret; static under reduced motion. (proposal 2026-10-14-about-typing-command-card)

## Contact (#contact) — soft-green rounded container, centered

H2 `Let's build something great.` + short desc. CTAs: `Discuss a Project` / `Recruitment Inquiry`. Plus email, LinkedIn, GitHub, resume download. All URLs verified.

## Adding/reordering sections later

Proposal with number, id, nav impact, and content contract → minor bump. Renumbering all sections = minor; removing one = major note in CHANGELOG.
