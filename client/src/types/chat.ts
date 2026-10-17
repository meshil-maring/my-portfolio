// AI-assistant chat types — runtime-free, types only.
// See docs/typescript/02-type-conventions.md

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
