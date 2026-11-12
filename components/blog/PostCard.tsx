import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/data/blog";

/** Blog post card: blog index, related posts and homepage. */
export function PostCard({ post, as: Heading = "h3" }: { post: BlogPost; as?: "h2" | "h3" }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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
        <Heading className="mt-3 font-display text-xl font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-blue transition-colors">
            {post.title}
          </Link>
        </Heading>
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
  );
}
