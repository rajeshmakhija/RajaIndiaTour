"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_STORAGE_KEY,
  type ConsentChoice,
  updateConsent,
} from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
      if (stored === "granted" || stored === "denied") {
        // Restore for this session (default script already applied it in <head> when possible)
        updateConsent(stored);
        return;
      }
    } catch {
      /* private mode */
    }
    setVisible(true);
  }, []);

  function choose(choice: ConsentChoice) {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    updateConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Choix des cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-cream-dark bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-ink">Confidentialité et cookies</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Ce site utilise des cookies et des technologies similaires afin d&apos;établir des
            statistiques de fréquentation et d&apos;optimiser nos actions marketing, dans le respect
            de la réglementation applicable. Ces traitements ne sont activés qu&apos;après votre
            consentement explicite. Vous pouvez accepter ou refuser ; votre choix pourra être modifié
            ultérieurement.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-cream-dark px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream-dark/40"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
