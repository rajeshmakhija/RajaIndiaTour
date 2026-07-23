import type { BlogPost } from "@/lib/data/blog";

export type PostStatus = "draft" | "published";

/**
 * A blog post drafted by Claude and stored on disk.
 * Extends the public BlogPost shape so published posts can be merged
 * straight into the site's existing blog listing.
 */
export interface GeneratedPost extends BlogPost {
  status: PostStatus;
  /** ISO timestamp of generation */
  createdAt: string;
  /** ISO timestamp of the last human edit */
  updatedAt: string;
  /** Topic prompt the article was generated from */
  topic: string;
  /** Model that produced the first draft */
  model: string;
}

/** Fields a human reviewer is allowed to change before publishing. */
export interface PostEdit {
  title?: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  image?: string;
  content?: string[];
  status?: PostStatus;
}
