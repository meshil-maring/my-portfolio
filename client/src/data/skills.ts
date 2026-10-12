import type { SkillGroup } from "@/types/portfolio";

// design-system v1.0 §11 — grouped tags, no percentages
export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend Development",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend and APIs",
    skills: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "Authentication", "Role-based authorization"],
  },
  {
    label: "AI and Machine Learning",
    skills: ["RAG", "LLMs", "Embeddings", "Semantic Search", "NLP", "Hugging Face", "Scikit-learn"],
  },
  {
    label: "Databases and Infrastructure",
    skills: ["PostgreSQL", "Supabase", "pgvector", "Cloudflare R2", "Docker", "Git", "GitHub"],
  },
];
