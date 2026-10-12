# 01 – Git Workflow

## Purpose
Simple trunk-based flow for a solo/small-team portfolio.

## Branches
- `main` — always deployable, protected (require PR when collaborating).
- `feat/<slug>` — e.g. `feat/hero-section`, `feat/projects-data`.
- `fix/<slug>`, `docs/<slug>`, `chore/<slug>`.

## Everyday flow
```bash
git checkout main && git pull origin main
git checkout -b feat/hero-section
# ... work, commit ...
git push -u origin feat/hero-section
# open PR → review → squash-merge → delete branch
```

## Rules
- One concern per branch/PR. Keep PRs < 400 lines when possible.
- Pull with rebase for local-only commits: `git pull --rebase`.
- Never force-push `main`. Never commit `dist/`, `.env.local`, editor junk.

## Recommended `.gitignore` (repo root)
```
node_modules/
dist/
.env.local
.env*.local
*.log
.DS_Store
```

## Next
→ `02-commit-conventions.md`
