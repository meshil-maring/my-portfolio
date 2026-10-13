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

function metricsFor(desktop: boolean): Metrics {
  if (!desktop) {
    return {
      stepSize: 12, stepHeight: 18,
      headingSize: 17, headingHeight: 21,
      bodySize: 13, bodyHeight: 19,
      diameter: 62, gap: 12,
      stepGap: 0, headingGap: 8, bodyGap: 6,
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
  const [m, setM] = useState<Metrics>(() => metricsFor(true));
  const [mirrored, setMirrored] = useState(false);
  const [desktop, setDesktop] = useState(true);
  const [penPlay, setPenPlay] = useState(0);

  // Track the md breakpoint in JS so icon size / text side matches CSS.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const render = () => {
      const width = scene.clientWidth;
      if (!width) return;
      const isDesktop = width >= 768;
      const mm = metricsFor(isDesktop);
      const effMirror = mirror && isDesktop;
      const radius = mm.diameter / 2 + mm.gap;
      const cx = isDesktop ? width / 2 : mm.diameter / 2 + 2;
      const sans = "Inter, system-ui, sans-serif";
      const avail = isDesktop
        ? Math.max(40, width / 2 - radius - 24)
        : Math.max(40, width - cx - radius - 8);
      const rows: { text: string; kind: CurvedLine["kind"]; h: number; g: number }[] = [
        { text: stepLabel.trim(), kind: "step", h: mm.stepHeight, g: mm.stepGap },
      ];
      wrapText(title, `700 ${mm.headingSize}px ${sans}`, avail).forEach((t) =>
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
      setHeight(h);
      setLines(next);
    };
    render();
    const ro = new ResizeObserver(render);
    ro.observe(scene);
    document.fonts?.ready.then(render).catch(() => undefined);
    return () => ro.disconnect();
  }, [stepLabel, title, description, mirror]);

  // Icon + spine + text all anchor to the same CSS center, so the
  // circle can never drift off the line. No pixel left/right from JS.
  const small = !desktop;
  const Icon = curveIcons[icon] ?? Code2;
  const showMirror = mirrored && desktop;

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
              iconSize={small ? 18 : 24}
              strokeWidth={2}
              playKey={penPlay}
              restartOnHover={false}
            />
          ) : (
            <Icon size={small ? 20 : 28} />
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
          const pos = desktop
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
                  lineHeight: `${line.height}px`, gap: small ? 8 : 12,
                  ...pos,
                  ...(isMirror && desktop
                    ? { flexDirection: "row-reverse" as const, textAlign: "right" as const }
                    : undefined),
                }}
              >
                <span aria-hidden className="shrink-0 rounded-full bg-[#EFC65C] shadow-[0_0_0_3px] shadow-[#EFC65C]/15 group-hover:animate-heartbeat" style={{ width: 7, height: 7 }} />
                <span aria-hidden className="h-px shrink-0 bg-border" style={{ width: small ? 20 : 48 }} />
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

