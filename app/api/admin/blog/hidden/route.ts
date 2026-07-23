import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/blog/auth";
import { setHidden } from "@/lib/blog/store";
import { blogPosts } from "@/lib/data/blog";

/** Hide or restore one of the hand-written posts from lib/data/blog.ts. */
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    slug?: string;
    hidden?: boolean;
  };

  if (typeof body.slug !== "string" || !blogPosts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  }

  const hidden = await setHidden(body.slug, body.hidden !== false);

  revalidatePath("/blog");
  revalidatePath(`/blog/${body.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ hidden });
}
