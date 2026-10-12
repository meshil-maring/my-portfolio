"use client";

import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/data/site";
import { useTheme } from "./ThemeProvider";
import { Container } from "./Container";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07110D]/95 text-[#EDF5EE] backdrop-blur">
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between md:h-[68px] lg:h-[72px]">
          <a href="#home" className="text-[15px] font-extrabold tracking-tight text-white">
            MESHIL<span className="ml-1.5 font-mono text-[11px] font-medium tracking-[0.2em] text-[#8FA89A]">DEV</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    "text-[13.5px] font-medium text-[#C4D6C9] transition-colors hover:text-white",
                    link.emphasize &&
                      "rounded-[8px] border border-white/20 bg-transparent px-4 py-2 text-[13px] font-bold text-[#B9F4CA] hover:border-[#B9F4CA]/60 hover:text-[#B9F4CA]",
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
                className="rounded-btn p-2 text-[#C4D6C9] transition-colors hover:bg-white/10 hover:text-white"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-btn p-2 text-[#C4D6C9] hover:bg-white/10"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-btn p-2 text-white hover:bg-white/10"
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
                    "block rounded-btn px-3 py-2.5 text-sm font-medium text-[#EDF5EE] hover:bg-white/10",
                    link.emphasize && "border border-white/20 font-bold text-[#B9F4CA]",
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
