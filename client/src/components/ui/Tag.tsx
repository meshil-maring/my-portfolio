import { cn } from "@/lib/cn";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

// design-system §05: 6px radius, 10-12px, soft bg
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip border border-border bg-soft px-2 py-[5px] text-[11px] font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
