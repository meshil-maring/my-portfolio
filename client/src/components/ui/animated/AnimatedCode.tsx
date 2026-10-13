"use client";

import React, { useState } from "react";
import { Code2 } from "lucide-react";

// Install: npm install lucide-react
// Usage: <AnimatedCode /> or <AnimatedCode loop size={72} />
// Step 04 — Develop: the < > chevrons squeeze toward center while the slash
// pulses, reading as "code compiling / logic closing in".
// Hover, focus, or click to replay.
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
  .mesh-code {
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
  .mesh-code:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }
  .mesh-code > svg > path {
    transform-box: view-box;
    transform-origin: 50% 50%;
  }
  /* right chevron '>' nudges left, toward center */
  .mesh-code > svg > path:nth-child(1) {
    animation: mesh-code-right 1.5s cubic-bezier(.22, 1, .36, 1) both;
  }
  /* left chevron '<' nudges right, toward center */
  .mesh-code > svg > path:nth-child(2) {
    animation: mesh-code-left 1.5s cubic-bezier(.22, 1, .36, 1) both;
  }
  /* slash '/' pulses like an active cursor */
  .mesh-code > svg > path:nth-child(3) {
    animation: mesh-code-slash 1.5s ease-in-out both;
  }
  .mesh-code[data-loop="true"] > svg > path {
    animation-duration: 2.6s;
    animation-iteration-count: infinite;
  }
  @keyframes mesh-code-right {
    0%, 100% { transform: translateX(0); }
    45% { transform: translateX(-2px); }
  }
  @keyframes mesh-code-left {
    0%, 100% { transform: translateX(0); }
    45% { transform: translateX(2px); }
  }
  @keyframes mesh-code-slash {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    45% { transform: scaleY(0.55); opacity: 0.55; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mesh-code > svg > path { animation: none; }
  }
`;

export default function AnimatedCode({
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
        className={`mesh-code ${className}`}
        data-loop={loop}
        aria-label="Replay code animation"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <Code2
          key={replay}
          size={iconSize}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
