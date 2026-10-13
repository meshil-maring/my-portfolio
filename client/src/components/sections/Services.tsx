import { Code2, BrainCircuit, Server, LayoutDashboard } from "lucide-react";
import { services } from "@/data/services";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturedService } from "@/components/sections/FeaturedService";

const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code2, BrainCircuit, Server, LayoutDashboard,
};

export function Services() {
  // First service is the featured dark panel; the rest stay as compact cards.
  const [featured, ...rest] = services;
  const featuredIndex = services.indexOf(featured);

  return (
    <Section id="services" number="02" label="Services & Capabilities" title={<>What I <span className="text-accent">offer</span></>}>
      <FeaturedService service={featured} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2 md:mt-[14px] md:gap-[14px] lg:mt-4 lg:gap-4">
        {rest.map((s, i) => {
          const Icon = icons[s.icon] ?? Code2;
          return (
            <Reveal key={s.n} delay={((featuredIndex + i + 1) % 2) * 0.06}>
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

