import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { routardReviews } from "@/lib/data/content";
import { siteConfig } from "@/lib/site";

// Only real reviews (linked to an actual Routard thread); placeholders stay hidden.
const realReviews = routardReviews.filter((review) => review.url !== "https://www.routard.com/");

const linkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-brand-blue px-5 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white";

export function RoutardReviews() {
  if (!realReviews.length) {
    return (
      <section id="avis-routard" className="border-b border-cream-dark bg-white py-12 px-4 md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">Avis indépendants</p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Lisez ce que nos voyageurs disent de nous
            </h2>
            <p className="mt-2 text-sm text-muted">
              Témoignages publiés par des voyageurs sur le forum du Routard et sur Tripadvisor.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={siteConfig.reviewLinks.routard} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Forum Routard <ExternalLink size={14} />
            </a>
            <a href={siteConfig.reviewLinks.tripadvisor} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Tripadvisor <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="avis-routard" className="border-b border-cream-dark bg-white py-12 px-4 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Avis vérifiés
            </p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Ce que disent les voyageurs sur Routard.com
            </h2>
          </div>
          <a
            href="https://www.routard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
            aria-label="Routard.com"
          >
            <Image
              src="/images/routard-logo.png"
              alt="Routard.com"
              width={200}
              height={56}
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {realReviews.map((review, i) => (
            <article
              key={`${review.author}-${i}`}
              className="flex flex-col rounded-xl border border-cream-dark bg-white p-5 shadow-sm"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-brand-red text-brand-red" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-4 flex items-center justify-between gap-2 border-t border-cream-dark pt-4 text-xs">
                <span className="font-semibold text-ink">{review.author}</span>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-brand-blue hover:underline"
                >
                  Voir sur Routard
                  <ExternalLink size={12} />
                </a>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
