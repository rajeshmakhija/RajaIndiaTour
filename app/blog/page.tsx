import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { SectionHeading } from "@/components/ui";
import { getAllPosts } from "@/lib/blog/posts";

export const metadata = createMetadata({
  title: "Blog voyage en Inde",
  description:
    "Conseils, guides et astuces pour préparer votre voyage en Inde. Visa, budget, meilleures saisons et destinations par Raja India Tour.",
  path: "/blog",
});

/** Re-read published AI posts without waiting for a rebuild. */
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="border-b border-cream-dark bg-white px-4 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog"
          title="Conseils & guides pour voyager en Inde"
          subtitle="Visa, budget, saisons, destinations — tout pour préparer votre circuit sur mesure avec Raja."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-brand-blue px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-blue transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
                >
                  Lire l&apos;article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
