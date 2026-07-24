import fs from "node:fs/promises";
import path from "node:path";
import { del, get, list, put } from "@vercel/blob";
import type { GeneratedPost, PostEdit } from "@/lib/blog/types";

/**
 * Blog post store.
 *
 * - With BLOB_READ_WRITE_TOKEN (Vercel Blob, private store): persistent cloud storage.
 * - Without it (local/dev): content/blog/ on disk.
 *
 * This is the only module that knows *where* posts live.
 */

const FS_DIR = path.join(process.cwd(), "content", "blog");
const FS_HIDDEN = path.join(FS_DIR, "_hidden.json");

const BLOB_PREFIX = "blog/posts/";
const BLOB_HIDDEN = "blog/_hidden.json";

/** Private Blob store — must match the store access mode in Vercel. */
const BLOB_ACCESS = "private" as const;

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

/** Read JSON from a private blob by pathname (authenticated via token). */
async function readBlobJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: BLOB_ACCESS, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function putBlobJson(pathname: string, body: string): Promise<void> {
  await put(pathname, body, {
    access: BLOB_ACCESS,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/* ---------- list / get ---------- */

export async function listPosts(): Promise<GeneratedPost[]> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 1000 });
    const posts = await Promise.all(
      blobs
        .filter((b) => b.pathname.endsWith(".json") && !b.pathname.includes("/_"))
        .map(async (b) => readBlobJson<GeneratedPost>(b.pathname)),
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
    return readBlobJson<GeneratedPost>(blobPath(slug));
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
    await putBlobJson(blobPath(post.slug), body);
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
    try {
      await del(blobPath(slug));
      return true;
    } catch {
      return false;
    }
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
    const parsed = await readBlobJson<unknown>(BLOB_HIDDEN);
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
    await putBlobJson(BLOB_HIDDEN, body);
    return next;
  }

  const ok = await ensureFsDir();
  if (!ok) throw new Error(storageHint());
  await fs.writeFile(FS_HIDDEN, body, "utf8");
  return next;
}
