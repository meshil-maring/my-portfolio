# 02 – Env Variables

## Purpose
Type-safe client env vars with Vite.

## Usage
```bash
# .env.local (gitignored)
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxx
VITE_SITE_URL=http://localhost:5173
```

```ts
// src/lib/env.ts
export const env = {
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
  siteUrl: import.meta.env.VITE_SITE_URL as string | undefined,
} as const;
```

```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_SITE_URL?: string;
}
```

## Rules
- Only `VITE_`-prefixed vars are exposed to the browser. Never put secrets in them.
- All `import.meta.env` access goes through `src/lib/env.ts` (typed, single place).
- Commit `.env.example` with empty keys; never commit `.env.local`.
