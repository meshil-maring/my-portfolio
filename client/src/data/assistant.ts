// UI copy for the floating AI assistant
// (components/ui/ChatWidget.tsx — proposal 2026-10-16-floating-ai-assistant).
// Strings only; rendering happens in the components.
export const assistant = {
  launcherLabel: "Ask the AI assistant",
  closeLabel: "Close the AI assistant",
  panelTitle: "Ask about Meshil",
  panelSubtitle: "AI answers sourced from this portfolio",
  greeting:
    "Hi! I'm Meshil's AI assistant. Ask me about his projects, skills, services, or availability.",
  suggestions: [
    "What projects has he built?",
    "What services does he offer?",
    "Is he open to freelance work?",
  ],
  placeholder: "Ask about projects, skills, availability…",
  sendLabel: "Send message",
  stopLabel: "Stop generating",
  thinking: "Thinking…",
  errorMessage: "Something went wrong — please try again in a moment.",
  rateLimitedMessage: "Too many messages right now — wait a moment and retry.",
  notConfiguredMessage:
    "The assistant isn't configured yet — set AI_API_KEY (standalone mode) or LLM_API_KEY on the backend (hosted mode) in your deployment environment.",
  fullscreenLabel: "Expand to full screen",
  exitFullscreenLabel: "Exit full screen",
} as const;
