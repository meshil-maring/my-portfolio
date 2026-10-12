import { Mail, Link as LinkIcon, FileDown } from "lucide-react";
import { contact, socials } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  Mail, Linkedin: LinkIcon, Github: LinkIcon,
};

export function Contact() {
  return (
    <Section id="contact" number="06" label="Contact" title={<span className="sr-only">Contact</span>}>
      <Reveal>
        <div className="rounded-card border border-border bg-soft px-5 py-8 text-center md:px-8">
          <Container className="max-w-[640px]">
            <h2 className="text-[28px] font-extrabold leading-[1.2] tracking-[-0.03em] lg:text-4xl">
              Let&apos;s build something <span className="text-accent">great.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[55ch] text-sm leading-[1.7] text-muted">
              {contact.description}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <a
                href={contact.primaryCta.href}
                className="inline-flex min-h-[44px] items-center rounded-btn bg-accent px-5 text-[13px] font-bold text-accent-text transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                {contact.primaryCta.label}
              </a>
              <a
                href={contact.secondaryCta.href}
                className="inline-flex min-h-[44px] items-center rounded-btn border border-border bg-surface px-5 text-[13px] font-bold text-text transition-all duration-200 hover:-translate-y-0.5 hover:border-accent"
              >
                {contact.secondaryCta.label}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-4 text-[13px] font-medium text-muted">
              {socials.map((s) => {
                const Icon = icons[s.icon] ?? Mail;
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-accent">
                      <Icon size={15} /> {s.label}
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
