import type { Service } from "@/types/portfolio";

// design-system v1.0 §07 §10
export const services: Service[] = [
  {
    n: "01",
    title: "Full-Stack Web Applications",
    description:
      "Responsive frontend interfaces, backend services, databases, and complete business workflows.",
    icon: "Code2",
    accentWord: "Applications",
    stack: ["react", "nodedotjs", "tailwindcss", "postgresql", "firebase", "mongodb"],
  },
  {
    n: "02",
    title: "AI and RAG Solutions",
    description:
      "Document-aware assistants, semantic search, LLM integrations, and intelligent retrieval workflows.",
    icon: "BrainCircuit",
  },
  {
    n: "03",
    title: "Backend and API Development",
    description:
      "REST APIs, secure authentication, role-based authorization, database integration, and multi-tenant architecture.",
    icon: "Server",
  },
  {
    n: "04",
    title: "Dashboards and CMS Platforms",
    description:
      "Custom admin dashboards, content management systems, media workflows, and operational interfaces.",
    icon: "LayoutDashboard",
  },
];
