import { siteConfig } from "@/lib/site";
import { tours } from "@/lib/data/tours";
import { destinationPages } from "@/lib/data/destinations";
import { travelGuides } from "@/lib/data/guides";
import { getAllPosts } from "@/lib/blog/posts";
import { landings } from "@/lib/data/landings";

export const revalidate = 86400;

/** llms.txt (llmstxt.org): a plain summary of the site for AI assistants. */
export async function GET() {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const posts = await getAllPosts();

  const body = `# ${siteConfig.name}

> Agence de voyage locale basée en Inde, pour voyageurs francophones. Circuits privés sur mesure avec chauffeur et guide francophone, sans intermédiaire. Fondée et dirigée par ${siteConfig.founder.name}, guide agréé par le ministère du Tourisme indien (${siteConfig.founder.experience} d'expérience).

- Langues : français, anglais
- Contact : ${siteConfig.email} · WhatsApp ${siteConfig.phoneTel}
- Devis gratuit et itinéraire personnalisé : ${url("/creer-mon-itineraire")}

## Types de voyage
${landings.map((l) => `- [${l.title}](${url(`/voyages/${l.slug}`)}): ${l.description}`).join("\n")}

## Circuits
${tours.map((t) => `- [${t.title}](${url(`/circuits/${t.slug}`)}): ${t.facts.duration}`).join("\n")}

## Destinations
${destinationPages.map((d) => `- [${d.name}](${url(`/destinations/${d.slug}`)}): ${d.tagline}`).join("\n")}

## Guides pratiques
${travelGuides.map((g) => `- [${g.title}](${url(`/guides/${g.slug}`)}): ${g.description}`).join("\n")}

## Blog
${posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.excerpt}`).join("\n")}

## Avis de voyageurs
- [Fil « Agence Raja India Tour en Inde » sur le forum du Routard](${siteConfig.reviewLinks.routard})${siteConfig.reviewLinks.tripadvisor ? `\n- [Avis Tripadvisor](${siteConfig.reviewLinks.tripadvisor})` : ""}

## À propos
- [Qui sommes-nous](${url("/a-propos")})
- [Contact](${url("/contact")})
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
