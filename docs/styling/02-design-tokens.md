# 02 – Design Tokens

## Purpose
One place for brand colors, type, spacing, radius, shadows. Components reference tokens, never raw values twice.

## Tokens (starter – adjust to taste)
```ts
// tailwind.config.ts → theme.extend
colors: {
  brand: {
    50: '#eef6ff', 100: '#d9eaff', 200: '#bcdcff',
    300: '#8ec6ff', 400: '#59a5ff', 500: '#3382ff',
    600: '#1b5ff5', 700: '#144be1', 800: '#173fb4',
    900: '#182f6e', 950: '#101b3d',
  },
  ink: { DEFAULT: '#0b1020', muted: '#5b6478' },
},
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Sora', 'Inter', 'sans-serif'],
},
borderRadius: { xl2: '1rem' },
boxShadow: { soft: '0 8px 30px rgb(0 0 0 / 0.08)' },
```

```css
/* src/styles/tokens.css (optional CSS vars for non-tailwind use) */
:root {
  --brand-500: #3382ff;
  --radius: 1rem;
}
```

## Usage
```tsx
<button className="rounded-xl2 bg-brand-500 px-5 py-2.5 text-white shadow-soft hover:bg-brand-600">
  View projects
</button>
```

## Rules
- Tokens are LOCKED by design-system v1.0: see `../design-system/01-colors.md` + `../design-system/11-tokens-reference.md` (copy-paste source).
- New color? Open a proposal first (`../design-system/proposals/`), don't edit tokens silently.
- Dark-mode variants live in `03-theming-dark-mode.md` + `../design-system/09-themes.md`.
