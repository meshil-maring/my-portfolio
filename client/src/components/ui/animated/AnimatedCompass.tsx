"use client";

import React, { useState } from "react";
import { Compass } from "lucide-react";

// Install: npm install lucide-react
// Usage: <AnimatedCompass /> or <AnimatedCompass loop size={72} />
// Step 01 — Understand: the needle swings, overshoots, and settles on north.
// Hover, focus, or click to replay. Only the needle moves.
interface AnimatedIconProps {
  size?: number;
  iconSize?: number;
  color?: string;
  background?: string;
  strokeWidth?: number;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const styles = `
  .mesh-compass {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .mesh-compass:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }
  .mesh-compass > svg > path {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: mesh-compass-needle 1.6s cubic-bezier(.22, 1, .36, 1) both;
  }
  .mesh-compass[data-loop="true"] > svg > path {
    animation-duration: 2.8s;
    animation-iteration-count: infinite;
  }
  @keyframes mesh-compass-needle {
    0% { transform: rotate(0deg); }
    18% { transform: rotate(-35deg); }
    45% { transform: rotate(105deg); }
    66% { transform: rotate(-18deg); }
    82% { transform: rotate(8deg); }
    100% { transform: rotate(0deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mesh-compass > svg > path { animation: none; }
  }
`;

export default function AnimatedCompass({
  size = 72,
  iconSize = 32,
  color = "#A5EBC3",
  background = "#294F41",
  strokeWidth = 2,
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
        className={`mesh-compass ${className}`}
        data-loop={loop}
        aria-label="Replay compass animation"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <Compass
          key={replay}
          size={iconSize}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
