import { createMetadata } from "@/lib/seo/metadata";
import { SectionHeading } from "@/components/ui";
import { getAllPosts } from "@/lib/blog/posts";
import { PostCard } from "@/components/blog/PostCard";

export const metadata = createMetadata({
  title: "Blog voyage en Inde",
  description:
    "Conseils, guides et astuces pour préparer votre voyage en Inde. Visa, budget, meilleures saisons et destinations par Raja India Tour.",
  path: "/blog",
});

/** Re-read published AI posts without waiting for a rebuild. */
export const revalidate = 86400;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="border-b border-cream-dark bg-white px-4 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading as="h1"
          eyebrow="Blog"
          title="Conseils & guides pour voyager en Inde"
          subtitle="Visa, budget, saisons, destinations — tout pour préparer votre circuit sur mesure avec Raja."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} as="h2" />
          ))}
        </div>
      </div>
    </div>
  );
}
