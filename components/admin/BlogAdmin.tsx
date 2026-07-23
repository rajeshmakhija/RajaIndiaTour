"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Trash2,
  Check,
  Undo2,
  Loader2,
  ExternalLink,
  Save,
  LogOut,
  EyeOff,
  Eye,
} from "lucide-react";
import type { GeneratedPost, PostEdit } from "@/lib/blog/types";

export interface StaticPostSummary {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

interface Props {
  initialPosts: GeneratedPost[];
  topicIdeas: string[];
  staticPosts: StaticPostSummary[];
  initialHidden: string[];
}

export function BlogAdmin({ initialPosts, topicIdeas, staticPosts, initialHidden }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [hidden, setHidden] = useState<string[]>(initialHidden);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  async function generate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() || undefined }),
      });
      const data = (await res.json()) as { post?: GeneratedPost; error?: string };
      if (!res.ok || !data.post) {
        setError(data.error ?? "Échec de la génération.");
        return;
      }
      setPosts((prev) => [data.post as GeneratedPost, ...prev]);
      setOpenSlug(data.post.slug);
      setTopic("");
      router.refresh();
    } catch {
      setError("Échec de la génération.");
    } finally {
      setGenerating(false);
    }
  }

  async function patch(slug: string, edit: PostEdit) {
    const res = await fetch(`/api/admin/blog/posts/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(edit),
    });
    const data = (await res.json()) as { post?: GeneratedPost; error?: string };
    if (!res.ok || !data.post) {
      setError(data.error ?? "Enregistrement impossible.");
      return null;
    }
    setPosts((prev) => prev.map((p) => (p.slug === slug ? (data.post as GeneratedPost) : p)));
    router.refresh();
    return data.post;
  }

  async function remove(slug: string) {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    const res = await fetch(`/api/admin/blog/posts/${slug}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Suppression impossible.");
      return;
    }
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
    router.refresh();
  }

  async function toggleHidden(slug: string, nextHidden: boolean) {
    if (nextHidden && !confirm("Retirer cet article du site ? Vous pourrez le restaurer ensuite.")) {
      return;
    }
    const res = await fetch("/api/admin/blog/hidden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, hidden: nextHidden }),
    });
    const data = (await res.json()) as { hidden?: string[]; error?: string };
    if (!res.ok || !data.hidden) {
      setError(data.error ?? "Modification impossible.");
      return;
    }
    setHidden(data.hidden);
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    location.reload();
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">Blog — relecture</h1>
            <p className="mt-1.5 text-sm text-muted">
              Les articles sont rédigés par l&apos;IA puis publiés uniquement après votre validation.
            </p>
          </div>
          <button
            onClick={logout}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-cream-dark bg-white px-3 py-2 text-xs font-semibold text-muted hover:text-ink"
          >
            <LogOut size={13} /> Quitter
          </button>
        </div>

        {/* Générateur */}
        <div className="mt-7 rounded-2xl border border-cream-dark bg-white p-5 shadow-sm">
          <label htmlFor="topic" className="text-sm font-bold text-ink">
            Nouvel article
          </label>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sujet de l'article (laisser vide pour une suggestion automatique)"
              className="flex-1 rounded-lg border border-cream-dark px-3.5 py-2.5 text-sm outline-none focus:border-brand-blue"
            />
            <button
              onClick={generate}
              disabled={generating}
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Rédaction…
                </>
              ) : (
                <>
                  <Sparkles size={15} /> Générer
                </>
              )}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {topicIdeas.slice(0, 5).map((idea) => (
              <button
                key={idea}
                onClick={() => setTopic(idea)}
                className="rounded-full border border-cream-dark px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                {idea}
              </button>
            ))}
          </div>

          {error && <p className="mt-3 text-sm font-medium text-brand-red">{error}</p>}
        </div>

        <Section
          title={`Brouillons à relire (${drafts.length})`}
          empty="Aucun brouillon en attente."
          posts={drafts}
          openSlug={openSlug}
          setOpenSlug={setOpenSlug}
          onPatch={patch}
          onRemove={remove}
        />

        <Section
          title={`En ligne (${published.length})`}
          empty="Aucun article publié pour l'instant."
          posts={published}
          openSlug={openSlug}
          setOpenSlug={setOpenSlug}
          onPatch={patch}
          onRemove={remove}
        />

        <section className="mt-9">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-blue">
            Articles d&apos;origine ({staticPosts.length})
          </h2>
          <p className="mb-3 text-xs leading-relaxed text-muted">
            Ces articles font partie du code du site. Ils ne peuvent pas être supprimés
            définitivement depuis ici, mais vous pouvez les retirer du blog public — et les
            remettre à tout moment.
          </p>
          <div className="space-y-2">
            {staticPosts.map((post) => {
              const isHidden = hidden.includes(post.slug);
              return (
                <div
                  key={post.slug}
                  className={`flex items-center gap-3 rounded-xl border border-cream-dark bg-white p-3 shadow-sm ${
                    isHidden ? "opacity-60" : ""
                  }`}
                >
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
                    <Image src={post.image} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-snug text-ink">{post.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {post.category} · {post.readTime}
                      {isHidden && " · retiré du site"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {!isHidden && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg border border-cream-dark p-2 text-muted hover:text-brand-blue"
                        title="Voir en ligne"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}
                    <button
                      onClick={() => toggleHidden(post.slug, !isHidden)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                        isHidden
                          ? "bg-brand-blue text-white"
                          : "border border-cream-dark text-muted hover:text-brand-red"
                      }`}
                    >
                      {isHidden ? (
                        <>
                          <Eye size={13} /> Remettre
                        </>
                      ) : (
                        <>
                          <EyeOff size={13} /> Retirer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  empty: string;
  posts: GeneratedPost[];
  openSlug: string | null;
  setOpenSlug: (s: string | null) => void;
  onPatch: (slug: string, edit: PostEdit) => Promise<GeneratedPost | null>;
  onRemove: (slug: string) => void;
}

function Section({ title, empty, posts, openSlug, setOpenSlug, onPatch, onRemove }: SectionProps) {
  return (
    <section className="mt-9">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-blue">{title}</h2>
      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-cream-dark bg-white/60 px-4 py-6 text-center text-sm text-muted">
          {empty}
        </p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              open={openSlug === post.slug}
              onToggle={() => setOpenSlug(openSlug === post.slug ? null : post.slug)}
              onPatch={onPatch}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface CardProps {
  post: GeneratedPost;
  open: boolean;
  onToggle: () => void;
  onPatch: (slug: string, edit: PostEdit) => Promise<GeneratedPost | null>;
  onRemove: (slug: string) => void;
}

function PostCard({ post, open, onToggle, onPatch, onRemove }: CardProps) {
  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [body, setBody] = useState(post.content.join("\n\n"));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty =
    title !== post.title || excerpt !== post.excerpt || body !== post.content.join("\n\n");

  async function save(alsoPublish: boolean) {
    setSaving(true);
    setSaved(false);
    const edit: PostEdit = {
      title,
      excerpt,
      content: body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean),
    };
    if (alsoPublish) edit.status = "published";
    const updated = await onPatch(post.slug, edit);
    setSaving(false);
    if (updated) setSaved(true);
  }

  return (
    <article className="overflow-hidden rounded-xl border border-cream-dark bg-white shadow-sm">
      <div className="flex items-center gap-3 p-3">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-cream-dark">
          <Image src={post.image} alt="" fill className="object-cover" sizes="80px" />
        </div>
        <button onClick={onToggle} className="flex-1 text-left">
          <p className="text-sm font-bold leading-snug text-ink">{post.title}</p>
          <p className="mt-0.5 text-xs text-muted">
            {post.category} · {post.readTime} · {post.content.length} paragraphes
            {post.status === "published" && " · en ligne"}
          </p>
        </button>

        <div className="flex shrink-0 items-center gap-1.5">
          {post.status === "published" && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="rounded-lg border border-cream-dark p-2 text-muted hover:text-brand-blue"
              title="Voir en ligne"
            >
              <ExternalLink size={14} />
            </Link>
          )}
          {post.status === "draft" ? (
            <button
              onClick={() => save(true)}
              disabled={saving}
              className="flex items-center gap-1.5 rounded-lg bg-brand-blue px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
              title="Publier"
            >
              <Check size={13} /> Publier
            </button>
          ) : (
            <button
              onClick={() => onPatch(post.slug, { status: "draft" })}
              className="flex items-center gap-1.5 rounded-lg border border-cream-dark px-3 py-2 text-xs font-semibold text-muted hover:text-ink"
              title="Retirer du site"
            >
              <Undo2 size={13} /> Retirer
            </button>
          )}
          <button
            onClick={() => onRemove(post.slug)}
            className="flex items-center gap-1.5 rounded-lg border border-cream-dark px-3 py-2 text-xs font-semibold text-muted transition-colors hover:border-brand-red hover:text-brand-red"
            title="Supprimer définitivement"
          >
            <Trash2 size={13} /> Supprimer
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-3 border-t border-cream-dark bg-cream-dark/20 p-4">
          <Field label="Titre">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-cream-dark px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </Field>
          <Field label="Résumé">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full resize-y rounded-lg border border-cream-dark px-3 py-2 text-sm outline-none focus:border-brand-blue"
            />
          </Field>
          <Field label="Contenu (une ligne vide entre chaque paragraphe)">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              className="w-full resize-y rounded-lg border border-cream-dark px-3 py-2 text-sm leading-relaxed outline-none focus:border-brand-blue"
            />
          </Field>

          <div className="flex items-center gap-3">
            <button
              onClick={() => save(false)}
              disabled={saving || !dirty}
              className="flex items-center gap-1.5 rounded-lg border border-cream-dark bg-white px-4 py-2 text-xs font-semibold text-ink disabled:opacity-50"
            >
              <Save size={13} /> {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
            {saved && !dirty && <span className="text-xs font-medium text-green-600">Enregistré</span>}
            <span className="ml-auto text-[11px] text-muted">
              Généré par {post.model} · sujet : {post.topic}
            </span>
          </div>
        </div>
      )}
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
