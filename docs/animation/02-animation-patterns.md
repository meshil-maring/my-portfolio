# 02 – Animation Patterns

## Purpose
Reusable, tasteful motion patterns for a portfolio.

## 1. Scroll reveal (sections, cards)
```tsx
import { motion } from 'motion/react';

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

## 2. Stagger (grids)
```tsx
const list = { show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
// <motion.ul variants={list} initial="hidden" whileInView="show" viewport={{ once: true }}>
```

## 3. Hover / tap (cards, buttons)
```tsx
<motion.a whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
```

## 4. Hero entrance
Sequence with `delay`: badge → heading → sub → CTAs → socials (each +0.08s).

## 5. Reduced motion
```tsx
import { useReducedMotion } from 'motion/react';
const reduce = useReducedMotion();
// if (reduce) skip transforms, render statically
```

## Rules
- Duration 0.3–0.6s; one easing curve per page (`[0.22, 1, 0.36, 1]`).
- Animate `opacity` + `transform` only (GPU-friendly).
- No infinite loops except subtle hero accents; pause offscreen.
