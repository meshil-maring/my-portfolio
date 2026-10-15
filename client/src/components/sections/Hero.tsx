import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { HeroCodeCard } from "@/components/sections/HeroCodeCard";

// Above-the-fold copy uses the CSS `animate-fade-up` keyframe (globals.css)
// instead of motion's Reveal: the headline — the page's LCP element — paints
// as soon as HTML+CSS arrive, with no wait for JS hydration, while keeping
// the same §08 fade-up look. Delays mirror the old Reveal stagger.

// Full-screen hero matching reference: deep-green panel, big
// headline, tilted code card, bottom capability strip.
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-hero text-text transition-colors duration-200 dark:bg-[#07110D] dark:text-[#EDF5EE] md:min-h-[calc(100svh-68px)] lg:min-h-[calc(100svh-72px)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/15 blur-[120px] dark:bg-[#1B4D33]/40" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[110px] dark:bg-[#123B26]/50" />
      </div>

      <Container className="relative flex w-full flex-1 items-center py-12 md:py-16 lg:py-6">
        <div className="grid w-full items-center gap-12 py-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <div>
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-[7px] text-[13px] font-medium text-accent dark:border-white/10 dark:bg-white/[0.06] dark:text-[#B9D9C1]">
                <span aria-hidden className="h-2 w-2 rounded-full bg-accent dark:bg-[#4ADE80]" />
                Open to jobs &amp; freelance projects
              </span>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.22em] text-muted dark:text-[#8FA89A]">
                {hero.intro}
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <h1 className="mt-4 text-[46px] font-extrabold leading-[0.98] tracking-[-0.03em] text-text sm:text-[64px] lg:text-[74px] xl:text-[80px] dark:text-white">
                Engineering
                <br />
                ideas into{" "}
                <span className="text-accent dark:text-[#B9F4CA]">
                  reality
                  <span className="text-[#EAB308] dark:text-[#FACC15]">.</span>
                </span>
              </h1>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
              <p className="mt-5 text-[17px] font-bold text-text lg:text-[21px] dark:text-white">
                Full-Stack Developer <span className="text-accent dark:text-[#B9F4CA]">&amp;</span> AI Engineer
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
              <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.75] text-muted lg:text-[15px] dark:text-[#9DB3A6]">
                Building modern web applications, secure backend systems, and AI-powered
                products using scalable architecture and thoughtful engineering.
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-[10px] bg-accent px-6 text-[14px] font-bold text-accent-text transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 dark:bg-[#B9F4CA] dark:text-[#0A1A10]"
                >
                  {hero.primaryCta.label} <ArrowUpRight size={17} strokeWidth={2.5} />
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-[10px] border border-border bg-surface px-6 text-[14px] font-bold text-text transition-all duration-200 hover:-translate-y-0.5 hover:bg-soft dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
                >
                  {hero.secondaryCta.label} <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="hidden animate-fade-up justify-center lg:flex" style={{ animationDelay: "200ms" }}>
            <HeroCodeCard />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-border bg-surface transition-colors duration-200 dark:border-white/10 dark:bg-black/25">
        <Container>
          <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted sm:text-xs dark:text-[#93AC9A]">
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-accent dark:text-[#B9F4CA]">✳</span> Full-Stack Development
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-accent dark:text-[#B9F4CA]">✳</span> AI / RAG Systems
            </li>
            <li className="hidden items-center gap-2 sm:flex">
              <span aria-hidden className="text-accent dark:text-[#B9F4CA]">✳</span> Backend Engineering
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
