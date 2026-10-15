# Proposal: About — floating "I know how to" typing command card

- Date: 2026-10-14
- Status: APPLIED
- Affects: section (07) + motion (08) + code (`About`, new `ui/TypingSearchCard`, `site.ts`, `globals.css`)
- Version bump: minor (1.2 → 1.3)

## Problem / opportunity
The About section's right column was a static education card; the owner asked for a minimalist, interactive coding animation inspired by floating AI command/search interfaces (v0/Copilot-style prompt box) that showcases capabilities, while keeping the existing intro, education content, green accent, and section identity.

## Proposed change
New reusable `components/ui/TypingSearchCard.tsx` ("use client"): floating command card built from §05 tokens (`rounded-xl` = the 12px card radius, `border-border`, `bg-surface`, `--shadow-card` light / soft deep shadow dark; note the `--radius-card` token isn't registered in `@theme`, so `rounded-card` compiles to nothing — pre-existing, left unchanged) with a dark `Code2` icon tile (dark in both themes), a mono uppercase label ("I know how to"), and a typed capability line. Messages (`about.command.messages` in `data/site.ts`): *Build full-stack applications · Develop secure REST APIs · Create AI-powered assistants · Design scalable databases · Automate business workflows* — typed (55ms/char), held (1600ms), smoothly deleted (28ms/char), gap 320ms, then next message, looping. Blinking green caret via new `--animate-caret-blink` (accent color, `caret-blink` keyframes, `step-end`). Three suggestion rows sit below the card with progressive blur/opacity (text-muted 75/55/40%, blur 0.3/0.45/0.6px) and JOIN the typing rotation after the five messages — while a suggestion is being typed into the label line, its row sharpens from blur to accent green (the suggestion "brought up" one by one); the list stays `aria-hidden` + `select-none` (the whole rotation is announced once via sr-only). `About.tsx` reuses the existing Section: intro + education card stack in the left column; the card is placed right via `md:col-start-2 md:row-span-2 md:row-start-1` and vertically centered (`flex items-center`); mobile stacks intro → card → education. Hero untouched.

## Light + dark impact
No token changes. Card uses standard surface/border in both themes (light shadow `--shadow-card`; dark gets `0 20px 50px rgba(0,0,0,.45)` so it still floats with `--shadow-card: none`). Caret/dots use `--color-accent` (#176C4C light / #A5ECC0 dark). Icon tile stays dark in both themes (app-glyph look).

## Responsive + a11y impact
Two columns from md (card spans both rows, centered), single column below. Typed-line `min-h` reserves two lines under sm and one line from sm up so typing never shifts layout; font stays 15px until lg where the two-column text width allows 16px. `prefers-reduced-motion`: the loop never starts (no timers scheduled), the first message renders whole, and the global reduced-motion rule flattens the caret blink to a steady cursor. Typing is decorative: a single `sr-only` line announces the label + full capability list once (no per-keystroke `aria-live` noise). All `setTimeout` handles are cleared in the effect cleanup.

## Alternatives considered
Replacing the education card outright (rejected — owner brief says reuse the About section; education is spec'd content in 07). Full-width animation below both columns (rejected — owner asked intro left / animation right). Continuous idle float of the card (rejected — owner asked to avoid bouncing/distracting motion; elevation is conveyed by border + shadow).

## Decision
Accepted via owner task 2026-10-14 ("Add a professional coding animation to my existing About Me section…"). Applied same day.