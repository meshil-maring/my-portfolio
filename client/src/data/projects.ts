import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    slug: "college-ai-assistant",
    title: "College AI Assistant",
    status: "In Progress",
    type: "Featured Case Study",
    description:
      "Multi-tenant RAG platform for university workflows.",
    highlights: [
      "Semantic document retrieval",
      "Role-aware access control",
      "Academic workflows",
      "Multi-tenant architecture",
    ],
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Supabase", "RAG"],
    image: "/projects/college-ai-assistant.png",
    featured: true,
    note: "Currently under development",
  },
  {
    slug: "epm-staffing-services",
    title: "EPM Staffing Services",
    status: "Live",
    type: "Recruitment Platform",
    description: "Full-stack recruitment platform.",
    highlights: [
      "Job posting and candidate tracking",
      "Interview scheduling",
      "Role-based authentication",
      "Secure recruitment workflows",
    ],
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    image: "/projects/epm-staffing.png",
    liveUrl: "https://www.epmstaffingservices.com/",

    featured: true,
  },
  {
    slug: "projectg",
    title: "ProjectG",
    status: "Live",
    type: "Non-Profit Platform",
    description: "Non-profit CMS and engagement platform.",
    highlights: [
      "Content management dashboard",
      "Secure authentication and RBAC",
      "Media storage and content workflows",
      "Deployment infrastructure",
    ],
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma"],
    liveUrl: "https://projectgmanipur.com/",

    image: "/projects/projectg.png",
    featured: true,
  },
];
