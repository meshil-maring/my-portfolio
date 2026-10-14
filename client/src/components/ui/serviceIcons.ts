import type { ComponentType } from "react";
import { Code2, BrainCircuit, Server, LayoutDashboard } from "lucide-react";

// design-system §10: lucide glyph for each Service.icon (data/services.ts) —
// the canonical icon map for the Service contract, used by FeaturedService
// (kept in ui/ so section layout and the data contract stay decoupled).
export const serviceIcons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Code2,
  BrainCircuit,
  Server,
  LayoutDashboard,
};
