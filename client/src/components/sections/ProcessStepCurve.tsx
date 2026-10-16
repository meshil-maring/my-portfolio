"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Compass, PenTool, Database, Code2, ClipboardCheck, Rocket } from "lucide-react";
import PenWritingIcon from "@/components/ui/animated/PenWritingIcon";

interface CurvedLine {
  text: string;
  kind: "step" | "heading" | "body";
  top: number;
  curve: number;
  height: number;
}

interface ProcessStepCurveProps {
  stepLabel: string;
  title: string;
  description: string;
  icon: string;
  mirror?: boolean;
}

interface Metrics {
  stepSize: number;
  stepHeight: number;
  headingSize: number;
  headingHeight: number;
  bodySize: number;
  bodyHeight: number;
  diameter: number;
  gap: number;
  stepGap: number;
  headingGap: number;
  bodyGap: number;
}

// Layout tier mirrors Tailwind's md (768px) / lg (1024px) breakpoints so
// JS metrics, anchors and mirroring always agree with the CSS spine
// (md:left-1/2). Driven by the *viewport*, never by container width —
// a 704px container at a 768px viewport is still the md layout.
type Tier = "mobile" | "tablet" | "desktop";

function tierFor(viewport: number): Tier {
  if (viewport < 768) return "mobile";
  if (viewport < 1024) return "tablet";
  return "desktop";
}

function metricsFor(tier: Tier): Metrics {
  if (tier === "mobile") {
    return {
      stepSize: 12, stepHeight: 18,
      headingSize: 17, headingHeight: 21,
      bodySize: 13, bodyHeight: 19,
      diameter: 62, gap: 12,
      stepGap: 0, headingGap: 8, bodyGap: 6,
    };
  }
  if (tier === "tablet") {
    // Tablet (768-1023): centred spine like desktop, but a tighter circle
    // and type scale so a text column (~half the container, ~258px here)
    // wraps instead of running past the right edge.
    return {
      stepSize: 12, stepHeight: 20,
      headingSize: 19, headingHeight: 25,
      bodySize: 14, bodyHeight: 23,
      diameter: 104, gap: 18,
      stepGap: 0, headingGap: 8, bodyGap: 7,
    };
  }
  return {
    stepSize: 13, stepHeight: 22,
    headingSize: 22, headingHeight: 28,
    bodySize: 15, bodyHeight: 25,
    diameter: 132, gap: 22,
    stepGap: 0, headingGap: 10, bodyGap: 8,
  };
}

const measureCtx =
  typeof document !== "undefined"
    ? document.createElement("canvas").getContext("2d")
    : null;

function wrapText(text: string, font: string, maxWidth: number): string[] {
  const clean = text.trim();
  if (!measureCtx || maxWidth <= 0) return [clean];
  measureCtx.font = font;
  const words = clean.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (measureCtx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) {
      out.push(line);
      line = "";
    }
    if (measureCtx.measureText(word).width <= maxWidth) {
      line = word;
      continue;
    }
    let chunk = "";
    for (const char of word) {
      if (chunk && measureCtx.measureText(chunk + char).width > maxWidth) {
        out.push(chunk);
        chunk = "";
      }
      chunk += char;
    }
    line = chunk;
  }
  if (line) out.push(line);
  return out.length ? out : [clean];
}
// Curved text hugging the step icon: each line's x offset follows
// x = cx + sqrt(r^2 - dy^2) so copy wraps around the circle.
const curveIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Compass, PenTool, Database, Code2, ClipboardCheck, Rocket,
};

