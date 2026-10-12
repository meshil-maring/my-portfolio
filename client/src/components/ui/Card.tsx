import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// design-system §05: 12px radius, 1px border, subtle shadow
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 md:p-[18px] lg:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
