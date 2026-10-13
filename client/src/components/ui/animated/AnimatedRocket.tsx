"use client";

import React, { useState } from "react";
import { Rocket } from "lucide-react";

// Install: npm install lucide-react
// Usage: <AnimatedRocket /> or <AnimatedRocket loop size={72} />
// Step 06 — Deploy & Improve: the rocket trembles on the pad, then lifts off
// and settles, reading as "launch".
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
  .mesh-rocket {
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
  .mesh-rocket:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }
  /* the whole rocket (all paths) trembles, lifts off, then settles */
  .mesh-rocket > svg > path {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: mesh-rocket-launch 1.8s cubic-bezier(.22, 1, .36, 1) both;
  }
  .mesh-rocket[data-loop="true"] > svg > path {
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
  @keyframes mesh-rocket-launch {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    12% { transform: translate(-0.7px, 0) rotate(-2deg); opacity: 1; }
    24% { transform: translate(0.7px, 0) rotate(2deg); opacity: 1; }
    36% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    66% { transform: translate(0, -7px) rotate(0deg); opacity: 0.55; }
    86% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mesh-rocket > svg > path { animation: none; }
  }
`;

export default function AnimatedRocket({
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
        className={`mesh-rocket ${className}`}
        data-loop={loop}
        aria-label="Replay rocket animation"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <Rocket
          key={replay}
          size={iconSize}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
