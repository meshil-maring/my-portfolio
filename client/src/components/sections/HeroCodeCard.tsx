"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion, useSpring } from "motion/react";
import { heroContact } from "@/data/site";
import { brandMeta, type BrandKey } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { eyebrowClass } from "@/lib/typography";

// Hero "const meshil = { … }" code card — a 3D flip card.
// Click the code face to flip and reveal a contact panel (GitHub / LinkedIn /
// Instagram / WhatsApp). Motion (design-system §08): transform-only, GPU-friendly,
// subtle hero accents may loop gently, and everything respects prefers-reduced-motion.
//   • idle float  — slow, low-amplitude up/down drift (matches FeaturedService tile float)
//   • pointer tilt — 3D rotateX/rotateY that tracks the cursor and springs back on leave
//   • flip        — rotateY 0 → 180 on click; back face pre-rotated 180° (backface hidden)
//   • dashed ring — very slow spin behind the card for depth
const TILT_SPRING = { stiffness: 140, damping: 16, mass: 0.6 };
const BASE_ROTATE_Y = 6; // resting tilt, matches the card's original rotate-[6deg]
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroCodeCard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  // Idle float + ring spin are infinite loops — only run them while the card
  // is actually on screen (it's hidden below lg, so mobile never animates).
  const inView = useInView(cardRef, { margin: "80px" });

  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(BASE_ROTATE_Y, TILT_SPRING);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width; // 0 → 1
    const py = (event.clientY - rect.top) / rect.height; // 0 → 1
    rotateY.set(BASE_ROTATE_Y + (px - 0.5) * 16);
    rotateX.set(-(py - 0.5) * 16);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(BASE_ROTATE_Y);
  };

  return (
    <div className="relative flex justify-center py-8 [perspective:1200px]">
      {/* Dashed orbit ring — very slow spin behind the card */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/30"
        animate={reduce || !inView ? undefined : { rotate: 360 }}
        transition={reduce || !inView ? undefined : { duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Idle float — pointer-events:none on all 3D wrappers: in a
          preserve-3d context Chrome depth-sorts quads for hit-testing, and
          with the pointer tilt applied these coplanar wrapper divs sit in
          FRONT of the back face away from center, stealing clicks from the
          arrow/links. The faces re-enable pointer-events, and events still
          bubble up to the tilt handlers below. */}
      <motion.div
        className="pointer-events-none [transform-style:preserve-3d]"
        animate={reduce || !inView ? undefined : { y: [0, -12, 0] }}
        transition={reduce || !inView ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pointer tilt */}
        <motion.div
          ref={cardRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          className="pointer-events-none [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          {/* Flip rotation */}
          <motion.div
            className="pointer-events-none relative [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE }}
          >
            {/* ── FRONT: the code card (click to flip) ── */}
            <button
              type="button"
              onClick={() => setFlipped(true)}
              aria-hidden={flipped}
              aria-label="Flip card to reveal contact links"
              className={cn(
                "group block w-[300px] rounded-card border border-border bg-surface p-5 text-left shadow-[var(--shadow-card)] transition-colors duration-200 outline-none [backface-visibility:hidden] focus-visible:ring-2 focus-visible:ring-accent",
                flipped ? "pointer-events-none" : "pointer-events-auto",
              )}
            >
              <div aria-hidden className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="mt-4 font-mono text-[13px] leading-[1.9] text-muted">
                <p>
                  <span className="text-faint">const</span>{" "}
                  <span className="text-text">meshil</span> = {"{"}
                </p>
                <p className="pl-4">
                  role: <span className="text-accent">&quot;Engineer&quot;</span>,
                </p>
                <p className="pl-4">
                  skills: <span className="text-accent">[&quot;Web&quot;, &quot;AI&quot;]</span>,
                </p>
                <p className="pl-4">
                  focus: <span className="text-accent">&quot;Build&quot;</span>
                </p>
                <p>{"};"}</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-[12px] text-muted">
                <span className="flex items-center gap-1.5">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-muted" />
                  {heroContact.hint}
                </span>
                <span className="flex items-center gap-1 font-semibold text-accent transition-all duration-200 group-hover:gap-1.5">
                  Connect <ArrowUpRight size={13} strokeWidth={2.5} />
                </span>
              </div>
            </button>

            {/* ── BACK: contact links ── */}
            <div
              aria-hidden={!flipped}
              style={{ transform: "rotateY(180deg)" }}
              className={cn(
                "absolute inset-0 flex w-[300px] flex-col rounded-card border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-colors duration-200 [backface-visibility:hidden]",
                flipped ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              <div className="flex items-center justify-between">
                <p className={cn(eyebrowClass, "text-accent")}>
                  {heroContact.title}
                </p>
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  aria-label="Flip back to code card"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-soft text-accent outline-none transition-colors hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ArrowLeft size={14} strokeWidth={2.5} />
                </button>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {heroContact.links.map((link) => {
                  const { Logo, color } = brandMeta[link.brand as BrandKey];
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ["--brand" as string]: color }}
                        className="group/tile flex items-center gap-2.5 rounded-btn border border-border bg-soft px-3 py-2.5 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft/60 focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-btn border border-border bg-surface text-[var(--brand)]">
                          <Logo style={{ width: 17, height: 17 }} aria-hidden />
                        </span>
                        <span className="truncate text-[13px] font-semibold text-text">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 text-[12px] text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-muted" />
                {heroContact.hint}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
