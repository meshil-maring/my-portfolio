"use client";

import { useEffect, useRef } from "react";

/**
 * Global circular "glass" cursor.
 *
 * - Outer ring = frosted glass (backdrop-blur + accent-tinted border/glow).
 * - Inner dot = precise accent pointer that tracks the mouse 1:1.
 * - Ring lerps behind for a smooth, weighted feel and grows over interactive
 *   elements (a, button, [role="button"], [data-cursor="hover"]).
 * - Only activates on fine-pointer devices; the native cursor is hidden via the
 *   `has-custom-cursor` class added on <html> here, so if JS ever fails the
 *   default cursor simply stays. Text inputs keep their I-beam.
 * - Respects prefers-reduced-motion (ring snaps instead of lerping).
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let shown = false;
    let raf = 0;
    let lastTarget: EventTarget | null = null;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!shown) {
        shown = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      // Only re-run the closest() DOM query when the event target changed —
      // pointermove can fire at 120Hz and the hover state rarely flips.
      const target = event.target as Element | null;
      if (target !== lastTarget) {
        lastTarget = target;
        const active = Boolean(
          target?.closest("a, button, [role='button'], summary, label, [data-cursor='hover']"),
        );
        ring.dataset.active = active ? "true" : "false";
      }
      // Restart the lerp loop if it settled (see loop() below).
      if (raf === 0) raf = requestAnimationFrame(loop);
    };

    const onDown = () => {
      ring.dataset.down = "true";
    };
    const onUp = () => {
      ring.dataset.down = "false";
    };
    const onLeave = () => {
      shown = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    // Lerp the ring toward the pointer, then STOP the loop once it has
    // settled — an idle cursor must not burn a permanent 60fps frame loop.
    // onMove restarts it whenever the pointer moves again.
    const loop = () => {
      const ease = reduce ? 1 : 0.18;
      rx += (x - rx) * ease;
      ry += (y - ry) * ease;
      // Settled when both axes are within a sub-pixel of the target.
      const settled = Math.abs(x - rx) < 0.1 && Math.abs(y - ry) < 0.1;
      if (settled) {
        rx = x;
        ry = y;
      }
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    // No loop until the pointer first moves — nothing to track before that.

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={ringRef} data-cursor-ring className="cursor-ring" />
      <div ref={dotRef} data-cursor-dot className="cursor-dot" />
    </div>
  );
}
