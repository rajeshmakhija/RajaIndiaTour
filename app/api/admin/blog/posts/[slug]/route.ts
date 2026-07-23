import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/blog/auth";
import { deletePost, getPost, updatePost } from "@/lib/blog/store";
import type { PostEdit } from "@/lib/blog/types";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return NextResponse.json({ error: "Article introuvable." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { slug } = await params;
  const body = (await request.json().catch(() => ({}))) as PostEdit;

  const edit: PostEdit = {};
  if (typeof body.title === "string") edit.title = body.title;
  if (typeof body.excerpt === "string") edit.excerpt = body.excerpt;
  if (typeof body.category === "string") edit.category = body.category;
  if (typeof body.readTime === "string") edit.readTime = body.readTime;
  if (typeof body.image === "string") edit.image = body.image;
  if (Array.isArray(body.content)) {
    edit.content = body.content.filter(
      (p): p is string => typeof p === "string" && p.trim().length > 0
    );
  }
  if (body.status === "draft" || body.status === "published") edit.status = body.status;

  const post = await updatePost(slug, edit);
  if (!post) return NextResponse.json({ error: "Article introuvable." }, { status: 404 });

  // Push the change to the live blog without waiting for a rebuild.
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const { slug } = await params;
  const removed = await deletePost(slug);
  if (!removed) return NextResponse.json({ error: "Article introuvable." }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
