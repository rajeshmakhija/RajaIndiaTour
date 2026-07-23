import { Star } from "lucide-react";
import { reviews } from "@/lib/data/content";
import { SectionHeading } from "@/components/ui";

export function Reviews() {
  return (
    <section className="border-b border-cream-dark bg-white py-12 px-4 md:py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Témoignages"
          title="Ce que disent nos voyageurs français"
          subtitle="Avis authentiques de clients ayant voyagé avec Raja."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="rounded-2xl bg-white p-6 shadow-sm border border-cream-dark"
            >
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-red text-brand-red" />
                ))}
              </div>
              <p className="mt-4 text-muted leading-relaxed text-sm">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-4 text-sm">
                <strong className="text-brand-blue">{review.name}</strong>
                <span className="text-muted"> — {review.city} · {review.date}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
