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

export const about = {
  body: "I'm a Computer Science Engineering student specializing in Data Science and Machine Learning, with hands-on experience building full-stack applications, backend systems, and AI-powered solutions. I enjoy solving practical problems, creating scalable architectures, and turning ambitious ideas into dependable products.",
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
  primaryCta: { label: "Discuss a Project", href: "mailto:hello@example.com" },
  secondaryCta: { label: "Recruitment Inquiry", href: "mailto:hello@example.com" },
};
