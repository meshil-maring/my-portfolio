import { Code2, BrainCircuit, LayoutGrid, GraduationCap, Mail, Workflow, MessagesSquare, Briefcase } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { GlassNumber } from "@/components/ui/GlassNumber";
import { eyebrowClass, sectionTitleClass } from "@/lib/typography";

interface SectionProps {
  id: string;
  number: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  // Lets a section override the frosted-glass glyph (defaults per section number below)
  icon?: React.ReactNode;
  // Lets a section override the H2 size (merged via twMerge)
  titleClassName?: string;
}

// Per-section glyphs: keeps your demo's "connected blocks" idea but uses
// Lucide icons already in the project — no new deps, consistent 18px stroke icons.
const iconsByNumber: Record<string, React.ReactNode> = {
  "01": <LayoutGrid size={18} />,
  "02": <Code2 size={18} />,
  "03": <BrainCircuit size={18} />,
  "04": <GraduationCap size={18} />,
  "05": <Workflow size={18} />,
  "06": <MessagesSquare size={18} />,
  "07": <Briefcase size={18} />,
  "08": <Mail size={18} />,
};

const fallbackIcon = <LayoutGrid size={18} />;

// Shared header: glass-tile number badge + mono label + H2.
// Replaces the old "02 · Label" eyebrow so 02/03/04/05 all share the motif.
export function Section({ id, number, label, title, children, className, icon, titleClassName }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-7 md:py-[34px] lg:py-10", className)}>
      <Container>
        <div className="mb-4 md:mb-[18px] lg:mb-5">
          <div className="flex items-center gap-3">
            <GlassNumber number={number} icon={icon ?? iconsByNumber[number] ?? fallbackIcon} />
            <p className={cn(eyebrowClass, "text-accent")}>
              {label}
            </p>
          </div>
          <h2 className={cn(sectionTitleClass, titleClassName)}>
            {title}
          </h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

