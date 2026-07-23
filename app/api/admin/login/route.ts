import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, isConfigured, tokenFor } from "@/lib/blog/auth";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "BLOG_ADMIN_PASSWORD n'est pas configuré sur le serveur." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, tokenFor(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
