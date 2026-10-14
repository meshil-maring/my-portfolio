// Shared portfolio domain types — design-system v1.1 §10
// Runtime-free: types only. See docs/typescript/02-type-conventions.md

export type ProjectStatus = "Live" | "In Progress";

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  type: string;
  description: string;
  highlights: string[];
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  note?: string;
}

export interface Service {
  n: string;
  title: string;
  description: string;
  icon: string;
  // Rendered in accent color at the end of the title (e.g. "Applications")
  accentWord?: string;
  // Brand-logo tiles shown on the featured layout (keys into BrandIcons)
  stack?: string[];
}

export interface ProcessStep {
  n: string;
  title: string;
  description: string;
  icon: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  emphasize?: boolean;
}
