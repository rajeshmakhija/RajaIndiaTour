import { GoogleGenAI } from "@google/genai";
import {
  CATEGORIES,
  FIELD_DOCS,
  IMAGE_CHOICES,
  buildInstruction,
  buildSystemPrompt,
} from "@/lib/blog/prompt";

/**
 * Free-tier eligible. Override with GEMINI_MODEL if needed.
 * Verified callable with this project's key on 2026-07-22;
 * gemini-2.5-flash is closed to new keys, so don't fall back to it.
 */
export const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

/**
 * JSON Schema restricted to the subset Gemini's responseJsonSchema supports:
 * type, description, enum, items, properties, required.
 */
const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    slug: { type: "string", description: FIELD_DOCS.slug },
    title: { type: "string", description: FIELD_DOCS.title },
    excerpt: { type: "string", description: FIELD_DOCS.excerpt },
    category: { type: "string", enum: CATEGORIES, description: FIELD_DOCS.category },
    readTime: { type: "string", description: FIELD_DOCS.readTime },
    image: { type: "string", enum: IMAGE_CHOICES, description: FIELD_DOCS.image },
    content: {
      type: "array",
      items: { type: "string" },
      description: FIELD_DOCS.content,
    },
  },
  required: ["slug", "title", "excerpt", "category", "readTime", "image", "content"],
};

export function geminiModel(): string {
  return process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
}

/** Ask Gemini for an article. Returns the raw parsed object. */
export async function generateWithGemini(
  topic: string,
  category?: string
): Promise<Record<string, unknown>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY manquante. Créez une clé gratuite sur https://aistudio.google.com/apikey puis ajoutez-la dans .env.local."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: geminiModel(),
    contents: buildInstruction(topic, category),
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: "application/json",
      responseJsonSchema: ARTICLE_SCHEMA,
      maxOutputTokens: 8000,
      temperature: 0.8,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini n'a renvoyé aucun contenu. Réessayez.");
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("shape");
    }
    return parsed as Record<string, unknown>;
  } catch {
    throw new Error("Réponse de Gemini illisible (JSON invalide). Réessayez.");
  }
}
