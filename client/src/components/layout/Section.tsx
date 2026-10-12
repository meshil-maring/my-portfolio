import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  number: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// Simple header: "01 · Label" eyebrow + H2
export function Section({ id, number, label, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-7 md:py-[34px] lg:py-10", className)}>
      <Container>
        <div className="mb-4 md:mb-[18px] lg:mb-5">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
            {number} · {label}
          </p>
          <h2 className="mt-2 text-[28px] font-extrabold leading-[1.2] tracking-[-0.03em] lg:text-4xl">
            {title}
          </h2>
        </div>
        {children}
      </Container>
    </section>
  );
}
