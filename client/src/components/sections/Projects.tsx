import { CircleArrowOutUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { cardTitleClass, eyebrowClass, featuredTitleClass } from "@/lib/typography";

// Corner mark — lucide "circle-arrow-out-up-right" in the one site accent
// yellow (#EAB308 light / #FACC15 dark — the same pair as the hero period and
// the process step dot) on an always-dark chip so it reads over the mockup art.
function CornerArrow({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      title={label}
      className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#EAB308]/35 bg-[#07110D]/85 text-[#EAB308] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[#EAB308]/60 dark:border-[#FACC15]/35 dark:text-[#FACC15] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] dark:group-hover:border-[#FACC15]/60"
    >
      <CircleArrowOutUpRight size={18} strokeWidth={2} />
    </span>
  );
}

// Selected work — 01: shared Section header (GlassNumber + eyebrow + H2),
// featured case-study row, 2-card grid, disclaimer footnote. Chrome, gaps and
// label styles are the shared §03/§05 ones every other section uses.
export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section
      id="work"
      number="01"
      label="Portfolio"
      title={<>Selected <span className="text-accent">work.</span></>}
    >
      {featured && (
        <Reveal>
          <article className="group relative grid gap-0 overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-card)] transition-colors duration-200 md:grid-cols-[42%_58%]">
            <CornerArrow label={featured.title} />
            <div className="flex items-center justify-center bg-[#DDE9DC] p-6 sm:p-8">
              <div className="w-full max-w-[300px] rotate-[-2deg] overflow-hidden rounded-card bg-white shadow-[0_16px_40px_rgba(10,30,20,0.25)]">
                <div className="flex items-center justify-between bg-[#2F6B4F] px-4 py-2.5 text-[12px] font-bold text-white">
                  <span>CampusAI ✳</span>
                  <span className="font-medium opacity-80">Assistant</span>
                </div>
                <div className="space-y-2.5 p-4">
                  <p className="text-[12px] font-bold text-[#172A23]">Ask your campus assistant</p>
                  <p className="rounded-md bg-[#EEF4EE] px-3 py-2 text-[11px] leading-relaxed text-[#5A6E62]">
                    How can I access my semester results?
                  </p>
                  <p className="rounded-md bg-[#E4F2E7] px-3 py-2 text-[11px] leading-relaxed text-[#2F6B4F]">
                    You can view your academic results through your student dashboard…
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className={cn(eyebrowClass, "text-accent")}>
                {featured.type} · {featured.status}
              </p>
              <h3 className={cn(featuredTitleClass, "mt-3")}>
                {featured.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.75] text-muted">
                {featured.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
              {featured.note && (
                <p className="mt-4 text-[12.5px] text-muted">{featured.note}</p>
              )}
            </div>
          </article>
        </Reveal>
      )}

      {/* §03 card gaps 12/14/16 like every other grid; 16px after the feature. */}
      <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-[14px] lg:gap-4">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={0.06 * i}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-card)] transition-colors duration-200">
              <CornerArrow label={p.title} />
              <div className={p.slug === "projectg" ? "flex h-[190px] items-center justify-center overflow-hidden bg-[#E7E7D8] p-6" : "flex h-[190px] items-center justify-center overflow-hidden bg-[#E4EAF2] p-6"}>
                <div className="w-full max-w-[290px] rotate-[-3deg] overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_rgba(10,30,60,0.22)]">
                  {p.slug === "projectg" ? (
                    <>
                      <div className="flex items-center justify-between bg-[#5C7A5E] px-3.5 py-2 text-[11px] font-bold text-white">
                        <span>ProjectG</span>
                        <span className="font-medium opacity-80">Community</span>
                      </div>
                      <div className="space-y-2 p-3.5">
                        <div className="h-2 w-1/2 rounded-full bg-[#CBD5C0]" />
                        <div className="grid grid-cols-[1fr_1.4fr] gap-2">
                          <div className="h-10 rounded bg-[#A9BFA4]" />
                          <div className="space-y-1.5">
                            <div className="h-2 rounded-full bg-[#D5DCCF]" />
                            <div className="h-2 w-5/6 rounded-full bg-[#D5DCCF]" />
                            <div className="h-2 w-2/3 rounded-full bg-[#D5DCCF]" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between bg-[#2E4A7A] px-3.5 py-2 text-[11px] font-bold text-white">
                        <span>EPM Staffing</span>
                        <span className="font-medium opacity-80">Jobs ↗</span>
                      </div>
                      <div className="space-y-2 p-3.5">
                        <div className="h-2 w-2/3 rounded-full bg-[#D5DCE8]" />
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 rounded bg-[#DCE4F0]" />
                          <div className="h-8 rounded bg-[#BFD2E8]" />
                          <div className="h-8 rounded bg-[#DCE4F0]" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className={cn(eyebrowClass, "text-accent")}>
                  {p.status} · {p.type}
                </p>
                <h3 className={cn(cardTitleClass, "mt-2.5")}>
                  {p.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-[1.75] text-muted">
                  {p.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-muted">
        Project visuals are illustrative mockups, not actual application screenshots.
      </p>
    </Section>
  );
}
