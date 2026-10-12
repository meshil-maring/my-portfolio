# 03 – Code Review Checklist

## Purpose
What "done" means before merging to `main`.

## Checklist
- [ ] **Builds**: `npm run build` passes (typecheck + vite build), no ESLint errors
- [ ] **Docs**: relevant `docs/` file updated in same PR
- [ ] **Responsive**: mobile → desktop checked (Chrome devtools + one real device if possible)
- [ ] **Dark mode**: `dark:` variants verified, contrast OK
- [ ] **Motion**: respects reduced-motion, durations 0.3–0.6s, no jank
- [ ] **A11y**: semantic HTML, alt text, focus-visible, keyboard navigation
- [ ] **Perf**: images optimized, no new heavy deps without justification
- [ ] **Commits**: conventional, PR title clear, branch deleted after merge

## For the author
- Self-review the diff, remove dead code/logs, attach preview screenshot or deploy link.

## For the reviewer
- Check behavior from `preview`, not just code. Comment with file + line, suggest don't demand (unless blocking).
