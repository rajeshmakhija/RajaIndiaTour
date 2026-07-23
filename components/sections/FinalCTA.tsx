import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

export function FinalCTA() {
  return (
    <section className="border-t border-cream-dark bg-white py-12 px-4 md:py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-cream-dark bg-white p-8 text-center shadow-sm md:p-10">
        <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
          Créez votre voyage en Inde
        </h2>
        <p className="mt-3 text-lg text-muted">
          Devis personnalisé gratuit sous 24h. Sans engagement, sans intermédiaire.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary">
            Demander un devis gratuit
            <ArrowRight size={16} />
          </Button>
          <Button href="/circuits" variant="secondary">
            Voir nos circuits
          </Button>
        </div>
      </div>
    </section>
  );
}
