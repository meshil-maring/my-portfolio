import { Fragment } from "react";
import { services } from "@/data/services";
import { Section } from "@/components/layout/Section";
import { FeaturedService } from "@/components/sections/FeaturedService";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

// design-system §07 (proposal 2026-10-14-services-zigzag-flow): the four
// featured panels flow in a zigzag — 01 left · 02 right · 03 left · 04 right
// (lg+) — linked by a connected dashed line.
//
// Panels are 74% wide at lg; a panel's inner edge (the side facing the gap)
// sits 4% inside its outer edge → connector anchors at 70% (left panels) and
// 30% (right panels) of the container. The SVG uses percentage coordinates
// with no viewBox, so the dash rhythm never distorts at any width.
const LEFT_INNER = "70%";
const RIGHT_INNER = "30%";

// Dashed connector between two featured panels: a zigzag diagonal on lg
// (alternating ╲ ╱ ╲ between the panels' inner edges — the Z flow) with
// accent node dots touching both panels; a straight vertical link below lg
// where panels stack full-width. Decorative only (aria-hidden).
function FlowConnector({ upperLeft }: { upperLeft: boolean }) {
  const start = upperLeft ? LEFT_INNER : RIGHT_INNER;
  const end = upperLeft ? RIGHT_INNER : LEFT_INNER;
  return (
    <Reveal className="relative h-9 lg:h-24">
      <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
        {/* Mobile / tablet: vertical link between stacked panels */}
        <g className="lg:hidden">
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            className="stroke-accent/70"
            strokeWidth={1.5}
            strokeDasharray="5 6"
          />
          <circle cx="50%" cy="0" r={3.5} className="fill-accent" />
          <circle cx="50%" cy="100%" r={3.5} className="fill-accent" />
        </g>
        {/* lg+: zigzag diagonal from the upper panel's inner edge down to
            the lower panel's inner edge */}
        <g className="hidden lg:block">
          <line
            x1={start}
            y1="0"
            x2={end}
            y2="100%"
            className="stroke-accent/70"
            strokeWidth={1.5}
            strokeDasharray="6 7"
          />
          <circle cx={start} cy="0" r={4} className="fill-accent" />
          <circle cx={end} cy="100%" r={4} className="fill-accent" />
        </g>
      </svg>
    </Reveal>
  );
}

export function Services() {
  // design-system §07 §10: all four services render as featured panels in a
  // zigzag flow joined by dashed connectors.
  return (
    <Section id="services" number="02" label="Services & Capabilities" title={<>What I <span className="text-accent">offer</span></>}>
      {services.map((s, i) => (
        <Fragment key={s.n}>
          {i > 0 && <FlowConnector upperLeft={(i - 1) % 2 === 0} />}
          <FeaturedService
            service={s}
            // Odd rows (02, 04) sit on the right and mirror their internals.
            mirror={i % 2 === 1}
            className={i % 2 === 1 ? "lg:ml-auto lg:w-[74%]" : "lg:mr-auto lg:w-[74%]"}
          />
        </Fragment>
      ))}
      {/* Closes the Z-flow with the section's conversion path (proposal
          2026-10-17-services-offer-polish) — same CTA language as Contact. */}
      <Reveal className="mt-8 md:mt-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted">
            Not sure which one fits your project?
          </p>
          <Button variant="secondary" href="#discuss">
            Discuss a project
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}

