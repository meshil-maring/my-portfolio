import { Code2, BrainCircuit, Server, LayoutDashboard } from "lucide-react";
import { services } from "@/data/services";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, BrainCircuit, Server, LayoutDashboard,
};

export function Services() {
  return (
    <Section id="services" number="02" label="Services & Capabilities" title={<>What I <span className="text-accent">offer</span></>}>
      <div className="grid gap-3 sm:grid-cols-2 md:gap-[14px] lg:gap-4">
        {services.map((s, i) => {
          const Icon = icons[s.icon] ?? Code2;
          return (
            <Reveal key={s.n} delay={(i % 2) * 0.06}>
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-accent-soft text-accent">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-sm font-bold text-accent">{s.n}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-[1.3]">{s.title}</h3>
                <p className="mt-2 text-sm leading-[1.7] text-muted">{s.description}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
