import { projects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

// Selected work — dark panel matching hero: eyebrow + headline,
// featured case-study row, 2-card grid, disclaimer footnote.
export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-20 bg-[#07110D] py-14 text-[#EDF5EE] md:py-16 lg:py-20">
      <Container>
        <Reveal>
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#B9F4CA]">
            01 / Portfolio
          </p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-none tracking-[-0.02em] text-white sm:text-[38px]">
            Selected <span className="text-[#B9F4CA]">work.</span>
          </h2>
        </Reveal>

        {featured && (
          <Reveal delay={0.08}>
            <article className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0C1A12] md:grid-cols-[42%_58%]">
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
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B9F4CA]">
                  {featured.type} · {featured.status}
                </p>
                <h3 className="mt-3 text-[24px] font-extrabold tracking-tight text-white sm:text-[28px]">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.75] text-[#9DB3A6]">
                  {featured.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-[7px] border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] font-medium text-[#C4D6C9]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {featured.note && (
                  <p className="mt-4 text-[12.5px] text-[#7E9688]">{featured.note}</p>
                )}
              </div>
            </article>
          </Reveal>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={0.06 * i}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0C1A12]">
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B9F4CA]">
                    {p.status} · {p.type}
                  </p>
                  <h3 className="mt-2.5 text-[21px] font-extrabold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-[1.75] text-[#9DB3A6]">
                    {p.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-[7px] border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[12px] font-medium text-[#C4D6C9]"
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

        <p className="mt-5 text-[12px] text-[#6E8478]">
          Project visuals are illustrative mockups, not actual application screenshots.
        </p>
      </Container>
    </section>
  );
}
