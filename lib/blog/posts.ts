import { unstable_cache } from "next/cache";
import { blogPosts, type BlogPost } from "@/lib/data/blog";
import { BLOG_CACHE_TAG, getHiddenSlugs, listPublished } from "@/lib/blog/store";

/**
 * One Blob list+read per day (or per write, via BLOG_CACHE_TAG) instead of per
 * render — uncached reads exhausted the Hobby Blob quota and got the store suspended.
 */
const readBlogBlobs = unstable_cache(
  () => Promise.all([listPublished(), getHiddenSlugs()]),
  ["blog-blobs"],
  { revalidate: 86400, tags: [BLOG_CACHE_TAG] },
);

/**
 * Everything the public blog shows: the hand-written posts in
 * lib/data/blog.ts (minus any hidden from the admin) plus every
 * AI-drafted post a human has published. Newest generated first.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  let generated: BlogPost[] = [];
  let hidden: string[] = [];
  try {
    [generated, hidden] = await readBlogBlobs();
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

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** ISO date: generated posts carry createdAt; static ones a French "18 octobre 2026". */
export function postIsoDate(post: BlogPost & { createdAt?: string }): string | undefined {
  if (post.createdAt) return post.createdAt;
  const m = post.date.toLowerCase().match(/^(\d{1,2}) (\S+) (\d{4})$/);
  const month = m ? MONTHS.indexOf(m[2]) + 1 : 0;
  return m && month ? `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}` : undefined;
}

export async function getLatestPosts(count: number): Promise<BlogPost[]> {
  return (await getAllPosts())
    .slice()
    .sort((a, b) => (postIsoDate(b) ?? "").localeCompare(postIsoDate(a) ?? ""))
    .slice(0, count);
}

/** Same category first, then most shared title words; excludes the post itself. */
export async function getRelatedPosts(post: BlogPost, count: number): Promise<BlogPost[]> {
  const words = (text: string) => new Set(text.toLowerCase().split(/[^a-zà-ÿ]+/).filter((w) => w.length > 3));
  const mine = words(post.title);
  const score = (other: BlogPost) =>
    (other.category === post.category ? 10 : 0) + [...words(other.title)].filter((w) => mine.has(w)).length;
  return (await getAllPosts())
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count);
}
