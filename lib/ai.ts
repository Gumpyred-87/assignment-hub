import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const MODEL = "claude-sonnet-5-5" as const;

export const SYSTEM_PROMPT =
  "You are an expert academic writing tutor. Produce clear, well-structured, accurate content for the requested subject, level and citation style. Follow the user's rubric and sample structure. Explain concepts clearly. Never fabricate sources, quotes or statistics; if unsure, say so and flag it for verification. Write original content, and encourage the student to review, understand and personalize the work.";

export const VERIFY_TAG = "[verify before use]";

export function wrapUserPrompt(prompt: string) {
  return `${prompt}\n\nMark any source, quote or statistic you are not 100% certain about with "${VERIFY_TAG}". Never invent citations.`;
}