import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function TopContactBar() {
  return (
    <div className="bg-brand-blue text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-end sm:text-sm">
        <a
          href={`tel:${siteConfig.phoneTel}`}
          className="inline-flex items-center gap-1.5 font-medium text-white/90 hover:text-white transition-colors"
        >
          <Phone size={14} className="shrink-0" />
          {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center gap-1.5 font-medium text-white/90 hover:text-white transition-colors"
        >
          <Mail size={14} className="shrink-0" />
          {siteConfig.email}
        </a>
      </div>
    </div>
  );
}
