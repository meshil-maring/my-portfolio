# 01 – Tailwind Setup

## Purpose
Get Tailwind working with Vite + TS.

## Steps (Tailwind v3)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { /* see 02-design-tokens.md */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> Tailwind v4 uses `@import "tailwindcss"` + CSS-first config. Stick to v3 unless you deliberately choose v4 — record the choice in `overview/02-tech-stack.md`.

## Verify
Add `<h1 className="text-3xl font-bold underline">Hi</h1>` — if underlined big text renders, Tailwind works.

## Next
→ `02-design-tokens.md`
