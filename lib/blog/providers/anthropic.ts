import Anthropic from "@anthropic-ai/sdk";
import {
  CATEGORIES,
  FIELD_DOCS,
  IMAGE_CHOICES,
  buildInstruction,
  buildSystemPrompt,
} from "@/lib/blog/prompt";

/** Kept ready for the day the blog moves off the free tier. */
export const DEFAULT_ANTHROPIC_MODEL = "claude-opus-4-8";

const ARTICLE_TOOL: Anthropic.Tool = {
  name: "publier_article",
  description: "Enregistre l'article de blog rédigé.",
  input_schema: {
    type: "object",
    properties: {
      slug: { type: "string", description: FIELD_DOCS.slug },
      title: { type: "string", description: FIELD_DOCS.title },
      excerpt: { type: "string", description: FIELD_DOCS.excerpt },
      category: { type: "string", enum: CATEGORIES, description: FIELD_DOCS.category },
      readTime: { type: "string", description: FIELD_DOCS.readTime },
      image: { type: "string", enum: IMAGE_CHOICES, description: FIELD_DOCS.image },
      content: { type: "array", items: { type: "string" }, description: FIELD_DOCS.content },
    },
    required: ["slug", "title", "excerpt", "category", "readTime", "image", "content"],
  },
};

export function anthropicModel(): string {
  return process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL;
}

/** Ask Claude for an article. Returns the raw tool input. */
export async function generateWithAnthropic(
  topic: string,
  category?: string
): Promise<Record<string, unknown>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY manquante. Ajoutez-la dans .env.local (ou dans les variables d'environnement de l'hébergeur)."
    );
  }

  const client = new Anthropic({ apiKey });

  // Streamed: long articles can exceed the non-streaming request timeout.
  const message = await client.messages
    .stream({
      model: anthropicModel(),
      max_tokens: 8000,
      system: buildSystemPrompt(),
      tools: [ARTICLE_TOOL],
      tool_choice: { type: "tool", name: "publier_article" },
      messages: [{ role: "user", content: `${buildInstruction(topic, category)}\nAppelle l'outil publier_article avec l'article complet.` }],
    })
    .finalMessage();

  const block = message.content.find((c) => c.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    throw new Error("Le modèle n'a pas renvoyé d'article exploitable. Réessayez.");
  }
  return block.input as Record<string, unknown>;
}
