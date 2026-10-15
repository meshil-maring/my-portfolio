"use client";

import { useRef } from "react";
import { Code2 } from "lucide-react";
import { serviceIcons } from "@/components/ui/serviceIcons";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { brandMeta, type BrandKey } from "@/components/ui/BrandIcons";
import type { Service } from "@/types/portfolio";

// Desktop scattered cluster — fixed-pixel slots inside a centered fixed-width
// box, so the logos can never touch each other: every pair below is separated
// by ≥16px on at least one axis, while the most tile motion is 11px (7px float
// + 4px hover lift). Percentage slots (old mockup) overlapped once the panel
// narrowed to 74% in the zigzag flow. Sizes/positions tuned so the scatter
// fits the compact panel; logos still come from `service.stack`.
const clusterSlots: { size: number; className: string }[] = [
  { size: 60, className: "left-[96px] top-[12px]" }, // x 96-156, y 12-72
  { size: 42, className: "left-[16px] top-[34px]" }, // x 16-58,  y 34-76 (≥38px from slot 0)
  { size: 48, className: "left-[172px] top-[50px]" }, // x 172-220, y 50-98 (≥16px from slot 0)
  { size: 50, className: "left-[8px] top-[98px]" }, // x 8-58,   y 98-148 (≥22px from slot 1)
  { size: 44, className: "left-[76px] top-[108px]" }, // x 76-120, y 108-152 (≥18px from slot 3)
  { size: 48, className: "left-[144px] top-[122px]" }, // x 144-192, y 122-170 (≥24px from slots 2/4)
];

// One frosted brand-logo tile with a brand-colored glow; gentle float on desktop.
// `active` = panel is on screen — floating is an infinite loop, so off-screen
// panels (and the hidden mobile/desktop duplicate row) stay perfectly still.
function FloatingTile({
  brandKey,
  size,
  delay,
  reduce,
  active,
}: {
  brandKey: BrandKey;
  size: number;
  delay: number;
  reduce: boolean;
  active: boolean;
}) {
  const { Logo, color, label } = brandMeta[brandKey];
  const tile = (
    <div className="group relative transition-transform duration-200 group-hover:-translate-y-1">
      {/* Visible name label on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-semibold text-text opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 dark:border-white/15 dark:bg-[#0C1A12]/95 dark:text-white"
      >
        {label}
      </span>
      <div
        role="img"
        aria-label={label}
        style={{ width: size, height: size, ["--brand" as string]: color }}
        className={cn(
          "grid place-items-center rounded-[18px] border border-border bg-surface shadow-[var(--shadow-card)] backdrop-blur-md dark:border-white/15 dark:bg-white/[0.06] dark:shadow-none",
        )}
      >
        <Logo
          className="text-[var(--brand)]"
          style={{ width: Math.round(size * 0.5), height: Math.round(size * 0.5) }}
        />
      </div>
    </div>
  );
  if (reduce || !active) return tile;
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {tile}
    </motion.div>
  );
}

// Featured panel for a headline service (01 Full-Stack, 02 AI & RAG) — design
// mirrors the mockup: number + service icon, accent-highlighted title, and a
// floating brand stack from `service.stack`.
// Light-mode first via design tokens; dark: variants keep the dark-panel look.
// `mirror` (zigzag flow, §07 proposal 2026-10-14-services-zigzag-flow): right-
// aligned rows swap internals at lg — cluster left, text right — so the dashed
// connector links tile-cluster to tile-cluster. Below lg both stay stacked
// text-first, so the prop only takes effect at lg.
export function FeaturedService({
  service,
  className,
  mirror = false,
}: {
  service: Service;
  className?: string;
  mirror?: boolean;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  // Floating tiles loop forever — only animate while the panel is visible.
  const panelInView = useInView(panelRef, { margin: "100px" });
  const Icon = serviceIcons[service.icon] ?? Code2;
  // Only keys known to BrandIcons reach FloatingTile — bad data can't crash it.
  const stackKeys = (service.stack ?? []).filter((key): key is BrandKey => key in brandMeta);
  const accent = service.accentWord ?? "";
  const idx = accent ? service.title.lastIndexOf(accent) : -1;
  const before = idx > 0 ? service.title.slice(0, idx) : service.title;
  const highlight = idx > 0 ? service.title.slice(idx) : "";

  return (
    <Reveal className={className}>
      <div ref={panelRef} className="relative overflow-hidden rounded-card border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-colors duration-200 dark:border-white/10 dark:bg-[#07110D] dark:shadow-none md:p-6 lg:p-7">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-accent-soft blur-[90px] dark:bg-[#1B4D33]/40" />
          <div className="absolute -bottom-24 right-8 h-64 w-64 rounded-full bg-accent/10 blur-[100px] dark:bg-[#123B26]/50" />
        </div>

        <div
          className={cn(
            "relative grid items-center gap-6",
            mirror ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]",
          )}
        >
          <div className={cn(mirror && "lg:order-2")}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-accent/25 bg-accent-soft text-accent dark:border-[#B9F4CA]/25 dark:bg-[#B9F4CA]/12 dark:text-[#B9F4CA]">
                <Icon size={18} />
              </span>
              <span className="font-mono text-sm font-bold tracking-[0.02em] text-accent dark:text-[#B9F4CA]">
                {service.n}
              </span>
            </div>

            <h3 className="mt-4 text-[22px] font-extrabold leading-[1.15] tracking-[-0.03em] text-text lg:text-[26px] dark:text-white">
              {before}
              {highlight && <span className="text-accent dark:text-[#B9F4CA]">{highlight}</span>}
            </h3>

            <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.75] text-muted lg:text-[15px] dark:text-[#9DB3A6]">
              {service.description}
            </p>
          </div>

          <div className={cn("relative", mirror && "lg:order-1")}>
            {/* Mobile / tablet: simple wrapping row of tiles */}
            <div className="flex flex-wrap gap-3 lg:hidden">
              {stackKeys.map((key, i) => (
                <FloatingTile
                  key={`${key}-${i}`}
                  brandKey={key}
                  size={52}
                  delay={i * 0.15}
                  reduce={!!reduce}
                  active={panelInView}
                />
              ))}
            </div>

            {/* Desktop: scattered floating cluster */}
            {/* Fixed 240×176 positioning box, centered in the column — the
                px slot coordinates below are valid at every lg+ width */}
            <div className="relative hidden h-[200px] lg:block">
              <div className="absolute inset-y-3 left-1/2 w-[240px] -translate-x-1/2">
                {stackKeys.slice(0, clusterSlots.length).map((key, i) => (
                  <div key={`${key}-${i}`} className={cn("absolute", clusterSlots[i].className)}>
                    <FloatingTile brandKey={key} size={clusterSlots[i].size} delay={i * 0.18} reduce={!!reduce} active={panelInView} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
