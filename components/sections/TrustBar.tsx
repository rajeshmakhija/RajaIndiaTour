import { Award, Euro, Globe, MessageCircle, Shield } from "lucide-react";

const items = [
  { icon: Award, label: "Agréé Ministère Tourisme Inde" },
  { icon: Globe, label: "Guide francophone" },
  { icon: Euro, label: "Sans intermédiaire" },
  { icon: MessageCircle, label: "Devis sous 24h" },
  { icon: Shield, label: "4.8/5 avis clients" },
];

export function TrustBar() {
  return (
    <section className="border-y border-cream-dark bg-white py-4 md:py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-5 px-4 md:gap-8">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm font-medium text-ink">
            <Icon size={17} className="shrink-0 text-brand-blue" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
