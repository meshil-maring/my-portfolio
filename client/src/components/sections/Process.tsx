import { Workflow } from "lucide-react";
import { processSteps } from "@/data/process";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessStepCurve } from "./ProcessStepCurve";

// How I Work — 05: all icons centered on a single spine,
// text alternates right / left wrapping around each icon.
// Mobile: left rail, all text on the right.
// Tablet (768-1023): same centred spine, tighter circle + type scale —
// the tier is resolved from the viewport in ProcessStepCurve (mirrors md/lg).
export function Process() {
  return (
    <Section
      id="process"
      number="05"
      label="How I Work"
      title={<>From idea to <span className="text-accent">launch.</span></>}
      icon={<Workflow size={18} />}
    >
      <Reveal>
        <p className="max-w-[62ch] text-[13.5px] leading-[1.65] text-muted">
          From understanding the problem to launching a complete solution — six focused phases.
        </p>
      </Reveal>

      <ol className="relative mx-auto mt-8 max-w-5xl space-y-6 md:mt-12 md:space-y-9">
        {/* single center spine — all icons sit on this line */}
        <span
          aria-hidden
          className="absolute bottom-8 top-8 left-[38px] w-px bg-border md:left-1/2 md:-translate-x-1/2"
        />

        {processSteps.map((step, i) => {
          const mirror = i % 2 === 1;

          return (
            <li key={step.n} className="relative">
              <Reveal delay={0.05}>
                <ProcessStepCurve
                  stepLabel={step.n}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  mirror={mirror}
                />
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}



