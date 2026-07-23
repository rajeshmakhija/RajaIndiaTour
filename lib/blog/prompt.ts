import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/data/blog";
import { destinationPages } from "@/lib/data/destinations";
import { tours } from "@/lib/data/tours";
import type { GeneratedPost } from "@/lib/blog/types";

/**
 * Everything that is the same whichever model writes the article:
 * the brief, the output shape, and the validation of what comes back.
 * Provider modules in ./providers only handle the network call.
 */

/**
 * Images the article may use. Restricted to files that exist in /public and
 * that we have visually verified — the model must not invent a path.
 */
export const IMAGE_CHOICES = [
  "/images/destinations/triangle-dor.jpg",
  "/images/destinations/rajasthan.jpg",
  "/images/destinations/goa.jpg",
  "/images/destinations/varanasi.jpg",
  "/images/destinations/kerala.jpg",
  "/images/destinations/nord.jpg",
  "/images/destinations/sud.jpg",
  "/images/destinations/places/delhi-india-gate.jpg",
  "/images/destinations/places/taj-classic.jpg",
  "/images/destinations/places/taj-reflect.jpg",
  "/images/destinations/places/fatehpur-sikri.jpg",
  "/images/destinations/places/jaipur-amber.jpg",
  "/images/destinations/places/jaipur-hawa.jpg",
  "/images/destinations/places/mehrangarh.jpg",
  "/images/destinations/places/udaipur-city-palace.jpg",
  "/images/destinations/places/varanasi-ghats.jpg",
  "/images/destinations/places/sarnath.jpg",
  "/images/destinations/places/kerala-houseboat.jpg",
  "/images/destinations/places/munnar.jpg",
  "/images/destinations/places/kochi.jpg",
  "/images/destinations/places/meenakshi.jpg",
  "/images/destinations/places/hampi.jpg",
  "/images/destinations/places/tiger.jpg",
  "/images/destinations/places/thiksey.jpg",
  "/images/destinations/places/pangong.jpg",
  "/images/hotels/camping-sand-dunes.jpg",
];

export const CATEGORIES = [
  "Conseils voyage",
  "Budget",
  "Formalités",
  "Destinations",
  "Culture",
  "Gastronomie",
  "Nature & safari",
];

/** Suggestions shown in the admin UI when no topic is supplied. */
export const TOPIC_IDEAS = [
  "Voyager en Inde avec des enfants : ce qu'il faut savoir",
  "Que manger en Inde du Nord sans tomber malade",
  "Comment s'habiller pour visiter temples et mosquées en Inde",
  "Train ou voiture avec chauffeur : comment se déplacer en Inde",
  "Le Rajasthan hors des sentiers battus : cinq étapes méconnues",
  "Assister à un festival indien : Holi, Diwali, Pushkar",
  "Le Kerala en famille : rythme, étapes et conseils",
  "Préparer sa valise pour un voyage au Ladakh",
];

