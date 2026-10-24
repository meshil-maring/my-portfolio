import type { Service } from "@/types/portfolio";

// design-system v1.1 §07 §10
export const services: Service[] = [
  {
    n: "01",
    title: "Full-Stack Web Applications",
    description:
      "Responsive frontend interfaces, backend services, databases, and complete business workflows.",
    icon: "Code2",
    accentWord: "Applications",
    stack: ["react", "nodedotjs", "tailwindcss", "postgresql", "firebase", "mongodb"],
    deliverables: ["Responsive frontends", "REST APIs & auth", "Database design"],
  },
  {
    n: "02",
    title: "AI and RAG Solutions",
    description:
      "Document-aware assistants, semantic search, LLM integrations, and intelligent retrieval workflows.",
    icon: "BrainCircuit",
    // Featured-panel fields (same treatment as 01): accent word at the end of
    // the title + BrandIcons keys for the floating desktop/mobile stack tiles.
    accentWord: "Solutions",
    stack: ["python", "fastapi", "huggingface", "postgresql", "supabase", "react"],
    deliverables: ["RAG pipelines", "Semantic search", "LLM integrations"],
  },
  {
    n: "03",
    title: "Backend and API Development",
    description:
      "REST APIs, secure authentication, role-based authorization, database integration, and multi-tenant architecture.",
    icon: "Server",
    // Featured-panel fields (same treatment as 01): accent word at the end of
    // the title + BrandIcons keys for the floating desktop/mobile stack tiles.
    accentWord: "Development",
    stack: ["nodedotjs", "python", "fastapi", "docker", "postgresql", "supabase"],
    deliverables: ["Secure REST APIs", "Role-based access", "Multi-tenant design"],
  },
  {
    n: "04",
    title: "Dashboards and CMS Platforms",
    description:
      "Custom admin dashboards, content management systems, media workflows, and operational interfaces.",
    icon: "LayoutDashboard",
    // Featured-panel fields (same treatment as 01): accent word at the end of
    // the title + BrandIcons keys for the floating desktop/mobile stack tiles.
    accentWord: "Platforms",
    stack: ["react", "tailwindcss", "postgresql", "supabase", "mongodb", "firebase"],
    deliverables: ["Admin dashboards", "Content workflows", "Media handling"],
  },
];
