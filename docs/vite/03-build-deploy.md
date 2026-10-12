# 03 – Build & Deploy

## Purpose
Ship the portfolio from `dist/` to a static host.

## Build
```bash
npm run build   # tsc -b && vite build
npm run preview # verify dist/ locally at http://localhost:4173
```

Pre-deploy checklist:
- [ ] No TS/ESLint errors
- [ ] Title, meta description, OG image, favicon set in `index.html`
- [ ] All routes / anchors work from `preview` (not just `dev`)
- [ ] Images optimized, lazy-loaded below fold

## Deploy options
| Host | Notes |
|---|---|
| Vercel | `vercel --prod`; auto-deploys on push to `main` |
| Netlify | Drag `dist/` or connect repo; publish dir `dist` |
| GitHub Pages | `vite build` with `base: '/my-portfolio/'` + Actions deploy |

## Rule
`main` is always deployable. Tag releases (`v1.0`) when portfolio milestones ship.
