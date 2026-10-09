import { blogPosts } from "@/lib/data/blog";
import { destinationPages } from "@/lib/data/destinations";
import { TOPIC_IDEAS, slugify } from "@/lib/blog/prompt";
import { chooseKeywordWithGemini, proposeKeywordWithGemini } from "@/lib/blog/providers/gemini";
import type { GeneratedPost } from "@/lib/blog/types";

const queries = [
  ...TOPIC_IDEAS,
  ...destinationPages.flatMap((destination) => {
    const place = ({
      nord: "en Inde du Nord",
      sud: "en Inde du Sud",
      goa: "à Goa",
      varanasi: "à Varanasi",
      "triangle-dor": "dans le Triangle d'Or",
    } as Record<string, string>)[destination.slug] || `au ${destination.name}`;
    return [
      `Voyage ${place} : quand partir ?`,
      `Que voir ${place} lors d'un premier voyage ?`,
      `Comment organiser un circuit privé ${place} ?`,
      `Combien de jours prévoir ${place} ?`,
      `Voyager en famille ${place} : itinéraire et conseils`,
    ];
  }),
];

function tokens(value: string): Set<string> {
  return new Set(slugify(value).split("-").filter((word) => word.length > 2));
}

function tooSimilar(candidate: string, existing: string): boolean {
  if (slugify(candidate) === slugify(existing)) return true;
  const a = tokens(candidate);
  const b = tokens(existing);
  if (!a.size || !b.size) return false;
  const common = [...a].filter((word) => b.has(word)).length;
  return common / Math.min(a.size, b.size) >= 0.8;
}

/** Select an unused, relevant long-tail query; Gemini ranks available options. */
export async function chooseBlogKeyword(posts: GeneratedPost[]): Promise<string> {
  const existing = [
    ...blogPosts.map((post) => post.title),
    ...posts.flatMap((post) => [post.topic, post.title]),
  ];
  const available = [...new Set(queries)].filter(
    (candidate) => !existing.some((used) => tooSimilar(candidate, used)),
  );
  if (!available.length) {
    const rejected = [...existing];
    for (let attempt = 0; attempt < 3; attempt++) {
      const proposed = await proposeKeywordWithGemini(rejected, destinationPages.map((place) => place.name));
      if (!existing.some((used) => tooSimilar(proposed, used))) return proposed;
      rejected.push(proposed);
    }
    throw new Error("Gemini n'a pas trouvé de nouveau mot-clé distinct.");
  }

  // Keep the model prompt bounded as the archive grows. Rotate across topics by
  // moving past already used candidates, and retain a deterministic fallback.
  const shortlist = available.slice(0, 30);
  try {
    return await chooseKeywordWithGemini(shortlist, existing.slice(-60));
  } catch (error) {
    console.warn("Keyword selection failed; using the first unused topic.", error);
    return shortlist[0];
  }
}
