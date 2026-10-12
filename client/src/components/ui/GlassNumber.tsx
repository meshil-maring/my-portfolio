import { cn } from "@/lib/cn";

interface GlassNumberProps {
  number: string;
  icon?: React.ReactNode;
  className?: string;
  // "on-dark" is for always-dark panels (hero-green #07110D): light mint
  // number tile + brighter glass so it stays legible in both themes.
  tone?: "default" | "on-dark";
}

// Demo adaptation: your 140px overlapping tiles (20px overlap, 9px blur,
// 48px radius, 56px number, 58px icon) scaled to a compact 44px section
// eyebrow. Keeps the green number tile + frosted glass icon tile motif,
// wired to design-system tokens (bg-accent, rounded, mono) + dark mode.
export function GlassNumber({ number, icon, className, tone = "default" }: GlassNumberProps) {
  const onDark = tone === "on-dark";
  return (
    <span
      role="img"
      aria-label={`Section ${number}`}
      className={cn(
        "relative inline-flex h-11 w-[78px] shrink-0 select-none",
        className,
      )}
      // Mirror demo vars: --overlap / --blur
      style={{ ["--overlap" as string]: "10px", ["--blur" as string]: "9px" } as React.CSSProperties}
    >
      {/* Number tile — demo .number-tile: solid green, light text */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-[15px] font-mono text-[15px] font-bold tracking-[-0.02em] shadow-[var(--shadow-card)]",
          onDark ? "bg-[#B9F4CA] text-[#0A1A10]" : "bg-accent text-accent-text",
        )}
      >
        {number}
      </span>

      {/* Glass tile — demo .glass-tile: translucent + backdrop blur, overlaps number */}
      <span
        aria-hidden
        className={cn(
          "absolute top-0 z-[1] grid h-11 w-11 place-items-center rounded-[15px] border backdrop-blur-[9px]",
          onDark
            ? "border-white/15 bg-white/10 shadow-none"
            : "border-white/40 bg-white/25 shadow-[0_6px_24px_rgba(20,50,32,0.12)] dark:border-white/15 dark:bg-white/10 dark:shadow-none",
        )}
        style={{
          left: "calc(2.75rem - var(--overlap))",
          WebkitBackdropFilter: "blur(var(--blur))",
        }}
      >
        <span
          className={cn(
            "grid place-items-center [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:stroke-[2.2] [&_svg]:stroke-linecap-round [&_svg]:stroke-linejoin-round",
            onDark ? "text-white" : "text-text dark:text-white",
          )}
        >
          {icon}
        </span>
      </span>
    </span>
  );
}
