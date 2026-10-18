import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllDestinationSlugs } from "@/lib/data/destinations";
import { getAllTourSlugs } from "@/lib/data/tours";
import { getAllGuideSlugs } from "@/lib/data/guides";

/** Newly published blog posts must reach the sitemap without a rebuild. */
export const revalidate = 86400;

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getAllPosts();
  const base = siteConfig.url;
  const now = new Date();

  const entries: Entry[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/destinations", changeFrequency: "weekly", priority: 0.9 },
    { path: "/circuits", changeFrequency: "weekly", priority: 0.9 },
    { path: "/creer-mon-itineraire", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
    { path: "/a-propos", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/guides", changeFrequency: "monthly", priority: 0.85 },
    ...getAllDestinationSlugs().map((slug) => ({
      path: `/destinations/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...getAllTourSlugs().map((slug) => ({
      path: `/circuits/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllGuideSlugs().map((slug) => ({
      path: `/guides/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries.map(({ path, changeFrequency, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
