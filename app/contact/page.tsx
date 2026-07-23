import { createMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { MessageCircle, Mail, Clock } from "lucide-react";

export const metadata = createMetadata({
  title: "Contact — Devis gratuit",
  description:
    "Demandez un devis gratuit pour votre voyage en Inde. Raja vous répond sous 24h. Guide francophone agréé.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Bonjour Raja, je souhaite organiser un voyage en Inde."
  )}`;

  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Contact"
          title="Demandez votre devis gratuit"
          subtitle="Raja prépare personnellement chaque voyage. Réponse sous 24h, sans engagement."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-cream-dark bg-white p-4 transition-colors hover:border-brand-blue"
            >
              <MessageCircle className="text-brand-blue" size={20} />
              <div>
                <p className="font-semibold text-sm">WhatsApp — Raja</p>
                <p className="text-xs text-muted">Réponse personnelle</p>
              </div>
            </a>
            <div className="flex items-center gap-3 rounded-xl bg-cream-dark/50 p-4">
              <Mail className="text-brand-blue" size={20} />
              <div>
                <p className="font-semibold text-sm">Email</p>
                <p className="text-xs text-muted">{siteConfig.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-cream-dark/50 p-4">
              <Clock className="text-brand-blue" size={20} />
              <div>
                <p className="font-semibold text-sm">Délai de réponse</p>
                <p className="text-xs text-muted">Sous 24 heures</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
