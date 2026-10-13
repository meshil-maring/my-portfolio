import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HeroCodeCard } from "@/components/sections/HeroCodeCard";

// Full-screen hero matching reference: deep-green panel, big
// headline, tilted code card, bottom capability strip.
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-[#07110D] text-[#EDF5EE] md:min-h-[calc(100svh-68px)] lg:min-h-[calc(100svh-72px)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#1B4D33]/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#123B26]/50 blur-[110px]" />
      </div>

      <Container className="relative flex w-full flex-1 items-center py-12 md:py-16 lg:py-6">
        <div className="grid w-full items-center gap-12 py-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-[7px] text-[13px] font-medium text-[#B9D9C1]">
                <span aria-hidden className="h-2 w-2 rounded-full bg-[#4ADE80]" />
                Open to jobs &amp; freelance projects
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.22em] text-[#8FA89A]">
                {hero.intro}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-4 text-[46px] font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-[64px] lg:text-[74px] xl:text-[80px]">
                Engineering
                <br />
                ideas into <span className="text-[#B9F4CA]">reality.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[17px] font-bold text-white lg:text-[21px]">
                Full-Stack Developer <span className="text-[#B9F4CA]">&amp;</span> AI Engineer
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.75] text-[#9DB3A6] lg:text-[15px]">
                Building modern web applications, secure backend systems, and AI-powered
                products using scalable architecture and thoughtful engineering.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-[10px] bg-[#B9F4CA] px-6 text-[14px] font-bold text-[#0A1A10] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
                >
                  {hero.primaryCta.label} <ArrowUpRight size={17} strokeWidth={2.5} />
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-[10px] border border-white/15 bg-white/[0.04] px-6 text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08]"
                >
                  {hero.secondaryCta.label} <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden justify-center lg:flex">
            <HeroCodeCard />
          </Reveal>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-black/25">
        <Container>
          <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#93AC9A] sm:text-xs">
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-[#B9F4CA]">✳</span> Full-Stack Development
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-[#B9F4CA]">✳</span> AI / RAG Systems
            </li>
            <li className="hidden items-center gap-2 sm:flex">
              <span aria-hidden className="text-[#B9F4CA]">✳</span> Backend Engineering
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
