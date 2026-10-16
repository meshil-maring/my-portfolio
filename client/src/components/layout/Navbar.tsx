"use client";

import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/data/site";
import { useTheme } from "./ThemeProvider";
import { Container } from "./Container";

export function Navbar() {
  const { theme, toggle, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  // Render the server-matching icon until the client theme has synced.
  const themeIcon = !mounted || theme !== "dark" ? <Moon size={18} /> : <Sun size={18} />;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 text-text backdrop-blur-sm transition-colors duration-200">
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between md:h-[68px] lg:h-[72px]">
          <a href="#home" className="text-[15px] font-extrabold tracking-tight text-text">
            MESHIL<span className="ml-1.5 font-mono text-[11px] font-medium tracking-[0.12em] text-faint">DEV</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "text-[13.5px] font-medium text-muted transition-colors hover:text-text",
                    link.emphasize &&
                      "rounded-btn border border-accent/30 px-4 py-2 text-[13px] font-bold text-accent hover:border-accent",
                  )}
                >
                  {link.label}
                  {link.emphasize && <span aria-hidden> ↗</span>}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="rounded-btn p-2 text-muted transition-colors hover:bg-soft hover:text-text"
              >
                {themeIcon}
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-btn p-2 text-muted transition-colors hover:bg-soft hover:text-text"
            >
              {themeIcon}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-btn p-2 text-text transition-colors hover:bg-soft"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {open && (
          <ul className="flex flex-col gap-1 pb-4 md:hidden">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-btn px-3 py-2.5 text-sm font-medium text-text hover:bg-soft",
                    link.emphasize && "border border-accent/30 font-bold text-accent",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </header>
  );
}
