import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/blog/auth";
import { listPosts } from "@/lib/blog/store";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  return NextResponse.json({ posts: await listPosts() });
}
