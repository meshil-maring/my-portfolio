import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// design-system §05: 44px min, 8px radius, 700 weight
export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-[44px] items-center justify-center rounded-btn px-5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variant === "primary" && "bg-accent text-accent-text hover:-translate-y-0.5 hover:opacity-90",
        variant === "secondary" &&
          "border border-border bg-surface text-text hover:-translate-y-0.5 hover:border-accent",
        className,
      )}
      {...rest}
    />
  );
}
