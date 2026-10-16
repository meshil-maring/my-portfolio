import { skillGroups } from "@/data/skills";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { cardTitleClass } from "@/lib/typography";

export function Skills() {
  return (
    <Section id="skills" number="03" label="Technical Skills" title={<>Tech I <span className="text-accent">work with</span></>}>
      <div className="grid gap-3 sm:grid-cols-2 md:gap-[14px] lg:gap-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.label} delay={(i % 2) * 0.06}>
            <Card className="h-full">
              <h3 className={cardTitleClass}>{g.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <li key={s}><Tag>{s}</Tag></li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
