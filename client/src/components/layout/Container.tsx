import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// design-system §04: max 1160px + responsive gutters
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1160px] px-5 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
