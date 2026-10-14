import { CircleArrowOutUpRight, LayoutGrid } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { GlassNumber } from "@/components/ui/GlassNumber";

// Corner mark — lucide "circle-arrow-out-up-right" in warm yellow (#EFC65C)
// that complements the deep-green panel + mint accents.
function CornerArrow({ label }: { label: string }) {
  return (
    <span
      aria-hidden="true"
      title={label}
      className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#EFC65C]/35 bg-[#07110D]/85 text-[#EFC65C] shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[#EFC65C]/60 group-hover:text-[#F6D47E]"
    >
      <CircleArrowOutUpRight size={18} strokeWidth={2} />
    </span>
  );
}

// Selected work — theme-aware panel (light tokens + dark overrides, §09): eyebrow + headline,
// featured case-study row, 2-card grid, disclaimer footnote.
export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-20 bg-bg py-14 text-text transition-colors duration-200 dark:bg-[#07110D] dark:text-[#EDF5EE] md:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <GlassNumber number="01" icon={<LayoutGrid size={18} />} />
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-accent dark:text-[#B9F4CA]">
              Portfolio
            </p>
          </div>
          <h2 className="mt-3 text-[32px] font-extrabold leading-none tracking-[-0.02em] text-text dark:text-white sm:text-[38px]">
            Selected <span className="text-accent dark:text-[#B9F4CA]">work.</span>
          </h2>
        </Reveal>

        {featured && (
          <Reveal delay={0.08}>
            <article className="group relative mt-8 grid gap-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-colors duration-200 dark:border-white/10 dark:bg-[#0C1A12] dark:shadow-none md:grid-cols-[42%_58%]">
              <CornerArrow label={featured.title} />
              <div className="flex items-center justify-center bg-[#DDE9DC] p-6 sm:p-8">
                <div className="w-full max-w-[300px] rotate-[-2deg] overflow-hidden rounded-xl bg-white shadow-[0_16px_40px_rgba(10,30,20,0.25)]">
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
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent dark:text-[#B9F4CA]">
                  {featured.type} · {featured.status}
                </p>
                <h3 className="mt-3 text-[24px] font-extrabold tracking-tight text-text dark:text-white sm:text-[28px]">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.75] text-muted dark:text-[#9DB3A6]">
                  {featured.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-[7px] border border-border bg-soft px-3 py-1.5 text-[12px] font-medium text-muted dark:border-white/10 dark:bg-white/[0.05] dark:text-[#C4D6C9]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {featured.note && (
                  <p className="mt-4 text-[12.5px] text-muted dark:text-[#7E9688]">{featured.note}</p>
                )}
              </div>
            </article>
          </Reveal>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={0.06 * i}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-colors duration-200 dark:border-white/10 dark:bg-[#0C1A12] dark:shadow-none">
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent dark:text-[#B9F4CA]">
                    {p.status} · {p.type}
                  </p>
                  <h3 className="mt-2.5 text-[21px] font-extrabold tracking-tight text-text dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-[1.75] text-muted dark:text-[#9DB3A6]">
                    {p.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-[7px] border border-border bg-soft px-3 py-1.5 text-[12px] font-medium text-muted dark:border-white/10 dark:bg-white/[0.05] dark:text-[#C4D6C9]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-[12px] text-muted dark:text-[#6E8478]">
          Project visuals are illustrative mockups, not actual application screenshots.
        </p>
      </Container>
    </section>
  );
}
