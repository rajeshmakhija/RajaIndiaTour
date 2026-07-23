import fs from "node:fs/promises";
import path from "node:path";
import type { GeneratedPost, PostEdit } from "@/lib/blog/types";

/**
 * Filesystem-backed store: one JSON file per post in content/blog/.
 *
 * This is the only module that knows *where* posts live. Swapping to a
 * database (needed on hosts with a read-only filesystem, e.g. Vercel)
 * means reimplementing these five functions and nothing else.
 */
const DIR = path.join(process.cwd(), "content", "blog");

/** Files beginning with "_" hold settings, not articles. */
const HIDDEN_FILE = path.join(DIR, "_hidden.json");

async function ensureDir() {
  await fs.mkdir(DIR, { recursive: true });
}

function fileFor(slug: string) {
  return path.join(DIR, `${slug}.json`);
}

/** Reject anything that could escape the content directory. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 120;
}

export async function listPosts(): Promise<GeneratedPost[]> {
  await ensureDir();
  const files = await fs.readdir(DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
      .map(async (f) => {
        try {
          return JSON.parse(await fs.readFile(path.join(DIR, f), "utf8")) as GeneratedPost;
        } catch {
          return null;
        }
      })
  );
  return posts
    .filter((p): p is GeneratedPost => p !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(slug: string): Promise<GeneratedPost | null> {
  if (!isValidSlug(slug)) return null;
  try {
    return JSON.parse(await fs.readFile(fileFor(slug), "utf8")) as GeneratedPost;
  } catch {
    return null;
  }
}

export async function savePost(post: GeneratedPost): Promise<GeneratedPost> {
  if (!isValidSlug(post.slug)) throw new Error(`Slug invalide : ${post.slug}`);
  await ensureDir();
  await fs.writeFile(fileFor(post.slug), JSON.stringify(post, null, 2), "utf8");
  return post;
}

export async function updatePost(slug: string, edit: PostEdit): Promise<GeneratedPost | null> {
  const existing = await getPost(slug);
  if (!existing) return null;
  const updated: GeneratedPost = {
    ...existing,
    ...edit,
    slug: existing.slug,
    updatedAt: new Date().toISOString(),
  };
  return savePost(updated);
}

export async function deletePost(slug: string): Promise<boolean> {
  if (!isValidSlug(slug)) return false;
  try {
    await fs.unlink(fileFor(slug));
    return true;
  } catch {
    return false;
  }
}

/** Published posts only — what the public blog renders. */
export async function listPublished(): Promise<GeneratedPost[]> {
  return (await listPosts()).filter((p) => p.status === "published");
}

/*
 * The hand-written posts in lib/data/blog.ts are source code, so the admin
 * can't delete their files. Instead it records their slugs here and the
 * public blog skips them — reversible, and the source stays untouched.
 */

export async function getHiddenSlugs(): Promise<string[]> {
  try {
    const parsed = JSON.parse(await fs.readFile(HIDDEN_FILE, "utf8")) as unknown;
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export async function setHidden(slug: string, hidden: boolean): Promise<string[]> {
  if (!isValidSlug(slug)) throw new Error(`Slug invalide : ${slug}`);
  await ensureDir();
  const current = new Set(await getHiddenSlugs());
  if (hidden) current.add(slug);
  else current.delete(slug);
  const next = [...current];
  await fs.writeFile(HIDDEN_FILE, JSON.stringify(next, null, 2), "utf8");
  return next;
}
