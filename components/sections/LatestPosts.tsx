import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { PostCard } from "@/components/blog/PostCard";
import { getLatestPosts } from "@/lib/blog/posts";

export async function LatestPosts() {
  const posts = await getLatestPosts(3);
  if (!posts.length) return null;
  return (
    <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog"
          title="Conseils pour préparer votre voyage"
          subtitle="Itinéraires, saisons, budget : les derniers articles de Raja pour bien préparer votre voyage en Inde."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline">
            Tous les articles
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
