import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { generateDraft } from "@/lib/blog/generate";
import { chooseBlogKeyword } from "@/lib/blog/keywords";
import { claimPublicationDay, listPosts, savePost } from "@/lib/blog/store";

export const maxDuration = 300;

const DAY_MS = 24 * 60 * 60 * 1000;
const PUBLISH_HOUR_UTC = 7;

function nextPublicationTime(lastPublished: number): number {
  return (Math.floor(lastPublished / DAY_MS) + 3) * DAY_MS + PUBLISH_HOUR_UTC * 60 * 60 * 1000;
}

/** Vercel Cron calls GET daily; the persisted publication date enforces the cadence. */
async function handle(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "CRON_SECRET non configuré." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN non configuré." }, { status: 503 });
  }

  try {
    const posts = await listPosts();
    const lastPublished = posts
      .map((post) => Date.parse(post.autoPublishedAt || ""))
      .filter(Number.isFinite)
      .reduce((latest, time) => Math.max(latest, time), 0);
    const nextAt = nextPublicationTime(lastPublished);
    if (lastPublished && Date.now() < nextAt) {
      return NextResponse.json({ skipped: true, reason: "Trois jours calendaires non écoulés.", nextAt: new Date(nextAt).toISOString() });
    }

    const releaseClaim = await claimPublicationDay(new Date().toISOString().slice(0, 10));
    if (!releaseClaim) {
      return NextResponse.json({ skipped: true, reason: "Publication déjà en cours ou effectuée aujourd'hui." });
    }
    let published = false;
    try {
      const keyword = await chooseBlogKeyword(posts);
      const post = await generateDraft({ topic: keyword });
      post.status = "published";
      post.autoPublishedAt = new Date().toISOString();
      post.updatedAt = post.autoPublishedAt;
      await savePost(post);
      published = true;
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
      revalidatePath("/sitemap.xml");
      return NextResponse.json({ published: post.slug, keyword, model: post.model, nextAt: new Date(nextPublicationTime(Date.parse(post.autoPublishedAt))).toISOString() });
    } finally {
      if (!published) await releaseClaim();
    }
  } catch (error) {
    console.error("Automatic blog publication failed", error);
    return NextResponse.json({ error: "Publication automatique échouée. Consultez les journaux du serveur." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return handle(request);
}

export async function GET(request: Request) {
  return handle(request);
}
