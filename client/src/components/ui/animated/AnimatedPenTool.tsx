"use client";

import React, { useState } from "react";
import PenWritingIcon from "./PenWritingIcon";

// npm install lucide-react
// <AnimatedPenTool size={144} loop />
// Step 02 — Plan & Design: a pen draws a curved handwriting stroke.
// Hover, focus, or click to replay.
interface AnimatedIconProps {
  /** Outer circle size (px). */
  size?: number;
  /** Pen glyph size (px). */
  iconSize?: number;
  /** Icon / pen stroke color. */
  color?: string;
  /** Button background color. */
  background?: string;
  /** Pen glyph stroke width. */
  strokeWidth?: number;
  /** Time (ms) to draw the stroke once. */
  duration?: number;
  /** Loop the draw continuously. */
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const styles = `
.mesh-writing-pen { position: relative; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0; border: 0; border-radius: 50%; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.mesh-writing-pen:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
`;

export default function AnimatedPenTool({
  size = 72,
  iconSize = 28,
  color = "#A5EBC3",
  background = "#294F41",
  strokeWidth = 2,
  duration = 1800,
  loop = false,
  className = "",
  style,
}: AnimatedIconProps) {
  const [replay, setReplay] = useState(0);
  const restart = () => setReplay((value) => value + 1);

  return (
    <>
      <style>{styles}</style>
      <button
        type="button"
        className={`mesh-writing-pen ${className}`}
        aria-label="Replay pen drawing a curved stroke"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <PenWritingIcon
          size={size}
          iconSize={iconSize}
          strokeWidth={strokeWidth}
          duration={duration}
          loop={loop}
          playKey={replay}
          restartOnHover={false}
        />
      </button>
    </>
  );
}
