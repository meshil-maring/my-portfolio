# 04 – Component Conventions

## Purpose
Consistent, reviewable components across the portfolio.

## Rules
1. **One component per file**, file name = component name (`Button.tsx` → `Button`).
2. **Named exports** for components (`export function Button`), default export only for lazy routes.
3. **Props typed** with `interface Props` (or `type`), colocated at top of file.
4. **No magic strings**: extract to `src/lib/constants.ts` or `src/data/*.ts`.
5. **Styling**: Tailwind utilities + `cn()` helper for conditionals:
   ```ts
   // src/lib/cn.ts
   import { clsx, type ClassValue } from 'clsx';
   import { twMerge } from 'tailwind-merge';
   export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
   ```
6. **Accessibility**: semantic tags, `aria-*` where needed, visible `:focus-visible` rings, `alt` text on images.
7. **Sections** accept `id` + `className`, wrap in shared `<Section>`:
   ```tsx
   export function Projects({ id = 'projects' }: { id?: string }) {
     return (
       <Section id={id} eyebrow="Work" title="Projects">
         {/* cards from src/data/projects.ts */}
       </Section>
     );
   }
   ```

## File template
```tsx
interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return <section id="home" className={cn('...', className)}>{/* ... */}</section>;
}
```

## Checklist (per component PR)
- [ ] Typed props, no `any`
- [ ] Responsive (mobile-first classes)
- [ ] Focus/hover states, alt text
- [ ] Uses tokens (no arbitrary hex except one-offs)
