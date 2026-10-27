import { Mail, FileDown } from "lucide-react";
import { contact, socials } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { brandMeta } from "@/components/ui/BrandIcons";
import { sectionTitleClass } from "@/lib/typography";

// Glyph-only icons (currentColor) — Email uses the lucide envelope, LinkedIn /
// GitHub reuse the same BrandIcons as the hero code card + service tiles, so
// every brand mark on the page comes from one registry.
const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin: brandMeta.linkedin.Logo,
  Github: brandMeta.github.Logo,
};

export function Contact() {
  return (
    <Section id="contact" number="08" label="Contact" title={<span className="sr-only">Contact</span>}>
      <Reveal>
        <div className="rounded-card border border-border bg-soft px-5 py-8 text-center md:px-8">
          <Container className="max-w-[640px]">
            <h2 className={sectionTitleClass}>
              Let&apos;s build something <span className="text-accent">great.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[55ch] text-sm leading-[1.7] text-muted">
              {contact.description}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <Button href={contact.primaryCta.href}>
                {contact.primaryCta.label}
              </Button>
              <Button href={contact.secondaryCta.href} variant="secondary">
                {contact.secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-4 text-[13px] font-medium text-muted">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon] ?? Mail;
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                      <Icon className="h-[15px] w-[15px]" aria-hidden="true" /> {s.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a href="/resume.pdf" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                  <FileDown size={15} /> Resume
                </a>
              </li>
            </ul>
          </Container>
        </div>
      </Reveal>
    </Section>
  );
}
