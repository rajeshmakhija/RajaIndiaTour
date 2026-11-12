import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { faqSchema } from "@/lib/seo/schema";

export type FaqItem = { question: string; answer: string };

/** Shared facts true for every India trip from France. */
export const TIME_DIFFERENCE = "+4 h 30 en hiver, +3 h 30 en été (par rapport à la France)";
export const FORMALITIES = "Passeport valide et visa électronique (e-Visa) à demander avant le départ";

export const VISA_FAQ: FaqItem = {
  question: "Faut-il un visa pour ce voyage ?",
  answer:
    "Oui, les voyageurs français ont besoin d'un visa pour l'Inde. Le visa électronique (e-Visa) se demande en ligne, uniquement sur le site officiel du gouvernement indien.",
};

export const PRICE_FAQ: FaqItem = {
  question: "Combien coûte ce voyage ?",
  answer:
    "Le prix dépend de la saison, du nombre de voyageurs, de la durée et de la catégorie d'hôtels. Raja vous envoie un devis détaillé et gratuit, sans frais d'agence intermédiaire.",
};

/** Practical facts grid + visible FAQ, mirrored in FAQPage schema. */
export function PracticalFaq({
  title = "Infos pratiques et questions fréquentes",
  practical,
  faq,
}: {
  title?: string;
  practical: [label: string, value: string][];
  faq: FaqItem[];
}) {
  return (
    <section className="border-t border-cream-dark bg-cream-dark/20 px-4 py-12 md:py-16">
      <JsonLd data={faqSchema(faq)} />
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {practical.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-cream-dark bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{label}</dt>
              <dd className="mt-1 text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 space-y-3">
          {faq.map((item) => (
            <details key={item.question} className="rounded-xl border border-cream-dark bg-white p-4">
              <summary className="cursor-pointer font-semibold text-ink">{item.question}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          À lire aussi :{" "}
          <Link href="/blog/visa-inde-voyageurs-francais" className="text-brand-blue hover:underline">le visa pour l&apos;Inde</Link>,{" "}
          <Link href="/blog/budget-voyage-inde" className="text-brand-blue hover:underline">quel budget prévoir</Link> et{" "}
          <Link href="/guides/calendrier-voyage-inde" className="text-brand-blue hover:underline">quand partir mois par mois</Link>.
        </p>
      </div>
    </section>
  );
}
