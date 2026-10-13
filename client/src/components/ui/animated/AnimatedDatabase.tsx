"use client";

import React, { useState } from "react";
import { Database } from "lucide-react";

// Install: npm install lucide-react
// Usage: <AnimatedDatabase /> or <AnimatedDatabase loop size={72} />
// Step 03 — Architecture & Database: a data layer scans down through the
// stack while the top disk dips, reading as "records flowing through a schema".
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
  .mesh-database {
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
  .mesh-database:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }
  /* top disk dips as new data presses in */
  .mesh-database > svg > ellipse:nth-child(1) {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: mesh-database-dip 1.8s cubic-bezier(.22, 1, .36, 1) both;
  }
  /* middle separator scans down through the body, then resets invisibly */
  .mesh-database > svg > path:nth-child(3) {
    transform-box: view-box;
    transform-origin: 50% 50%;
    animation: mesh-database-scan 1.8s cubic-bezier(.55, 0, .45, 1) both;
  }
  .mesh-database[data-loop="true"] > svg > ellipse:nth-child(1),
  .mesh-database[data-loop="true"] > svg > path:nth-child(3) {
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
  @keyframes mesh-database-dip {
    0% { transform: translateY(0); }
    30% { transform: translateY(1.2px); }
    100% { transform: translateY(0); }
  }
  @keyframes mesh-database-scan {
    0% { transform: translateY(0); opacity: 1; }
    55% { transform: translateY(7px); opacity: 0; }
    56% { transform: translateY(0); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mesh-database > svg > ellipse:nth-child(1),
    .mesh-database > svg > path:nth-child(3) { animation: none; }
  }
`;

export default function AnimatedDatabase({
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
        className={`mesh-database ${className}`}
        data-loop={loop}
        aria-label="Replay database animation"
        onPointerEnter={restart}
        onFocus={restart}
        onClick={restart}
        style={{ width: size, height: size, color, background, ...style }}
      >
        <Database
          key={replay}
          size={iconSize}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
