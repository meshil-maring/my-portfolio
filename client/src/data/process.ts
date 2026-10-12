import type { ProcessStep } from "@/types/portfolio";

// How I Work — 6-step delivery flow: understand → launch.
// Icons map to lucide names used in Process.tsx.
export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Understand",
    description:
      "Clarify the problem, user needs, and project requirements.",
    icon: "Compass",
  },
  {
    n: "02",
    title: "Plan & Design",
    description:
      "Map user flows and design clear, intuitive interfaces.",
    icon: "PenTool",
  },
  {
    n: "03",
    title: "Architecture & Database",
    description:
      "When needed, plan the application structure, APIs, and database schema to support the project's features.",
    icon: "Database",
  },
  {
    n: "04",
    title: "Develop",
    description:
      "Build the interface, implement backend logic, and connect the application's components.",
    icon: "Code2",
  },
  {
    n: "05",
    title: "Test & Refine",
    description:
      "Check functionality, responsiveness, and usability, then refine the experience.",
    icon: "ClipboardCheck",
  },
  {
    n: "06",
    title: "Deploy & Improve",
    description:
      "Launch the project, document the setup, and refine it based on feedback.",
    icon: "Rocket",
  },
];
