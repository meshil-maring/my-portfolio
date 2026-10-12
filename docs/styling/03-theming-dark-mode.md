# 03 – Theming & Dark Mode

## Purpose
Class-based dark mode (`dark:` variant) with persisted preference.

## Setup
1. `darkMode: 'class'` in `tailwind.config.ts`.
2. `ThemeProvider` toggles `document.documentElement.classList` (see `architecture/03-state-management.md`).
3. Default to **dark** for a dev-portfolio look (or respect `prefers-color-scheme` on first visit).

```tsx
// Toggle button
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="rounded-lg p-2 hover:bg-white/10">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

## Patterns
```tsx
<section className="bg-white text-ink dark:bg-ink dark:text-white">
```

## Rules
- Every new surface must include a `dark:` variant (or explicitly inherit).
- Check contrast in both modes before merging.