export function buildSystemPrompt(): string {
  const destinations = destinationPages.map((d) => `${d.name} (/destinations/${d.slug})`).join(", ");
  const circuits = tours.map((t) => `${t.title} (/circuits/${t.slug})`).join("; ");
  const existing = blogPosts.map((p) => p.title).join(" | ");

  return `Tu es le rédacteur du blog de ${siteConfig.name}, une agence de voyage locale francophone basée en Inde (${siteConfig.domain}). Tu écris pour des voyageurs français qui préparent un voyage en Inde.

CONTEXTE DE L'AGENCE
- Agence locale, sans intermédiaire, dirigée par Rajesh (« Raja »), guide francophone agréé.
- Les voyages sont des circuits privés sur mesure, avec guide francophone.
- Destinations couvertes : ${destinations}.
- Circuits détaillés existants : ${circuits}.

RÈGLES DE RÉDACTION
1. Écris en français naturel et soigné, à la deuxième personne du pluriel (« vous »). Pas d'anglicismes inutiles.
2. Ton : celui d'un guide expérimenté qui connaît le terrain — concret, chaleureux, jamais racoleur. Pas de superlatifs creux (« incroyable », « magique », « inoubliable » à répétition).
3. N'invente JAMAIS de prix, de tarifs en euros, de notes clients, de témoignages, de numéros de licence ni de statistiques chiffrées. Le site ne publie aucun prix.
4. N'invente pas de noms d'hôtels, de restaurants ou de compagnies précis.
5. Les faits historiques, géographiques et pratiques doivent être exacts. En cas de doute, reste général plutôt que d'inventer un détail.
6. Les informations administratives (visa, vaccins, douane) changent : formule-les prudemment et invite à vérifier la source officielle.
7. Chaque paragraphe est un élément du tableau "content", en texte brut (pas de Markdown, pas de titres, pas de listes à puces).
8. Rédige 7 à 11 paragraphes de 2 à 5 phrases. Le dernier paragraphe invite doucement à demander un devis gratuit à Raja.
9. Ne répète pas un sujet déjà traité : ${existing}.`;
}

/** Field-by-field description of the expected article, shared by both providers. */
export const FIELD_DOCS = {
  slug: "Identifiant URL en minuscules, mots séparés par des tirets, sans accents ni ponctuation. Ex : 'voyager-en-inde-avec-des-enfants'.",
  title: "Titre de l'article en français, 40 à 70 caractères, orienté recherche Google.",
  excerpt: "Résumé d'une à deux phrases (120 à 180 caractères) affiché sur la liste du blog.",
  category: "Catégorie de l'article.",
  readTime: "Temps de lecture estimé, format '6 min'.",
  image: "Chemin de l'image d'illustration, choisi dans la liste et cohérent avec le sujet.",
  content: "Les paragraphes de l'article, en texte brut, dans l'ordre.",
} as const;

export function buildInstruction(topic: string, category?: string): string {
  return [
    `Rédige un article de blog sur le sujet suivant : « ${topic} ».`,
    category ? `Utilise la catégorie « ${category} ».` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/** Guard against a model returning a value outside the allowed set. */
export function pick<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

export interface AssembleContext {
  topic: string;
  category?: string;
  model: string;
  /** Returns true when the slug is already taken. */
  slugTaken: (slug: string) => Promise<boolean>;
}

/**
 * Turn whatever the model returned into a valid draft, replacing anything
 * missing or out-of-range with a safe fallback.
 */
export async function assemblePost(
  raw: Record<string, unknown>,
  ctx: AssembleContext
): Promise<GeneratedPost> {
  const content = Array.isArray(raw.content)
    ? raw.content.filter((p): p is string => typeof p === "string" && p.trim().length > 0)
    : [];
  if (content.length === 0) {
    throw new Error("L'article généré est vide. Réessayez.");
  }

  const title = typeof raw.title === "string" && raw.title.trim() ? raw.title.trim() : ctx.topic;
  let slug = slugify(typeof raw.slug === "string" && raw.slug ? raw.slug : title);
  if (!slug) slug = slugify(`article-${Date.now()}`);

  // Never overwrite an existing draft or published article.
  if (await ctx.slugTaken(slug)) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  const now = new Date();

  return {
    slug,
    title,
    excerpt:
      typeof raw.excerpt === "string" && raw.excerpt.trim()
        ? raw.excerpt.trim()
        : content[0].slice(0, 160),
    date: now.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
    category: pick(raw.category, CATEGORIES, ctx.category ?? "Conseils voyage"),
    readTime: typeof raw.readTime === "string" && raw.readTime.trim() ? raw.readTime.trim() : "6 min",
    image: pick(raw.image, IMAGE_CHOICES, "/images/destinations/nord.jpg"),
    content,
    status: "draft",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    topic: ctx.topic,
    model: ctx.model,
  };
}
