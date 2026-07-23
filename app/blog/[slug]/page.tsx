import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { getAllPosts, getPublicPostBySlug } from "@/lib/blog/posts";
import { Button } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="border-b border-cream-dark bg-white px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
        >
          <ArrowLeft size={14} />
          Retour au blog
        </Link>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
          {post.category}
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime} de lecture
          </span>
        </div>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="768px"
            priority
          />
        </div>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-cream-dark bg-white p-6 text-center shadow-sm">
          <p className="font-display text-xl font-bold text-ink">
            Prêt à organiser votre voyage ?
          </p>
          <p className="mt-2 text-sm text-muted">
            Raja prépare votre circuit sur mesure — devis gratuit sous 24h.
          </p>
          <Button href="/contact" variant="primary" className="mt-4">
            Demander un devis
          </Button>
        </div>
      </div>
    </article>
  );
}
