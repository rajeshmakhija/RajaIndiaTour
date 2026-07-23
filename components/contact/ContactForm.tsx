"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    city: "",
    country: "France",
    travelDate: "",
    duration: "",
    travelers: "2",
    destination: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-cream-dark bg-cream-dark/50 p-8 text-center">
        <p className="text-4xl mb-3 text-brand-red">✓</p>
        <h2 className="font-display text-xl font-bold text-ink">Message envoyé !</h2>
        <p className="mt-2 text-muted text-sm">Raja vous répond sous 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-md space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Prénom *" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Ville de départ" value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Pays" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Destination souhaitée" value={form.destination} onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Date approximative" value={form.travelDate} onChange={(e) => setForm((f) => ({ ...f, travelDate: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Durée (jours)" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
        <input placeholder="Nombre de voyageurs" value={form.travelers} onChange={(e) => setForm((f) => ({ ...f, travelers: e.target.value }))} className="rounded-lg border border-cream-dark px-4 py-3 text-sm" />
      </div>
      {status === "error" && <p className="text-sm text-red-600">Erreur — réessayez ou contactez-nous par WhatsApp.</p>}
      <Button type="submit" variant="primary" className={status === "loading" ? "opacity-60" : ""}>
        {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
      </Button>
    </form>
  );
}
