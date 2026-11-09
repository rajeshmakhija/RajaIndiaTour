import { GoogleGenAI } from "@google/genai";
import {
  CATEGORIES,
  FIELD_DOCS,
  IMAGE_CHOICES,
  buildInstruction,
  buildSystemPrompt,
} from "@/lib/blog/prompt";

/** Prefer a currently reliable Flash model; override with GEMINI_MODEL. */
export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

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

/** Models are tried in order; the fallback list can be configured per environment. */
export function geminiModels(): string[] {
  return [...new Set([
    geminiModel(),
    ...(process.env.GEMINI_FALLBACK_MODELS || "gemini-3.8-flash,gemini-3.6-flash")
      .split(",")
      .map((model) => model.trim())
      .filter(Boolean),
  ])];
}

export interface GeminiResult {
  content: Record<string, unknown>;
  model: string;
}

function createClient(apiKey: string): GoogleGenAI {
  // Only force Vertex Express when explicitly requested.
  // Many AQ.* AI Studio keys still authenticate against the Developer API.
  const useVertex =
    process.env.GEMINI_VERTEX === "1" || process.env.GEMINI_VERTEX === "true";
  return new GoogleGenAI(useVertex ? { apiKey, vertexai: true } : { apiKey });
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function isRetryable(message: string): boolean {
  return /UNAVAILABLE|high demand|429|RESOURCE_EXHAUSTED|timed out|503/i.test(message);
}

function isFatalAuth(message: string): boolean {
  return /API_KEY_INVALID|invalid api key|401|UNAUTHENTICATED|ACCESS_TOKEN_TYPE_UNSUPPORTED|API_KEY_SERVICE_BLOCKED/i.test(
    message,
  );
}

async function generateJson(
  contents: string,
  systemInstruction: string,
  responseJsonSchema: object,
  maxOutputTokens: number,
  isValid: (value: Record<string, unknown>) => boolean,
): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY manquante.");

  const ai = createClient(apiKey);
  const failures: string[] = [];
  const timeoutMs = Number(process.env.GEMINI_TIMEOUT_MS || 90000);

  for (const model of geminiModels()) {
    let attemptError = "";
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              responseJsonSchema,
              maxOutputTokens,
              temperature: 0.8,
            },
          }),
          timeoutMs,
          model,
        );
        if (!response.text) throw new Error("réponse vide");
        const parsed: unknown = JSON.parse(response.text);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
          throw new Error("JSON invalide");
        }
        const content = parsed as Record<string, unknown>;
        if (!isValid(content)) throw new Error("contenu inexploitable");
        return { content, model };
      } catch (error) {
        attemptError = error instanceof Error ? error.message : String(error);
        if (isFatalAuth(attemptError)) {
          failures.push(`${model}: ${attemptError}`);
          throw new Error(`Tous les modèles Gemini ont échoué. ${failures.join(" | ")}`);
        }
        if (attempt === 1 && isRetryable(attemptError)) {
          await new Promise((r) => setTimeout(r, 1500 * attempt));
          continue;
        }
        break;
      }
    }
    failures.push(`${model}: ${attemptError}`);
  }
  throw new Error(`Tous les modèles Gemini ont échoué. ${failures.join(" | ")}`);
}

const KEYWORD_SCHEMA = {
  type: "object",
  properties: {
    keyword: { type: "string", description: "Requête de recherche longue traîne en français." },
  },
  required: ["keyword"],
};

/** Pick a useful search query from fresh opportunities, without invented search-volume data. */
export async function chooseKeywordWithGemini(
  candidates: string[],
  existing: string[],
): Promise<string> {
  const result = await generateJson(
    `Choisis UNE requête exactement dans cette liste : ${JSON.stringify(candidates)}.\nSujets déjà traités : ${JSON.stringify(existing)}. Privilégie l'intention de préparer un voyage privé en Inde, la pertinence pour notre agence et un sujet concret. Ne prétends pas connaître les volumes de recherche.`,
    "Tu es un rédacteur SEO francophone. Réponds uniquement avec la requête choisie, copiée exactement depuis la liste.",
    KEYWORD_SCHEMA,
    300,
    (value) => typeof value.keyword === "string" && candidates.includes(value.keyword),
  );
  return result.content.keyword as string;
}

/** Extend the editorial queue after the curated topics have been used. */
export async function proposeKeywordWithGemini(existing: string[], destinations: string[]): Promise<string> {
  const result = await generateJson(
    `Propose UNE nouvelle requête longue traîne en français pour préparer un voyage privé en Inde. Destinations couvertes : ${JSON.stringify(destinations)}. Sujets déjà traités ou refusés : ${JSON.stringify(existing.slice(-100))}. Choisis une question concrète qu'une agence locale peut traiter sans inventer de prix ni de règles administratives. Ne prétends pas connaître les volumes de recherche.`,
    "Tu es un rédacteur SEO francophone. Réponds uniquement avec la requête proposée.",
    KEYWORD_SCHEMA,
    300,
    (value) => typeof value.keyword === "string" && value.keyword.trim().length >= 25
      && value.keyword.trim().length <= 110 && !/[<>]/.test(value.keyword),
  );
  return (result.content.keyword as string).trim();
}

/** Ask Gemini for an article. Returns the raw parsed object. */
export async function generateWithGemini(
  topic: string,
  category?: string
): Promise<GeminiResult> {
  return generateJson(
    buildInstruction(topic, category),
    buildSystemPrompt(),
    ARTICLE_SCHEMA,
    8000,
    (value) => typeof value.title === "string" && value.title.trim().length >= 30 && value.title.trim().length <= 100
      && typeof value.excerpt === "string" && value.excerpt.trim().length >= 80 && value.excerpt.trim().length <= 240
      && typeof value.readTime === "string" && /^\d{1,2} min$/.test(value.readTime.trim())
      && Array.isArray(value.content) && value.content.length >= 7 && value.content.length <= 11 && value.content.every(
        (paragraph) => typeof paragraph === "string" && paragraph.trim().length >= 80 && paragraph.length <= 1200,
      ),
  );
}
