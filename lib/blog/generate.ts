import { assemblePost } from "@/lib/blog/prompt";
import { getPost } from "@/lib/blog/store";
import type { GeneratedPost } from "@/lib/blog/types";
import { generateWithGemini, geminiModel } from "@/lib/blog/providers/gemini";
import { generateWithAnthropic, anthropicModel } from "@/lib/blog/providers/anthropic";

export { TOPIC_IDEAS, CATEGORIES } from "@/lib/blog/prompt";

export type Provider = "gemini" | "anthropic";

/**
 * Gemini by default — its free tier costs nothing.
 * Set BLOG_AI_PROVIDER=anthropic to switch to Claude; nothing else changes.
 */
export function activeProvider(): Provider {
  return process.env.BLOG_AI_PROVIDER === "anthropic" ? "anthropic" : "gemini";
}

export function activeModel(): string {
  return activeProvider() === "anthropic" ? anthropicModel() : geminiModel();
}

export interface GenerateOptions {
  topic: string;
  category?: string;
}

/**
 * Ask the configured model for a draft article. Returns an unsaved post with
 * status "draft" — nothing reaches the public site until a human publishes it.
 */
export async function generateDraft(options: GenerateOptions): Promise<GeneratedPost> {
  const provider = activeProvider();
  const raw =
    provider === "anthropic"
      ? await generateWithAnthropic(options.topic, options.category)
      : await generateWithGemini(options.topic, options.category);

  return assemblePost(raw, {
    topic: options.topic,
    category: options.category,
    model: activeModel(),
    slugTaken: async (slug) => (await getPost(slug)) !== null,
  });
}
