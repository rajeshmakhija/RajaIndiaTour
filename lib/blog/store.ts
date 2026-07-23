import fs from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";
import type { GeneratedPost, PostEdit } from "@/lib/blog/types";

/**
 * Blog post store.
 *
 * - With BLOB_READ_WRITE_TOKEN (Vercel Blob): persistent cloud storage — required on Vercel.
 * - Without it (local/dev): content/blog/ on disk.
 *
 * This is the only module that knows *where* posts live.
 */

const FS_DIR = path.join(process.cwd(), "content", "blog");
const FS_HIDDEN = path.join(FS_DIR, "_hidden.json");

const BLOB_PREFIX = "blog/posts/";
const BLOB_HIDDEN = "blog/_hidden.json";

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Reject anything that could escape the content directory. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 120;
}

function blobPath(slug: string) {
  return `${BLOB_PREFIX}${slug}.json`;
}

function fileFor(slug: string) {
  return path.join(FS_DIR, `${slug}.json`);
}

async function ensureFsDir(): Promise<boolean> {
  try {
    await fs.mkdir(FS_DIR, { recursive: true });
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    // Vercel / read-only hosts: cannot create directories under /var/task
    if (code === "ENOENT" || code === "EACCES" || code === "EROFS" || code === "EPERM") {
      return false;
    }
    throw err;
  }
}

function storageHint(): string {
  return (
    "Stockage blog indisponible sur ce serveur. Sur Vercel, créez un Blob Store " +
    "(Storage → Blob) pour obtenir BLOB_READ_WRITE_TOKEN, puis redéployez."
  );
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function findBlobUrl(pathname: string): Promise<string | null> {
  const { blobs } = await list({ prefix: pathname, limit: 10 });
  const exact = blobs.find((b) => b.pathname === pathname);
  return exact?.url ?? blobs[0]?.url ?? null;
}

/* ---------- list / get ---------- */

export async function listPosts(): Promise<GeneratedPost[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
    const posts = await Promise.all(
      blobs
        .filter((b) => b.pathname.endsWith(".json") && !b.pathname.includes("/_"))
        .map(async (b) => fetchJson<GeneratedPost>(b.url)),
    );
    return posts
      .filter((p): p is GeneratedPost => p !== null && typeof p.slug === "string")
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const ok = await ensureFsDir();
  if (!ok) return [];

  try {
    const files = await fs.readdir(FS_DIR);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
        .map(async (f) => {
          try {
            return JSON.parse(await fs.readFile(path.join(FS_DIR, f), "utf8")) as GeneratedPost;
          } catch {
            return null;
          }
        }),
    );
    return posts
      .filter((p): p is GeneratedPost => p !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<GeneratedPost | null> {
  if (!isValidSlug(slug)) return null;

  if (useBlob()) {
    const url = await findBlobUrl(blobPath(slug));
    if (!url) return null;
    return fetchJson<GeneratedPost>(url);
  }

  try {
    return JSON.parse(await fs.readFile(fileFor(slug), "utf8")) as GeneratedPost;
  } catch {
    return null;
  }
}

/* ---------- write / delete ---------- */

export async function savePost(post: GeneratedPost): Promise<GeneratedPost> {
  if (!isValidSlug(post.slug)) throw new Error(`Slug invalide : ${post.slug}`);
  const body = JSON.stringify(post, null, 2);

  if (useBlob()) {
    await put(blobPath(post.slug), body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return post;
  }

  const ok = await ensureFsDir();
  if (!ok) throw new Error(storageHint());
  await fs.writeFile(fileFor(post.slug), body, "utf8");
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

  if (useBlob()) {
    const url = await findBlobUrl(blobPath(slug));
    if (!url) return false;
    await del(url);
    return true;
  }

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

/* ---------- hidden static slugs ---------- */

export async function getHiddenSlugs(): Promise<string[]> {
  if (useBlob()) {
    const url = await findBlobUrl(BLOB_HIDDEN);
    if (!url) return [];
    const parsed = await fetchJson<unknown>(url);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  }

  try {
    const parsed = JSON.parse(await fs.readFile(FS_HIDDEN, "utf8")) as unknown;
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export async function setHidden(slug: string, hidden: boolean): Promise<string[]> {
  if (!isValidSlug(slug)) throw new Error(`Slug invalide : ${slug}`);
  const current = new Set(await getHiddenSlugs());
  if (hidden) current.add(slug);
  else current.delete(slug);
  const next = [...current];
  const body = JSON.stringify(next, null, 2);

  if (useBlob()) {
    await put(BLOB_HIDDEN, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return next;
  }

  const ok = await ensureFsDir();
  if (!ok) throw new Error(storageHint());
  await fs.writeFile(FS_HIDDEN, body, "utf8");
  return next;
}
