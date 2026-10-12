# 03 – State Management

## Purpose
Keep state boring and local. No global store until necessary.

## Tiers
1. **Local state** (`useState`, `useReducer`) — navbar open, form fields, filters.
2. **URL state** — project filter/tag, theme (`?theme=` optional). Shareable.
3. **Context** — only for truly global: `ThemeContext`.
4. **Server/cache** — none in v1 (static data). Add TanStack Query only if CMS/API arrives.

## Example – Theme context
```tsx
// src/hooks/useTheme.tsx
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>(null!);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) ?? 'dark',
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeCtx.Provider>
  );
}
export const useTheme = () => useContext(ThemeCtx);
```

## Rules
- Colocate state with its component; lift only when 2+ siblings need it.
- Persist only theme + trivial prefs in `localStorage`.
