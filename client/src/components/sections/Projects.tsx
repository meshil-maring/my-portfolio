import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { cardTitleClass, eyebrowClass, featuredTitleClass } from "@/lib/typography";

function ProjectAction({ href, label, Icon }: { href?: string; label: string; Icon: typeof ArrowUpRight }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group/btn inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      <Icon size={18} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      <span className="sr-only">{label}</span>
    </a>
  );
}

function BrowserFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-lg border border-border/60 bg-white shadow-[0_16px_40px_rgba(10,30,20,0.18)] transition-transform duration-300 group-hover:scale-[1.025]">
      <div className="flex items-center gap-1.5 border-b border-[#E5E7EB] bg-[#F3F4F6] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
        <span className="ml-2 truncate text-[11px] font-medium text-[#6B7280]">{title}</span>
      </div>
      {children}
    </div>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <Section id="work" number="01" label="Portfolio" title={<>Selected <span className="text-accent">work.</span></>}>
      {featured && (
        <Reveal>
          <article className="group relative grid gap-0 overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-[3px] hover:border-accent/40 hover:shadow-[0_10px_28px_rgba(20,50,32,0.12)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] md:grid-cols-[45%_55%]">
            <div className="flex items-center justify-center bg-gradient-to-br from-[#DDE9DC] to-[#EAF2E8] p-6 sm:p-8 dark:from-[#1C2C24] dark:to-[#18231F]">
              <BrowserFrame title="campusai.app">
                <div className="space-y-2.5 bg-white p-4">
                  <div className="flex items-center justify-between rounded-md bg-[#2F6B4F] px-3 py-2 text-[12px] font-bold text-white">
                    <span>CampusAI</span>
                    <span className="font-medium opacity-80">Assistant</span>
                  </div>
                  <p className="text-[12px] font-bold text-[#172A23]">Ask your campus assistant</p>
                  <p className="rounded-md bg-[#EEF4EE] px-3 py-2 text-[11px] leading-relaxed text-[#5A6E62]">How can I access my semester results?</p>
                  <p className="rounded-md bg-[#E4F2E7] px-3 py-2 text-[11px] leading-relaxed text-[#2F6B4F]">You can view your academic results through your student dashboard…</p>
                </div>
              </BrowserFrame>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <p className={cn(eyebrowClass, "text-accent")}>{featured.type} · {featured.status}</p>
              <h3 className={cn(featuredTitleClass, "mt-3")}>{featured.title}</h3>

              {featured.status === "In Progress" && (
                <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-chip border border-accent/30 bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Currently under development
                </p>
              )}

              <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.75] text-muted">{featured.description}</p>

              {featured.highlights && featured.highlights.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                  {featured.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="text-[12px] text-muted">• {h}</li>
                  ))}
                </ul>
              )}

              <ul className="mt-4 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <li key={t}><Tag>{t}</Tag></li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <ProjectAction href={featured.caseStudyUrl} label={`View case study for ${featured.title}`} Icon={ExternalLink} />
                <ProjectAction href={featured.liveUrl} label={`Open live demo for ${featured.title}`} Icon={ArrowUpRight} />
              </div>
            </div>
          </article>
        </Reveal>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-[14px] lg:gap-4">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={0.06 * i}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-[3px] hover:border-accent/40 hover:shadow-[0_10px_28px_rgba(20,50,32,0.12)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
              <div className={cn("flex h-[180px] items-center justify-center overflow-hidden p-6", p.slug === "projectg" ? "bg-[#E7E7D8] dark:bg-[#2A2F27]" : "bg-[#E4EAF2] dark:bg-[#1F2A36]")}>
                <BrowserFrame title={p.slug === "projectg" ? "projectg.org" : "epmstaffing.com"}>
                  {p.slug === "projectg" ? (
                    <div className="space-y-2 bg-white p-3.5">
                      <div className="flex items-center justify-between bg-[#5C7A5E] px-3 py-1.5 text-[11px] font-bold text-white">
                        <span>ProjectG</span>
                        <span className="font-medium opacity-80">Community</span>
                      </div>
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
                  ) : (
                    <div className="space-y-2 bg-white p-3.5">
                      <div className="flex items-center justify-between bg-[#2E4A7A] px-3 py-1.5 text-[11px] font-bold text-white">
                        <span>EPM Staffing</span>
                        <span className="font-medium opacity-80">Jobs ?</span>
                      </div>
                      <div className="h-2 w-2/3 rounded-full bg-[#D5DCE8]" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded bg-[#DCE4F0]" />
                        <div className="h-8 rounded bg-[#BFD2E8]" />
                        <div className="h-8 rounded bg-[#DCE4F0]" />
                      </div>
                    </div>
                  )}
                </BrowserFrame>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className={cn(eyebrowClass, "text-accent")}>{p.status} · {p.type}</p>
                <h3 className={cn(cardTitleClass, "mt-2.5")}>{p.title}</h3>
                <p className="mt-2.5 flex-1 text-[13px] leading-[1.75] text-muted">{p.description}</p>

                {p.highlights && p.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="text-[11.5px] text-muted">• {h}</li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t}><Tag>{t}</Tag></li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ProjectAction href={p.caseStudyUrl} label={`View case study for ${p.title}`} Icon={ExternalLink} />
                  <ProjectAction href={p.liveUrl} label={`Open live demo for ${p.title}`} Icon={ArrowUpRight} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-muted">Project visuals are illustrative mockups, not actual application screenshots.</p>
    </Section>
  );
}
