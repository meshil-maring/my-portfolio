import type { Social, NavLink } from "@/types/portfolio";

// TODO(owner): replace hrefs with verified URLs before launch
export const socials: Social[] = [
  { label: "Email", href: "mailto:hello@example.com", icon: "Mail" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: "Linkedin" },
  { label: "GitHub", href: "https://github.com/meshil-maring", icon: "Github" },
];

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Discuss", href: "#discuss" },
  { label: "Let's Connect", href: "#contact", emphasize: true },
];

export const availabilityBadge = "Open to opportunities & freelance collaborations";

export const hero = {
  intro: "HI, I'M DS MESHIL MARING",
  headline: "Engineering ideas into reality.",
  role: "Full-Stack Developer & AI Application Engineer",
  description:
    "I design and develop scalable web applications, secure backend systems, and intelligent AI solutions — turning complex problems into reliable digital products.",
  primaryCta: { label: "View My Projects", href: "#work" },
  secondaryCta: { label: "Work With Me", href: "#contact" },
};

// Contact links shown on the BACK face of the hero code card (flip on click).
// `brand` keys into the brand-logo registry (components/ui/BrandIcons.tsx).
// TODO(owner): replace hrefs with verified URLs before launch.
export const heroContact = {
  title: "Let's connect",
  hint: "Ready to build",
  links: [
    { label: "GitHub", brand: "github", href: "https://github.com/meshil-maring" },
    { label: "LinkedIn", brand: "linkedin", href: "https://linkedin.com/in/your-handle" },
    { label: "Instagram", brand: "instagram", href: "https://instagram.com/your-handle" },
    { label: "WhatsApp", brand: "whatsapp", href: "https://wa.me/0000000000" },
  ],
} as const;


export const about = {
  body: "I'm a Computer Science Engineering student specializing in Data Science and Machine Learning, with hands-on experience building full-stack applications, backend systems, and AI-powered solutions. I enjoy solving practical problems, creating scalable architectures, and turning ambitious ideas into dependable products.",
  // Floating command card shown beside the intro
  // (components/ui/TypingSearchCard.tsx) — messages type in a loop; each
  // message swap fades the card out/in and the upcoming lines below shift.
  command: {
    label: "I know how to",
    status: "Building ideas into software",
    messages: [
      "Build full-stack applications",
      "Develop secure REST APIs",
      "Create AI-powered assistants",
      "Design scalable databases",
      "Automate business workflows",
    ],
    suggestions: [
      "Ship a secure REST API",
      "Build an AI-powered assistant",
      "Automate a business workflow",
    ],
  },
  education: {
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "Quest Group of Institutions, Punjab",
    specialization: "Data Science and Machine Learning",
    areas: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Machine Learning",
      "Statistics",
      "Computer Vision",
      "Linear Algebra",
    ],
  },
};

export const contact = {
  heading: "Let's build something great.",
  description:
    "Whether you're hiring a software engineer or planning your next digital product, I'd be happy to connect and discuss how we can work together.",
  primaryCta: { label: "Discuss a Project", href: "#discuss" },
  secondaryCta: { label: "Recruitment Inquiry", href: "#recruitment" },
};

// Recruitment Inquiry section (id #recruitment). Client-side only mailto form.
export const recruitment = {
  description:
    "Hiring for a full-stack, backend, or AI engineering role? Share the details and I'll get back with my resume, availability, and next steps — no obligation.",
  checklistTitle: "What helps me reply faster",
  checklist: [
    "Role title and seniority level",
    "Company and team size",
    "Tech stack and responsibilities",
    "Timeline, location / remote policy",
    "Compensation range (optional)",
  ],
  roles: [
    "Full-Stack Developer",
    "Backend Engineer",
    "AI / ML Engineer",
    "Frontend Developer",
    "Internship",
    "Freelance / Contract",
    "Other",
  ],
  submitLabel: "Send recruitment inquiry",
  email: "hello@example.com",
};

// "Discuss a Project" section (id #discuss, sits directly above Contact).
// The form is client-side only: it composes a prefilled mailto: — nothing is
// stored or POSTed (static site, no backend). TODO(owner): swap hrefs to a
// verified address before launch (same placeholder as `contact`/`socials`).
export const discuss = {
  description:
    "Planning a web app, an AI feature, a backend, or a full product? Share a few details and I'll reply with honest feedback, questions, and a suggested next step — no obligation.",
  checklistTitle: "What helps me reply faster",
  checklist: [
    "What you're building and who it's for",
    "The key features or the problem to solve",
    "Timeline and rough budget range",
    "Links to references, specs, or existing code",
  ],
  projectTypes: [
    "Full-Stack Web Application",
    "AI / RAG Solution",
    "Backend & APIs",
    "Dashboard & CMS",
    "Something else",
  ],
  submitLabel: "Send inquiry",
  email: "hello@example.com",
};
