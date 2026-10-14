import type { Project } from "@/types/portfolio";

// design-system v1.1 §07 + §10 — real projects only, honest statuses
export const projects: Project[] = [
  {
    slug: "college-ai-assistant",
    title: "College AI Assistant",
    status: "In Progress",
    type: "Featured Case Study",
    description:
      "Multi-tenant RAG platform for university workflows, semantic document retrieval, and personalized academic assistance.",
    highlights: [
      "Document ingestion",
      "Text chunking",
      "Embeddings",
      "Semantic retrieval",
      "Role-based authorization",
      "Multi-tenant architecture",
      "Academic workflows",
      "Secure data handling",
    ],
    tags: ["React", "TypeScript", "FastAPI", "RAG", "PostgreSQL"],
    image: "/projects/college-ai-assistant.png",
    featured: true,
    note: "Currently under development",
  },
  {
    slug: "epm-staffing-services",
    title: "EPM Staffing Services",
    status: "Live",
    type: "Recruitment Platform",
    description:
      "Full-stack hiring platform with job postings, candidate tracking, interview scheduling, and role-based authorization.",
    highlights: [
      "Candidate management",
      "Job management",
      "Interview workflows",
      "Role-based authorization",
      "Backend APIs",
      "Database integration",
    ],
    tags: ["React", "Express", "PostgreSQL"],
    image: "/projects/epm-staffing.png",
    featured: true,
  },
  {
    slug: "projectg",
    title: "ProjectG",
    status: "Live",
    type: "Non-Profit Platform",
    description:
      "CMS and engagement platform with secure administration, content workflows, file storage, and production deployment.",
    highlights: [
      "Content management",
      "Administrative dashboards",
      "Media handling",
      "Secure backend APIs",
      "Deployment infrastructure",
    ],
    tags: ["TypeScript", "Prisma", "Docker"],
    image: "/projects/projectg.png",
    featured: true,
  },
];
