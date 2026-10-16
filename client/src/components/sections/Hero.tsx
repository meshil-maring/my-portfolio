import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { HeroCodeCard } from "@/components/sections/HeroCodeCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { eyebrowClass } from "@/lib/typography";

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
      className="relative flex min-h-[calc(100svh-64px)] flex-col overflow-hidden bg-hero text-text transition-colors duration-200 md:min-h-[calc(100svh-68px)] lg:min-h-[calc(100svh-72px)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[110px]" />
      </div>

      <Container className="relative flex w-full flex-1 items-center py-12 md:py-16 lg:py-6">
        <div className="grid w-full items-center gap-12 py-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <div>
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-4 py-[7px] text-[13px] font-medium text-accent">
                <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
                Open to jobs &amp; freelance projects
              </span>
            </div>
            {/* §03 hero micro-spacing: badge→intro 24 · intro→H1 12 · H1→role 16
                · role→desc 16 · desc→CTA 20. Eyebrow = shared §02 label style. */}
            <div className="animate-fade-up" style={{ animationDelay: "60ms" }}>
              <p className={cn(eyebrowClass, "mt-6 text-muted")}>
                {hero.intro}
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <h1 className="mt-3 text-[46px] font-extrabold leading-[0.98] tracking-[-0.03em] text-text sm:text-[64px] lg:text-[74px] xl:text-[80px]">
                Engineering
                <br />
                ideas into{" "}
                <span className="text-accent">
                  reality
                  <span className="text-[#EAB308] dark:text-[#FACC15]">.</span>
                </span>
              </h1>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "180ms" }}>
              <p className="mt-4 text-[17px] font-bold text-text lg:text-[21px]">
                Full-Stack Developer <span className="text-accent">&amp;</span> AI Engineer
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
              <p className="mt-4 max-w-[56ch] text-[14px] leading-[1.75] text-muted lg:text-[15px]">
                Building modern web applications, secure backend systems, and AI-powered
                products using scalable architecture and thoughtful engineering.
              </p>
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden />
                </Button>
                <Button href={hero.secondaryCta.href} variant="secondary">
                  {hero.secondaryCta.label} <span aria-hidden>→</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden animate-fade-up justify-center lg:flex" style={{ animationDelay: "200ms" }}>
            <HeroCodeCard />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-border bg-surface transition-colors duration-200">
        <Container>
          <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-accent">✳</span> Full-Stack Development
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="text-accent">✳</span> AI / RAG Systems
            </li>
            <li className="hidden items-center gap-2 sm:flex">
              <span aria-hidden className="text-accent">✳</span> Backend Engineering
            </li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
