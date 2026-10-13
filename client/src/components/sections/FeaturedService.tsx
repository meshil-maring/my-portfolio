"use client";

import { Code2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { brandMeta, type BrandKey } from "@/components/ui/BrandIcons";
import type { Service } from "@/types/portfolio";

// Desktop scattered cluster — positions tuned to the reference mockup.
const cluster: { key: BrandKey; size: number; className: string }[] = [
  { key: "react", size: 74, className: "left-[36%] top-[6%]" },
  { key: "nodedotjs", size: 46, className: "left-[12%] top-[18%]" },
  { key: "tailwindcss", size: 54, className: "left-[72%] top-[44%]" },
  { key: "postgresql", size: 56, className: "left-[4%] top-[52%]" },
  { key: "firebase", size: 48, className: "left-[40%] top-[66%]" },
  { key: "mongodb", size: 56, className: "left-[60%] top-[62%]" },
];

// One frosted brand-logo tile with a brand-colored glow; gentle float on desktop.
function FloatingTile({
  brandKey,
  size,
  delay,
  reduce,
}: {
  brandKey: BrandKey;
  size: number;
  delay: number;
  reduce: boolean;
}) {
  const { Logo, color, label } = brandMeta[brandKey];
  const tile = (
    <div className="group relative transition-transform duration-200 group-hover:-translate-y-1">
      {/* Visible name label on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[#0C1A12]/95 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
      >
        {label}
      </span>
      <div
        role="img"
        aria-label={label}
        style={{ width: size, height: size, ["--brand" as string]: color }}
        className={cn(
          "grid place-items-center rounded-[18px] border border-white/15 bg-white/[0.06] backdrop-blur-md",
        )}
      >
        <Logo
          className="text-[var(--brand)]"
          style={{ width: Math.round(size * 0.5), height: Math.round(size * 0.5) }}
        />
      </div>
    </div>
  );
  if (reduce) return tile;
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {tile}
    </motion.div>
  );
}

// Featured dark panel for the primary service (design mirrors the mockup:
// number + code icon, accent-highlighted title, and a floating brand stack).
export function FeaturedService({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  const accent = service.accentWord ?? "";
  const idx = accent ? service.title.lastIndexOf(accent) : -1;
  const before = idx > 0 ? service.title.slice(0, idx) : service.title;
  const highlight = idx > 0 ? service.title.slice(idx) : "";

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-card border border-white/10 bg-[#07110D] p-6 md:p-8 lg:p-9">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-24 h-56 w-56 rounded-full bg-[#1B4D33]/40 blur-[90px]" />
          <div className="absolute -bottom-24 right-8 h-64 w-64 rounded-full bg-[#123B26]/50 blur-[100px]" />
        </div>

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#B9F4CA]/25 bg-[#B9F4CA]/12 text-[#B9F4CA]">
                <Code2 size={20} />
              </span>
              <span className="font-mono text-sm font-bold tracking-[0.02em] text-[#B9F4CA]">
                {service.n}
              </span>
            </div>

            <h3 className="mt-5 text-[26px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white lg:text-[34px]">
              {before}
              {highlight && <span className="text-[#B9F4CA]">{highlight}</span>}
            </h3>

            <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.75] text-[#9DB3A6] lg:text-[15px]">
              {service.description}
            </p>
          </div>

          <div className="relative">
            {/* Mobile / tablet: simple wrapping row of tiles */}
            <div className="flex flex-wrap gap-3 lg:hidden">
              {service.stack?.map((key, i) => (
                <FloatingTile
                  key={`${key}-${i}`}
                  brandKey={key as BrandKey}
                  size={52}
                  delay={i * 0.15}
                  reduce={!!reduce}
                />
              ))}
            </div>

            {/* Desktop: scattered floating cluster */}
            {/* Inset positioning box keeps every logo a safe distance from the panel edge */}
            <div className="relative hidden h-[240px] lg:block">
              <div className="absolute inset-x-5 inset-y-3">
                {cluster.map((t, i) => (
                  <div key={i} className={cn("absolute", t.className)}>
                    <FloatingTile brandKey={t.key} size={t.size} delay={i * 0.18} reduce={!!reduce} />
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
