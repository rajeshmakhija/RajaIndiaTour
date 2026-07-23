import type { Metadata } from "next";
import { isAuthenticated, isConfigured } from "@/lib/blog/auth";
import { getHiddenSlugs, listPosts } from "@/lib/blog/store";
import { TOPIC_IDEAS } from "@/lib/blog/generate";
import { blogPosts } from "@/lib/data/blog";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { BlogAdmin } from "@/components/admin/BlogAdmin";

export const metadata: Metadata = {
  title: "Blog — administration",
  robots: { index: false, follow: false },
};

/** Session-dependent: never prerender. */
export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  if (!isConfigured()) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <h1 className="font-display text-2xl font-bold text-ink">Administration indisponible</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          La variable <code className="rounded bg-cream-dark px-1.5 py-0.5">BLOG_ADMIN_PASSWORD</code>{" "}
          n&apos;est pas définie sur le serveur. Ajoutez-la dans <code>.env.local</code> (8 caractères
          minimum) puis redémarrez l&apos;application.
        </p>
      </div>
    );
  }

  if (!(await isAuthenticated())) {
    return <AdminLogin />;
  }

  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let hiddenSlugs: string[] = [];
  try {
    [posts, hiddenSlugs] = await Promise.all([listPosts(), getHiddenSlugs()]);
  } catch {
    // Storage misconfigured (e.g. Vercel without Blob) — still show the admin UI.
    posts = [];
    hiddenSlugs = [];
  }

  return (
    <BlogAdmin
      initialPosts={posts}
      topicIdeas={TOPIC_IDEAS}
      staticPosts={blogPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        readTime: p.readTime,
        image: p.image,
      }))}
      initialHidden={hiddenSlugs}
    />
  );
}
