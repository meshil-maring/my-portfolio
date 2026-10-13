"use client";

import React, { useState } from "react";
import { ClipboardCheck } from "lucide-react";

// Install: npm install lucide-react
// Usage: <AnimatedClipboardCheck /> or <AnimatedClipboardCheck loop size={72} />
// Step 05 — Test & Refine: the clipboard "stamps" down while the checkmark
// draws itself, reading as "checks passing / verified".
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
  .mesh-clipboard {
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
  .mesh-clipboard:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }
  /* board outline + clip "stamp" bounce */
  .mesh-clipboard > svg > path:nth-child(2),
  .mesh-clipboard > svg > rect:nth-child(1) {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: mesh-clipboard-stamp 1.5s cubic-bezier(.22, 1, .36, 1) both;
  }
  /* checkmark draws itself as the stamp lands */
  .mesh-clipboard > svg > path:nth-child(3) {
    stroke-dasharray: 12;
    stroke-dashoffset: 12;
    animation: mesh-clipboard-draw 1.5s cubic-bezier(.65, 0, .35, 1) both;
  }
  .mesh-clipboard[data-loop="true"] > svg > path,
  .mesh-clipboard[data-loop="true"] > svg > rect:nth-child(1) {
    animation-duration: 2.6s;
    animation-iteration-count: infinite;
  }
  @keyframes mesh-clipboard-stamp {
    0% { transform: scale(1); }
    30% { transform: scale(0.9); }
    55% { transform: scale(1.04); }
    100% { transform: scale(1); }
  }
  @keyframes mesh-clipboard-draw {
    0%, 20% { stroke-dashoffset: 12; }
    70%, 100% { stroke-dashoffset: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mesh-clipboard > svg > path,
    .mesh-clipboard > svg > rect:nth-child(1) { animation: none; }
  }
`;

export default function AnimatedClipboardCheck({
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
        className={`mesh-clipboard ${className}`}
        data-loop={loop}
        aria-label="Replay clipboard check animation"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <ClipboardCheck
          key={replay}
          size={iconSize}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
