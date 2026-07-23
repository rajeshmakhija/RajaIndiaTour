import { blogPosts, type BlogPost } from "@/lib/data/blog";
import { getHiddenSlugs, listPublished } from "@/lib/blog/store";

/**
 * Everything the public blog shows: the hand-written posts in
 * lib/data/blog.ts (minus any hidden from the admin) plus every
 * AI-drafted post a human has published. Newest generated first.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  let generated: BlogPost[] = [];
  let hidden: string[] = [];
  try {
    [generated, hidden] = await Promise.all([listPublished(), getHiddenSlugs()]);
  } catch {
    // Read-only or missing content dir: fall back to the static posts.
    generated = [];
    hidden = [];
  }
  const hiddenSet = new Set(hidden);
  const staticSlugs = new Set(blogPosts.map((p) => p.slug));
  return [
    ...generated.filter((p) => !staticSlugs.has(p.slug)),
    ...blogPosts.filter((p) => !hiddenSet.has(p.slug)),
  ];
}

export async function getPublicPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}
