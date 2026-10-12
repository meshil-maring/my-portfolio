# 03 – Scripts

## Purpose
Canonical npm scripts (keep `package.json` and this file in sync).

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Local dev with HMR |
| `build` | `tsc -b && vite build` | Typecheck + production build |
| `preview` | `vite preview` | Preview `dist/` locally |
| `lint` | `eslint .` | Lint all files |
| `format` | `prettier --write .` | Format |
| `test` | `vitest` | Unit tests (when added) |

## Examples
```bash
npm run dev
npm run build && npm run preview
npm run lint
```

## Rule
Adding a script? Document it here in the same PR.
