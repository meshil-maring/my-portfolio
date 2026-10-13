"use client";

import React, { useEffect, useRef } from "react";
import { PenTool } from "lucide-react";

// Bare handwriting stage used by <AnimatedPenTool> and embedded directly in the
// Process section's step-02 badge. Draws a curved stroke while the pen traces it.
// Handwriting path: rounded upstroke, descending bend, then an upward finishing stroke.
const HANDWRITING_D =
  "M30 92 C65 49 96 10 110 21 C135 33 91 111 94 118 C96 140 143 86 167 64";

const styles = `
.mesh-writing-stage { position: relative; display: block; flex-shrink: 0; }
.mesh-writing-stage .writing-frame { position: absolute; top: 20%; right: 10%; bottom: 20%; left: 10%; pointer-events: none; }
.mesh-writing-stage .writing-ink { display: block; width: 100%; height: 100%; overflow: visible; }
.mesh-writing-stage .writing-tip { position: absolute; left: 0; top: 0; display: flex; transform: translate(-9.6%, -9.6%); pointer-events: none; }
`;

interface PenWritingIconProps {
  /** Outer box size (px) — matches the badge inner circle. */
  size: number;
  /** Pen glyph size (px). */
  iconSize?: number;
  /** Pen glyph stroke width. */
  strokeWidth?: number;
  /** Time (ms) to draw the stroke once. */
  duration?: number;
  /** Loop the draw continuously. */
  loop?: boolean;
  /** Changing this value restarts the animation (used by the button wrapper). */
  playKey?: number;
  /** Restart on pointer-enter (disable when a parent button already handles it). */
  restartOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PenWritingIcon({
  size,
  iconSize = 28,
  strokeWidth = 2,
  duration = 1800,
  loop = false,
  playKey = 0,
  restartOnHover = true,
  className = "",
  style,
}: PenWritingIconProps) {
  const stage = useRef<HTMLSpanElement>(null);
  const beginRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const path = root.querySelector<SVGPathElement>(".writing-ink path");
    const pen = root.querySelector<HTMLElement>(".writing-tip");
    if (!path || !pen) return;

    const length = path.getTotalLength();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const writeTime = Math.max(500, Number(duration) || 1800);
    let frame = 0;
    let start: number | undefined;

    function paint(progress: number) {
      const drawn = Math.min(length, Math.max(0, progress * length));
      path!.style.strokeDasharray = String(length);
      path!.style.strokeDashoffset = String(length - drawn);
      const point = path!.getPointAtLength(drawn);
      pen!.style.left = `${(point.x / 240) * 100}%`;
      pen!.style.top = `${(point.y / 140) * 100}%`;
    }

    function tick(time: number) {
      if (start === undefined) start = time;
      const elapsed = time - start;
      paint(Math.min(elapsed / writeTime, 1));
      if (elapsed < writeTime || loop) {
        if (loop && elapsed >= writeTime + 1100) start = time;
        frame = requestAnimationFrame(tick);
      }
    }

    function begin() {
      cancelAnimationFrame(frame);
      start = undefined;
      if (media.matches) {
        paint(1);
        return;
      }
      paint(0);
      frame = requestAnimationFrame(tick);
    }

    beginRef.current = begin;
    begin();
    media.addEventListener("change", begin);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", begin);
    };
  }, [playKey, loop, duration]);

  return (
    <>
      <style>{styles}</style>
      <span
        ref={stage}
        className={`mesh-writing-stage ${className}`}
        aria-hidden="true"
        onPointerEnter={restartOnHover ? () => beginRef.current() : undefined}
        style={{ width: size, height: size, ...style }}
      >
        <span className="writing-frame">
          <svg
            className="writing-ink"
            viewBox="0 0 240 140"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Start hidden to avoid a first-paint flash before the draw begins. */}
            <path d={HANDWRITING_D} style={{ strokeDasharray: 999, strokeDashoffset: 999 }} />
          </svg>
          <span className="writing-tip">
            <PenTool size={iconSize} strokeWidth={strokeWidth} aria-hidden="true" />
          </span>
        </span>
      </span>
    </>
  );
}
