# 01 – Vite Config

## Purpose
Canonical `vite.config.ts` with TS path alias and sensible defaults.

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
});
```

```bash
npm install -D vite-tsconfig-paths
```

## Rules
- `@/` alias must work in Vite, TS (`paths`), and ESLint — test all three.
- Keep base `'/'`; set `base: '/<repo>/'` only for GitHub Pages project sites.
- Document any new plugin here + in `getting-started/03-scripts.md` if it adds a script.

## Next
→ `02-env-variables.md`
