import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/blog/auth";
import { generateDraft, TOPIC_IDEAS } from "@/lib/blog/generate";
import { savePost } from "@/lib/blog/store";

/** Generation can take a while — give it room. */
export const maxDuration = 300;

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    topic?: string;
    category?: string;
  };

  const topic =
    typeof body.topic === "string" && body.topic.trim()
      ? body.topic.trim()
      : TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];

  try {
    const draft = await generateDraft({
      topic,
      category: typeof body.category === "string" && body.category ? body.category : undefined,
    });
    await savePost(draft);
    return NextResponse.json({ post: draft });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Échec de la génération.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
