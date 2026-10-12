# 01 – Motion Setup

## Purpose
Install and configure Motion (the `motion` package — successor to Framer Motion) for React.

> Package rename: `framer-motion` → `motion`. For React use `motion/react`.
> See: https://motion.dev/docs/react-install

## Install
```bash
npm install motion
```

## Basic use
```tsx
import { motion } from 'motion/react';

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

## Rules
- Import from `'motion/react'` (not `'framer-motion'`) in new code.
- Wrap app-level exit/page transitions with `<AnimatePresence>` only when multi-page.
- Respect `prefers-reduced-motion` for non-essential animation (see `02-animation-patterns.md`).

## Next
→ `02-animation-patterns.md`