export function ProcessStepCurve({
  stepLabel,
  title,
  description,
  icon,
  mirror = false,
}: ProcessStepCurveProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<CurvedLine[]>([]);
  const [height, setHeight] = useState<number | null>(null);
  const [m, setM] = useState<Metrics>(() => metricsFor("desktop"));
  const [mirrored, setMirrored] = useState(false);
  const [tier, setTier] = useState<Tier>("desktop");
  const [penPlay, setPenPlay] = useState(0);

  // Track the viewport tier (md / lg) so icon size, anchors and text side
  // stay in sync with the CSS spine even when no resize event fires.
  useEffect(() => {
    const sync = () => setTier(tierFor(window.innerWidth));
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const render = () => {
      const width = scene.clientWidth;
      if (!width) return;
      // Tier follows the *viewport* (Tailwind md/lg), not the container
      // width: at a 768px viewport the container is ~704px, and reading
      // that as "mobile" used to combine a centred CSS spine with rail
      // metrics — text then started at 50% with a full-width wrap and clipped.
      const t = tierFor(window.innerWidth);
      const mm = metricsFor(t);
      const centered = t !== "mobile";
      const effMirror = mirror && centered;
      const radius = mm.diameter / 2 + mm.gap;
      // Text anchor: the CSS spine (md:left-1/2) or the mobile rail (left-[38px]).
      const anchor = centered ? width / 2 : 38;
      const sans = "Inter, system-ui, sans-serif";
      const avail = Math.max(40, width - anchor - radius - (centered ? 24 : 12));
      const rows: { text: string; kind: CurvedLine["kind"]; h: number; g: number }[] = [
        { text: stepLabel.trim(), kind: "step", h: mm.stepHeight, g: mm.stepGap },
      ];
      wrapText(title, `800 ${mm.headingSize}px ${sans}`, avail).forEach((t) =>
        rows.push({ text: t, kind: "heading", h: mm.headingHeight, g: mm.headingGap }),
      );
      wrapText(description, `400 ${mm.bodySize}px ${sans}`, avail).forEach((t, idx) =>
        rows.push({ text: t, kind: "body", h: mm.bodyHeight, g: idx === 0 ? mm.bodyGap : 0 }),
      );
      const textH = rows.reduce((s, r) => s + r.h + r.g, 0);
      const h = Math.max(radius * 2, textH) + 24;
      const cy = h / 2;
      let top = cy - textH / 2;
      const next: CurvedLine[] = rows.map((r) => {
        top += r.g;
        const dy = top + r.h / 2 - cy;
        const curve = Math.sqrt(Math.max(0, radius * radius - dy * dy));
        const line: CurvedLine = { text: r.text, kind: r.kind, top, curve, height: r.h };
        top += r.h;
        return line;
      });
      setM(mm);
      setMirrored(effMirror);
      setTier(t);
      setHeight(h);
      setLines(next);
    };
    render();
    const ro = new ResizeObserver(render);
    ro.observe(scene);
    document.fonts?.ready.then(render).catch(() => undefined);
    return () => ro.disconnect();
  }, [stepLabel, title, description, mirror, tier]);

  // Icon + spine + text all anchor to the same CSS center, so the
  // circle can never drift off the line. No pixel left/right from JS.
  const small = tier === "mobile";
  const centered = tier !== "mobile";
  const stepRuleGap = small ? 8 : tier === "tablet" ? 10 : 12;
  const stepRuleWidth = small ? 20 : tier === "tablet" ? 32 : 48;
  const glyphSize = small ? 20 : tier === "tablet" ? 24 : 28;
  const penGlyphSize = small ? 18 : tier === "tablet" ? 22 : 24;
  const Icon = curveIcons[icon] ?? Code2;
  const showMirror = mirrored && centered;

  return (
    <div
      ref={sceneRef}
      data-icon={icon}
      className="group relative w-full overflow-x-clip"
      style={height ? { height } : undefined}
      onPointerEnter={icon === "PenTool" ? () => setPenPlay((v) => v + 1) : undefined}
    >
      {/* Icon — pure CSS centering on every breakpoint */}
      <div
        aria-hidden
        className="absolute left-[38px] top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface transition-colors duration-300 group-hover:border-accent/40 md:left-1/2"
        style={{ width: m.diameter, height: m.diameter }}
      >
        {/* warm accent halo — subtle at rest, blooms + beats on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-4 rounded-full bg-accent/10 opacity-60 blur-xl group-hover:animate-halo"
        />
        {/* concentric ring for depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-border/70 transition-transform duration-300 group-hover:scale-105"
          style={{ width: m.diameter * 0.72, height: m.diameter * 0.72 }}
        />
        <span
          className="relative grid place-items-center rounded-full bg-accent-soft text-accent shadow-sm transition-transform duration-300 group-hover:scale-105"
          style={{ width: m.diameter * 0.47, height: m.diameter * 0.47 }}
        >
          {icon === "PenTool" ? (
            <PenWritingIcon
              size={Math.round(m.diameter * 0.47)}
              iconSize={penGlyphSize}
              strokeWidth={2}
              playKey={penPlay}
              restartOnHover={false}
            />
          ) : (
            <Icon size={glyphSize} />
          )}
        </span>
      </div>
      <div className="sr-only">
        <p>Step {stepLabel}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div aria-hidden className="absolute inset-0">
        {lines.map((line, i) => {
          const isMirror = showMirror;
          // Anchor text edges to the spine via calc(50% + curve) so they
          // stay glued to the CSS-centered circle at any container width.
          // Mobile rail uses the same 38px anchor as the icon + spine.
          const pos = centered
            ? isMirror
              ? { right: `calc(50% + ${line.curve.toFixed(1)}px)` }
              : { left: `calc(50% + ${line.curve.toFixed(1)}px)` }
            : { left: `calc(38px + ${line.curve.toFixed(1)}px)` };
          if (line.kind === "step") {
            return (
              <div
                key={i}
                className="absolute flex items-center font-mono font-medium italic text-faint"
                style={{
                  top: line.top, height: line.height, fontSize: m.stepSize,
                  lineHeight: `${line.height}px`, gap: stepRuleGap,
                  ...pos,
                  ...(isMirror && centered
                    ? { flexDirection: "row-reverse" as const, textAlign: "right" as const }
                    : undefined),
                }}
              >
                <span aria-hidden className="shrink-0 rounded-full bg-[#EAB308] shadow-[0_0_0_3px] shadow-[#EAB308]/15 group-hover:animate-heartbeat dark:bg-[#FACC15] dark:shadow-[#FACC15]/15" style={{ width: 7, height: 7 }} />
                <span aria-hidden className="h-px shrink-0 bg-border" style={{ width: stepRuleWidth }} />
                <span className="whitespace-pre">Step {line.text}</span>
              </div>
            );
          }
          if (line.kind === "heading") {
            return (
              <div
                key={i}
                className="absolute whitespace-pre font-extrabold tracking-[-0.02em] text-text"
                style={{ top: line.top, height: line.height, fontSize: m.headingSize, lineHeight: `${line.height}px`, ...pos }}
              >
                {line.text}
              </div>
            );
          }
          return (
            <div
              key={i}
              className="absolute whitespace-pre text-muted"
              style={{ top: line.top, height: line.height, fontSize: m.bodySize, lineHeight: `${line.height}px`, ...pos }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

