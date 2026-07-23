"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, X } from "lucide-react";

type PopupPhase = "opening" | "open" | "closing" | "docked";
type SubmitStatus = "idle" | "loading" | "done" | "error";

export function ContactPopup() {
  const [phase, setPhase] = useState<PopupPhase>("docked");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    destination: "",
    message: "",
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openPopup = () => {
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 20);
  };

  const closePopup = () => {
    if (phase === "closing" || phase === "docked") return;
    setPhase("closing");
    window.setTimeout(() => setPhase("docked"), 420);
  };

  useEffect(() => {
    if (phase === "open") closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase === "open") closePopup();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-popup" }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const showDialog = phase !== "docked";
  const isOpen = phase === "open";

  return (
    <>
      {showDialog && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-end bg-black/20 p-3 transition-colors duration-300 sm:p-4 ${
            isOpen ? "bg-black/20" : "bg-black/0"
          }`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
          aria-hidden={phase === "closing"}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            className={`contact-popup-rainbow relative max-h-[calc(100svh-2rem)] w-full max-w-sm overflow-y-auto rounded-3xl bg-white shadow-2xl shadow-black/20 transition-all duration-[400ms] ease-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-[115%] opacity-0"
            }`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 rounded-full bg-brand-blue/5 p-1.5 text-brand-blue transition-colors hover:bg-brand-blue/10"
              aria-label="Fermer le formulaire de contact"
            >
              <X size={18} />
            </button>

            <div className="border-b border-cream-dark bg-white px-5 pb-5 pt-8 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue/60">
                Votre voyage commence ici
              </p>
              <h2 id="contact-popup-title" className="mt-1 font-display text-2xl font-bold text-brand-blue">
                Contactez-nous
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Partagez votre projet avec Raja. Réponse personnelle sous 24h.
              </p>
            </div>

            {status === "done" ? (
              <div className="px-6 py-10 text-center sm:px-8">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-2xl text-brand-blue">
                  ✓
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink">Demande envoyée</h3>
                <p className="mt-2 text-sm text-muted">Raja vous répondra sous 24h.</p>
                <button
                  type="button"
                  onClick={closePopup}
                  className="mt-6 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <span className="sr-only">Prénom</span>
                    <input
                      required
                      value={form.firstName}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, firstName: event.target.value }))
                      }
                      className="w-full rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-sm shadow-[0_1px_3px_rgba(0,61,117,0.04)] outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                      placeholder="Prénom *"
                    />
                  </label>
                  <label>
                    <span className="sr-only">Email</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, email: event.target.value }))
                      }
                      className="w-full rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-sm shadow-[0_1px_3px_rgba(0,61,117,0.04)] outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                      placeholder="Email *"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="sr-only">Destination souhaitée</span>
                  <input
                    value={form.destination}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, destination: event.target.value }))
                    }
                    className="w-full rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-sm shadow-[0_1px_3px_rgba(0,61,117,0.04)] outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    placeholder="Destination souhaitée"
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Votre projet de voyage</span>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, message: event.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-cream-dark bg-white px-3.5 py-2.5 text-sm shadow-[0_1px_3px_rgba(0,61,117,0.04)] outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    placeholder="Dates, durée, nombre de voyageurs, envies…"
                  />
                </label>

                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-blue/15 transition hover:bg-brand-blue-dark disabled:opacity-60"
                >
                  <Mail size={17} />
                  {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande"}
                </button>
              </form>
            )}
          </section>
        </div>
      )}

      {phase === "docked" && (
        <button
          type="button"
          onClick={openPopup}
          className="fixed right-0 top-1/2 z-[90] flex -translate-y-1/2 items-center gap-2 rounded-l-2xl border border-r-0 border-white/20 bg-brand-blue px-3 py-4 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:bg-brand-blue-dark hover:pr-5"
          aria-label="Ouvrir le formulaire de contact"
        >
          <MessageCircle size={19} />
          <span className="hidden [writing-mode:vertical-rl] sm:inline">Contactez-nous</span>
          <span className="sm:hidden">Contact</span>
        </button>
      )}
    </>
  );
}
