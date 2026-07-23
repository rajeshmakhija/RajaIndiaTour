import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "rjt_blog_admin";

function secret(): string | null {
  const value = process.env.BLOG_ADMIN_PASSWORD;
  return value && value.length >= 8 ? value : null;
}

/** Constant-time compare so the password can't be probed by timing. */
function matches(candidate: string, expected: string): boolean {
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Token stored in the cookie — never the password itself. */
export function tokenFor(password: string): string {
  return crypto.createHash("sha256").update(`rjt-blog::${password}`).digest("hex");
}

export function checkPassword(password: string): boolean {
  const expected = secret();
  if (!expected) return false;
  return matches(password, expected);
}

/** True when the current request carries a valid admin session cookie. */
export async function isAuthenticated(): Promise<boolean> {
  const expected = secret();
  if (!expected) return false;
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return matches(token, tokenFor(expected));
}

/** True when BLOG_ADMIN_PASSWORD is configured at all. */
export function isConfigured(): boolean {
  return secret() !== null;
}
