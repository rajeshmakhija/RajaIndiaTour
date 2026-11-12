import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { getAllPosts, getPublicPostBySlug } from "@/lib/blog/posts";
import { Button, JsonLd } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Where a generated post's URL should go once it no longer exists: posts lost
 * while the Blob store was suspended, and duplicates deleted in /admin/blog.
 * Only used while the post is missing, so existing posts always win.
 */
const MISSING_POST_REDIRECTS: Record<string, string> = {
  "preparer-premier-voyage-en-inde-conseils-itineraires": "/guides/premier-voyage-inde",
  "reussir-son-premier-voyage-en-inde": "/guides/premier-voyage-inde",
  "comprendre-la-culture-indienne-guide-voyageur": "/guides/premier-voyage-inde",
  "voyage-rajasthan-et-benares-itineraire": "/circuits/tour-inde-du-nord-16-jours",
  "visa-inde-voyageurs-francais-mode-d-emploi": "/blog/visa-inde-voyageurs-francais",
};

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** ISO date for schema: generated posts carry createdAt; static ones a French "18 octobre 2026". */
function isoDate(post: { date: string; createdAt?: string }): string | undefined {
  if (post.createdAt) return post.createdAt;
  const m = post.date.toLowerCase().match(/^(\d{1,2}) (\S+) (\d{4})$/);
  const month = m ? MONTHS.indexOf(m[2]) + 1 : 0;
  return m && month ? `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}` : undefined;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) {
    if (MISSING_POST_REDIRECTS[slug]) permanentRedirect(MISSING_POST_REDIRECTS[slug]);
    notFound();
  }

  const published = isoDate(post);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.image}`,
    inLanguage: "fr-FR",
    ...(published ? { datePublished: published } : {}),
    author: { "@type": "Person", name: siteConfig.founder.name, jobTitle: siteConfig.founder.title, url: `${siteConfig.url}/a-propos` },
    publisher: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="border-b border-cream-dark bg-white px-4 py-12 md:py-16">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema([["Blog", "/blog"], [post.title, `/blog/${post.slug}`]])} />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
        >
          <ArrowLeft size={14} />
          Retour au blog
        </Link>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          {post.category}
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime} de lecture
          </span>
        </div>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="768px"
            priority
          />
        </div>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        {post.links?.length ? (
          <nav aria-label="Pour aller plus loin" className="mt-10 border-t border-cream-dark pt-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-blue">Pour aller plus loin</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {post.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium text-ink underline decoration-brand-blue/40 underline-offset-4 hover:text-brand-blue">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="mt-10 rounded-xl border border-cream-dark bg-white p-6 text-center shadow-sm">
          <p className="font-display text-xl font-bold text-ink">
            Prêt à organiser votre voyage ?
          </p>
          <p className="mt-2 text-sm text-muted">
            Raja prépare votre circuit sur mesure — devis gratuit sous 24h.
          </p>
          <Button href="/contact" variant="primary" className="mt-4">
            Demander un devis
          </Button>
        </div>
      </div>
    </article>
  );
}
