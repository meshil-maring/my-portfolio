// design-system §02/§05/§07 type scale — shared class strings so every
// section eyebrow, H2 and card/panel title renders exactly the same size,
// weight, line-height and tracking (docs/design-system/02-typography.md).
// Keep these in sync with the spec tables; change = proposal + minor bump.

/** Uppercase micro-label: section eyebrow, card status line, hero intro.
 *  §02 "Section label": 11px, 700, uppercase, +0.12em, JetBrains Mono.
 *  Callers append their color (text-accent for section/card labels). */
export const eyebrowClass =
  "font-mono text-[11px] font-bold uppercase tracking-[0.12em]";

/** Section H2: 36px desktop / 28px mobile, w800, LH 1.2, -0.03em (§02). */
export const sectionTitleClass =
  "text-[28px] font-extrabold leading-[1.2] tracking-[-0.03em] lg:text-[36px]";

/** Card H3: 20px desktop / 18px mobile, w700, LH 1.3 (§02). */
export const cardTitleClass = "text-lg font-bold leading-[1.3] lg:text-xl";

/** Featured panel H3 (featured project rows + service panels, §07):
 *  26px desktop / 22px mobile, w700, LH 1.3. */
export const featuredTitleClass =
  "text-[22px] font-bold leading-[1.3] lg:text-[26px]";