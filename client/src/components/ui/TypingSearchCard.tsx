"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Code2, CornerDownLeft } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

interface TypingSearchCardProps {
  /** Small caption rendered above the animated line (e.g. "I know how to"). */
  label: string;
  /** Capability messages typed one after another. */
  messages: readonly string[];
  /** Upcoming lines — join the typing rotation and preview under the card. */
  suggestions?: readonly string[];
  /** Decorative "live" caption under the suggestion list (status dot + text). */
  status?: string;
  /** Extra classes merged onto the wrapper (layout/spacing only). */
  className?: string;
}

// Typing cadence (ms). Deliberately gentle so the loop reads as calm
// "thinking", not a scrolling marquee (design-system §08 — no distraction).
const TYPE_MS = 55; // delay per typed character
const HOLD_MS = 1600; // pause once a message is fully typed
const START_MS = 300; // delay before the first character — lets the card's
// enter transition (EXIT_MS) settle so the line types into a solid card
const EXIT_MS = 260; // card fade-out/slide-up before the next message

// Reference style: suggestion rows fade and blur out the further down they
// sit (opacity tiers + static per-position blur). Opacity is animated by
// motion to these exact values, so it must NOT also be set via Tailwind.
const ROW_OPACITY = [0.7, 0.45, 0.25, 0.1] as const;
const ROW_BLUR = ["blur-[0.4px]", "blur-[1px]", "blur-[2px]", "blur-[3px]"] as const;
const ROWS = ROW_OPACITY.length;

// Suggestion list entrance — the whole list remounts per message index, so
// staggered fade-ups read as the rows shifting to the next command.
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (opacity: number) => ({
    opacity,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  }),
};

// Floating command/search card (design-system §05 card tokens) with a
// typing-effect capability line — reusable anywhere a "what I can do"
// prompt box fits (About section right column today).
//
// Motion (§08): type → hold → the card fades/slides/scales out (motion
// `animate`), the index advances while it's invisible, then it fades back
// in as the next message types; one pending timer per effect run, always
// cleared on re-run or unmount; crisp accent caret blink via the
// `caret-blink` keyframe; static first message and zero timers when the
// visitor prefers reduced motion.
export function TypingSearchCard({ label, messages, suggestions, status, className }: TypingSearchCardProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  // The typing loop re-renders every ~55ms — only run it while the card is
  // on screen (grace period covers fast scrolls past the About section).
  const inView = useInView(rootRef, { margin: "120px" });
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  // Index the `typed` text belongs to — lets the display reset implicitly
  // when `index` advances (no synchronous setState inside the effect).
  const [typedFor, setTypedFor] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // Full rotation: the capability messages first, then each suggestion is
  // brought up into the label line one by one.
  const rotation = useMemo(() => [...messages, ...(suggestions ?? [])], [messages, suggestions]);

  // Type → hold → trigger the card exit. The timer handle lives in a local
  // so every chained step is cancellable; no callback fires after unmount.
  // Skipped entirely while off screen — the loop is pure CPU otherwise.
  useEffect(() => {
    if (reduce || !inView || rotation.length === 0) return;

    const message = rotation[index % rotation.length];
    let timer = 0;
    let cancelled = false;

    const type = (char: number) => {
      if (cancelled) return;
      if (char <= message.length) {
        setTypedFor(index);
        setTyped(message.slice(0, char));
        timer = window.setTimeout(() => type(char + 1), char === 0 ? START_MS : TYPE_MS);
      } else {
        timer = window.setTimeout(() => {
          if (!cancelled) setLeaving(true);
        }, HOLD_MS);
      }
    };

    timer = window.setTimeout(() => type(0), 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [index, inView, reduce, rotation]);

  // Exit finished → swap the message while the card is fully faded, then
  // bring it back (the `leaving` animate state returns to visible).
  useEffect(() => {
    if (reduce || !leaving) return;
    const timer = window.setTimeout(() => {
      setLeaving(false);
      setIndex((i) => (i + 1) % rotation.length);
    }, EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, reduce, rotation]);

  const firstMessage = rotation[0] ?? "";
  // Text shown in the card: the typed run only while it belongs to the
  // current index (implicitly blank while the card is swapped out).
  // Reduced motion: no loop — show one capability whole, caret unanimated
  // (the global reduced-motion rule also flattens the blink keyframe).
  const currentText = typedFor === index ? typed : "";
  const visibleText = reduce ? firstMessage : currentText;

  // Next commands previewed under the card (reference: four fading rows).
  const upcoming = Array.from(
    { length: Math.min(ROWS, Math.max(rotation.length - 1, 0)) },
    (_, i) => rotation[(index + i + 1) % rotation.length],
  );

  return (
    <div ref={rootRef} className={cn("w-full", className)}>
      {/* Command card — border-defined structure + soft floating shadow
          (§05 card tokens: rounded-card 12px, --shadow-card — light only,
          `none` in dark). Between messages it fades out, slides
          up a touch and scales down (0.26s), swaps text while invisible,
          then eases back in as the next line types. */}
      <motion.div
        initial={false}
        animate={leaving ? { opacity: 0, y: -9, scale: 0.985 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: EXIT_MS / 1000, ease: "easeOut" }}
        className="flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-[var(--shadow-card)] md:p-5"
      >
        {/* Dark icon container — stays dark in both themes, like an app glyph */}
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-card bg-[#12211B] text-[#E8F7EE]">
          <Code2 size={18} strokeWidth={2.25} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            {label}
          </p>
          {/* min-h reserves two lines on small screens (messages may wrap)
              and one line from sm up, so typing never shifts the layout. */}
          <p className="mt-1.5 min-h-[3em] text-[15px] font-bold leading-[1.5] tracking-[-0.3px] text-text sm:min-h-[1.5em] lg:text-base">
            {visibleText}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] rounded-full bg-accent animate-caret-blink"
            />
          </p>
        </div>
        {/* Enter hint (reference style) — decorative, hidden on small screens
            where the row is tight */}
        <CornerDownLeft size={17} aria-hidden className="hidden shrink-0 text-faint sm:block" />
      </motion.div>

      {/* Upcoming commands — the next lines of the rotation, progressively
          softer with distance (opacity tiers + static blur, reference style).
          The list remounts per index so rows fade up into the next set;
          aria-hidden avoids double announcements (the whole rotation is
          announced once via the sr-only line below, not per keystroke). */}
      {upcoming.length > 0 && (
        <motion.ul
          key={index}
          aria-hidden
          variants={listVariants}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="mt-3 select-none space-y-1.5 pl-[60px] md:pl-[68px]"
        >
          {upcoming.map((text, i) => (
            <motion.li
              key={text}
              custom={ROW_OPACITY[i]}
              variants={rowVariants}
              className={cn("truncate text-sm font-medium text-muted", ROW_BLUR[i])}
            >
              {text}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Status line — decorative "live" caption (reference: dot + caps) */}
      {status && (
        <p className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-faint select-none">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {status}
        </p>
      )}

      <p className="sr-only">
        {label}: {rotation.join("; ")}
      </p>
    </div>
  );
}