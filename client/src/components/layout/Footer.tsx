import { socials } from "@/data/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <Container>
        <div className="flex flex-col items-center justify-between gap-3 text-[13px] text-muted sm:flex-row">
          <p>© 2026 DS Meshil Maring. All rights reserved.</p>
          <ul className="flex items-center gap-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
