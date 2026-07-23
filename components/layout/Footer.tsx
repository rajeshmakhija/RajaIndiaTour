import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Logo } from "@/components/layout/Logo";

const footerLinks = {
  destinations: [
    { href: "/destinations/rajasthan", label: "Rajasthan" },
    { href: "/destinations/ladakh", label: "Ladakh" },
    { href: "/destinations/madhya-pradesh", label: "Madhya Pradesh" },
    { href: "/destinations/nord", label: "L'Inde du Nord" },
    { href: "/destinations/sud", label: "L'Inde du Sud" },
    { href: "/destinations/varanasi", label: "Varanasi" },
  ],
  agence: [
    { href: "/a-propos", label: "À propos de Raja" },
    { href: "/creer-mon-itineraire", label: "Créez votre itinéraire" },
    { href: "/circuits", label: "Nos circuits" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-muted leading-relaxed">
            Voyages sur mesure en Inde pour voyageurs français. Guide francophone agréé depuis {siteConfig.founder.experience}.
          </p>
          <p className="mt-4 text-sm text-brand-blue font-medium">{siteConfig.domain}</p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-red">Destinations</p>
          <ul className="space-y-2">
            {footerLinks.destinations.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-muted hover:text-brand-blue transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-red">Agence</p>
          <ul className="space-y-2">
            {footerLinks.agence.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-brand-blue transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-dark py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Raja India Tour — {siteConfig.domain} — Tous droits réservés
      </div>
    </footer>
  );
}
