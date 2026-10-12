# 11 — Tokens Reference (v1.0, copy-paste)

## CSS variables

```css
:root {
  --color-bg: #F8FAF8; --color-surface: #FFFFFF; --color-soft: #F0F5F1;
  --color-hero: #EFF6F1; --color-text: #172A23; --color-muted: #596D63;
  --color-faint: #7E9186; --color-accent: #176C4C; --color-accent-text: #FFFFFF;
  --color-accent-soft: #E2F2E8; --color-border: #DCE8DF;
  --radius-card: 12px; --radius-button: 8px; --radius-chip: 6px;
  --container-width: 1160px; --page-gutter: 48px; --section-padding: 40px;
  --card-padding: 20px; --grid-gap: 16px;
  --transition-fast: 180ms ease; --transition-normal: 220ms ease;
  --shadow-card: 0 6px 24px rgba(20, 50, 32, 0.06);
  --font-sans: 'Inter', system-ui, sans-serif; --font-mono: 'JetBrains Mono', monospace;
}
.dark {
  --color-bg: #101816; --color-surface: #18231F; --color-soft: #1C2C24;
  --color-hero: #182A21; --color-text: #F0F7F1; --color-muted: #ADBDAF;
  --color-faint: #82998A; --color-accent: #A5ECC0; --color-accent-text: #14271B;
  --color-accent-soft: #274838; --color-border: #304438;
  --shadow-card: none;
}
@media (max-width: 1024px) {
  :root { --page-gutter: 32px; --section-padding: 34px; --card-padding: 18px; --grid-gap: 14px; }
}
@media (max-width: 640px) {
  :root { --page-gutter: 20px; --section-padding: 28px; --card-padding: 16px; --grid-gap: 12px; }
}
```

## Tailwind mapping (v3)

```ts
theme: { extend: {
  colors: {
    bg: 'var(--color-bg)', surface: 'var(--color-surface)', soft: 'var(--color-soft)',
    hero: 'var(--color-hero)', ink: 'var(--color-text)', muted: 'var(--color-muted)',
    faint: 'var(--color-faint)', accent: 'var(--color-accent)',
    'accent-text': 'var(--color-accent-text)', 'accent-soft': 'var(--color-accent-soft)',
    line: 'var(--color-border)',
  },
  fontFamily: { sans: ['Inter','system-ui','sans-serif'], mono: ['JetBrains Mono','monospace'] },
  maxWidth: { shell: '1160px' },
  borderRadius: { card: '12px', btn: '8px', chip: '6px' },
  boxShadow: { card: '0 6px 24px rgba(20,50,32,.06)' },
}}
```

Usage: `bg-bg text-ink border-line bg-accent text-accent-text rounded-card shadow-card`.
