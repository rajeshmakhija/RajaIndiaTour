import { NextResponse } from "next/server";
import { generateDraft, TOPIC_IDEAS } from "@/lib/blog/generate";
import { listPosts, savePost } from "@/lib/blog/store";

export const maxDuration = 300;

/**
 * Scheduled draft generation.
 *
 * Call it from Vercel Cron, a GitHub Action, or a cPanel cron job:
 *   curl -X POST https://rajaindiatour.fr/api/cron/blog \
 *        -H "Authorization: Bearer $CRON_SECRET"
 *
 * It only ever creates DRAFTS. Nothing appears on the public blog until
 * someone approves it in /admin/blog — that is the human in the loop.
 */
async function handle(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET non configuré." }, { status: 503 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  // Don't pile up unreviewed drafts.
  const posts = await listPosts();
  const pending = posts.filter((p) => p.status === "draft").length;
  if (pending >= 5) {
    return NextResponse.json({ skipped: true, reason: `${pending} brouillons en attente.` });
  }

  // Pick a topic that hasn't been used yet.
  const used = new Set(posts.map((p) => p.topic));
  const available = TOPIC_IDEAS.filter((t) => !used.has(t));
  const topic =
    available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];

  try {
    const draft = await generateDraft({ topic });
    await savePost(draft);
    return NextResponse.json({ created: draft.slug, topic });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Échec de la génération.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return handle(request);
}

/** Vercel Cron issues GET requests. */
export async function GET(request: Request) {
  return handle(request);
}
