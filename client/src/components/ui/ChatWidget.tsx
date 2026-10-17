"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { assistant } from "@/data/assistant";
import { cn } from "@/lib/cn";
import { ChatPanel } from "./ChatPanel";

interface ChatWidgetProps {
  className?: string;
}

// Floating AI-assistant launcher (proposal 2026-10-16) — fixed bottom-right
// circle that toggles ChatPanel. Sits at z-50 (above the z-40 Navbar); the
// custom Cursor overlays everything and is pointer-events-none, so it still
// renders over the panel. Esc closes the dialog.
export function ChatWidget({ className }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6",
        className,
      )}
    >
      {open && <ChatPanel onClose={() => setOpen(false)} />}
      <button
        type="button"
        aria-label={open ? assistant.closeLabel : assistant.launcherLabel}
        aria-expanded={open}
        aria-controls={open ? "ai-assistant-panel" : undefined}
        onClick={() => setOpen((value) => !value)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-text shadow-[0_8px_24px_rgba(20,50,32,0.28)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
