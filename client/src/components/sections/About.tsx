import { GraduationCap } from "lucide-react";
import { about } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { TypingSearchCard } from "@/components/ui/TypingSearchCard";

export function About() {
  return (
    <Section id="about" number="04" label="About & Education" title={<>A bit <span className="text-accent">about me</span></>}>
      {/* Desktop: intro + education stacked left, floating command card right
          (explicit grid placement lets the card span both rows and center
          against them). Mobile stacks intro → card → education. */}
      <div className="grid gap-3 md:grid-cols-2 md:gap-[14px] lg:gap-4">
        <Reveal>
          <p className="text-[15px] leading-[1.7] text-muted">{about.body}</p>
        </Reveal>
        <Reveal delay={0.14} className="flex items-center md:col-start-2 md:row-span-2 md:row-start-1">
          <TypingSearchCard
            label={about.command.label}
            messages={about.command.messages}
            suggestions={about.command.suggestions}
            status={about.command.status}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="h-full">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-accent-soft text-accent">
                <GraduationCap size={18} />
              </span>
              <h3 className="text-base font-bold">Education</h3>
            </div>
            <p className="mt-3 text-sm font-semibold">{about.education.degree}</p>
            <p className="mt-1 text-sm text-muted">{about.education.institution}</p>
            <p className="mt-1 font-mono text-xs text-faint">{about.education.specialization}</p>
            <ul className="mt-3 list-inside list-disc text-[13px] leading-6 text-muted">
              {about.education.areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
