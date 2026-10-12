# 02 – Routing

## Purpose
Decide between single-page anchors vs. multi-page routes.

## v1 – Single page (default)
- One route `/`, sections with `id`s: `#home #about #skills #projects #experience #contact`
- Smooth scroll via CSS (`scroll-behavior: smooth` + `scroll-margin-top` for sticky nav)
- Simple, fast, SEO-friendly enough for a portfolio

```tsx
// App.tsx (v1)
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
// ...
export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><About /><Skills /><Projects /><Experience /><Contact />
      </main>
      <Footer />
    </>
  );
}
```

## v2 – Multi-page (when needed)
- Add `react-router-dom` for `/`, `/projects/:slug`, `/blog`, `*` (404)
- Lazy-load detail pages: `const ProjectDetail = lazy(() => import(...))`

## Rules
- Don't add router until a second real page exists.
- Every route needs title/meta handling + 404.
