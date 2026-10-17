// System prompt that grounds the AI assistant in this portfolio's data.
// Server-only: consumed by app/api/chat/route.ts — never import from a client
// component. Built per request so it always tracks the data/*.ts files.
import { about, availabilityBadge, contact, discuss, hero, socials } from "@/data/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { skillGroups } from "@/data/skills";
import { processSteps } from "@/data/process";

export function buildSystemPrompt(): string {
  // Keep the payload lean: pick only fields the model can cite (drop image
  // paths and icon names — they carry no answer content).
  const projectContext = projects.map(
    ({ slug, title, status, type, description, highlights, tags, liveUrl, repoUrl, caseStudyUrl, featured, note }) => ({
      slug,
      title,
      status,
      type,
      description,
      highlights,
      tags,
      liveUrl,
      repoUrl,
      caseStudyUrl,
      featured,
      note,
    }),
  );
  const serviceContext = services.map(({ n, title, description, accentWord, stack }) => ({
    n,
    title,
    description,
    accentWord,
    stack,
  }));
  const stepContext = processSteps.map(({ n, title, description }) => ({
    n,
    title,
    description,
  }));

  return [
    "You are the AI assistant embedded in DS Meshil Maring's portfolio website.",
    "Answer visitors' questions about him: projects, skills, services, process,",
    "education, availability and how to get in touch.",
    "",
    "Rules:",
    "- Use ONLY the context below. Never invent projects, employers, skills, dates or URLs.",
    "- If the answer is not in the context, say you don't have that information and",
    "  suggest using the contact sections on the page instead.",
    "- Keep answers short and friendly: 2-4 sentences, plain text (no markdown",
    "  headings, no bullet lists, no code blocks).",
    "- When relevant, point to the matching page section: #work, #services, #skills,",
    "  #about, #discuss or #contact.",
    "- Decline anything unrelated to the portfolio.",
    "",
    "## Who he is",
    `Name: DS Meshil Maring`,
    `Role: ${hero.role}`,
    `Intro: ${hero.description}`,
    `About: ${about.body}`,
    `Availability: ${availabilityBadge}`,
    `Education: ${JSON.stringify(about.education)}`,
    "",
    "## Contact",
    `Email: ${discuss.email}`,
    `Contact CTA: ${contact.heading} ${contact.description}`,
    `Socials: ${JSON.stringify(socials.map(({ label, href }) => ({ label, href })))}`,
    `How to start a project: ${discuss.description}`,
    `Project types he takes on: ${discuss.projectTypes.join(", ")}`,
    "",
    "## Projects",
    JSON.stringify(projectContext, null, 2),
    "",
    "## Services",
    JSON.stringify(serviceContext, null, 2),
    "",
    "## Skills",
    JSON.stringify(skillGroups, null, 2),
    "",
    "## How he works (process)",
    JSON.stringify(stepContext, null, 2),
  ].join("\n");
}
