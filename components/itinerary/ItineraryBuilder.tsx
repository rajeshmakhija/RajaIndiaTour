"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Send, Sparkles } from "lucide-react";

const STEPS = [
  { num: 1, title: "Vos centres d'intérêt" },
  { num: 2, title: "Vos préférences" },
  { num: 3, title: "Votre voyage" },
];

const INTERESTS = [
  { id: "patrimoine", label: "Patrimoine & culture", image: "/images/destinations/places/taj-classic.jpg" },
  { id: "nature", label: "Nature & paysages", image: "/images/destinations/places/munnar.jpg" },
  { id: "faune", label: "Faune sauvage", image: "/images/destinations/places/tiger.jpg" },
  { id: "plages", label: "Plages & détente", image: "/images/destinations/places/palolem.jpg" },
  { id: "aventure", label: "Aventure & montagne", image: "/images/destinations/places/himalaya-pass.jpg" },
  { id: "spiritualite", label: "Spiritualité", image: "/images/destinations/places/varanasi-ghats.jpg" },
];

const REGIONS = [
  { id: "nord", label: "L'Inde du Nord", image: "/images/destinations/nord-delhi.jpg" },
  { id: "rajasthan", label: "Le Rajasthan", image: "/images/destinations/rajasthan.jpg" },
  { id: "sud", label: "L'Inde du Sud", image: "/images/destinations/sud.jpg" },
  { id: "himalaya", label: "Himalaya & Ladakh", image: "/images/destinations/places/pangong.jpg" },
  { id: "est", label: "L'Inde de l'Est & Bénarès", image: "/images/destinations/places/varanasi-ghats.jpg" },
  { id: "goa", label: "Goa & les plages", image: "/images/destinations/goa.jpg" },
];

const LODGING = [
  { id: "heritage", label: "Hôtels heritage", subtitle: "Palais et demeures d'exception", image: "/images/hotels/heritage-rambagh.jpg" },
  { id: "boutique", label: "Hôtels boutique", subtitle: "Charme et caractère", image: "/images/hotels/boutique-samode.jpg" },
  { id: "international", label: "Hôtels internationaux", subtitle: "Confort et standards connus", image: "/images/hotels/international-taj.jpg" },
  { id: "resort", label: "Resorts", subtitle: "Détente et grands espaces", image: "/images/hotels/resort-udaivilas.jpg" },
  { id: "campement", label: "Campements", subtitle: "Nuits sous les étoiles", image: "/images/hotels/camping-sand-dunes.jpg" },
  { id: "habitant", label: "Chez l'habitant", subtitle: "Rencontres et authenticité", image: "/images/hotels/homestay-haveli.jpg" },
];

const BUDGETS = [
  { id: "apercu", amount: "1 000 €", label: "Aperçu de l'Inde", gradient: "from-amber-300 to-amber-400" },
  { id: "remarquable", amount: "1 500 €", label: "Visites remarquables", gradient: "from-amber-400 to-orange-400" },
  { id: "variee", amount: "2 000 €", label: "Découvertes variées", gradient: "from-orange-400 to-orange-500" },
  { id: "approfondie", amount: "3 000 €", label: "Découverte approfondie", gradient: "from-orange-500 to-orange-700" },
  { id: "luxe", amount: "4 000 €", label: "Voyage de luxe", gradient: "from-orange-700 to-amber-800" },
  { id: "exception", amount: "5 000 € +", label: "Voyage d'exception", gradient: "from-amber-900 to-[#5c1d0c]" },
];

const STORAGE_KEY = "rajaindiatour-itineraire";

interface FormData {
  interests: string[];
  regions: string[];
  interestNotes: string;
  regionNotes: string;
  lodging: string[];
  budget: string;
  preferenceNotes: string;
  travelDate: string;
  duration: string;
  travelers: string;
  ageRange: string;
  details: string;
  heardFrom: string;
  firstName: string;
  email: string;
  city: string;
  country: string;
}

const defaultData: FormData = {
  interests: [],
  regions: [],
  interestNotes: "",
  regionNotes: "",
  lodging: [],
  budget: "",
  preferenceNotes: "",
  travelDate: "",
  duration: "",
  travelers: "2",
  ageRange: "",
  details: "",
  heardFrom: "",
  firstName: "",
  email: "",
  city: "",
  country: "France",
};

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-sm">
      <div className="border-b border-cream-dark bg-[#f4f6f8] px-4 py-3.5">
        <h3 className="text-center font-display text-base font-bold text-ink md:text-lg">{title}</h3>
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">{children}</div>
    </div>
  );
}

function ImageCard({
  label,
  subtitle,
  image,
  selected,
  onToggle,
}: {
  label: string;
  subtitle?: string;
  image: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`group overflow-hidden rounded-xl border-2 bg-white text-left transition-all duration-200 ${
        selected
          ? "border-brand-red shadow-md ring-2 ring-brand-red/15"
          : "border-cream-dark hover:border-brand-blue/50 hover:shadow-md"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 45vw, 240px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <span
          className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
            selected
              ? "border-brand-red bg-brand-red text-white"
              : "border-white/80 bg-white/30 text-transparent backdrop-blur-sm"
          }`}
        >
          <Check size={13} strokeWidth={3} />
        </span>
      </div>
      <div className="px-3 py-3">
        <p className="text-center text-xs font-bold leading-snug text-ink md:text-sm">{label}</p>
        {subtitle && <p className="mt-1 text-center text-[11px] leading-snug text-muted">{subtitle}</p>}
      </div>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">
        {label} {required && <span className="text-brand-red">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
      />
    </label>
  );
}

export function ItineraryBuilder() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(defaultData);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) setData((d) => ({ ...d, ...parsed.data }));
        if (parsed.step) setStep(parsed.step);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      /* ignore */
    }
  }, [step, data, hydrated]);

  const keepFormInView = () => {
    // Keep the form in place — don't jump to the top of the page.
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    if (Math.abs(window.scrollY - top) > 80) {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMulti = (field: "interests" | "regions" | "lodging", id: string) => {
    setData((d) => ({
      ...d,
      [field]: d[field].includes(id) ? d[field].filter((i) => i !== id) : [...d[field], id],
    }));
  };

  const goNext = () => {
    if (step === 1 && (data.interests.length === 0 || data.regions.length === 0)) {
      setError("Choisissez au moins un centre d'intérêt et une région.");
      return;
    }
    if (step === 2 && data.lodging.length === 0) {
      setError("Choisissez au moins un type d'hébergement.");
      return;
    }
    setError("");
    setStep((s) => Math.min(3, s + 1));
    keepFormInView();
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
    keepFormInView();
  };

  const labelsFor = (ids: string[], list: { id: string; label: string }[]) =>
    ids.map((id) => list.find((x) => x.id === id)?.label ?? id).join(", ");

  const handleSubmit = async () => {
    if (!data.firstName.trim() || !data.email.trim()) {
      setError("Veuillez renseigner votre prénom et votre email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          email: data.email,
          city: data.city,
          country: data.country,
          travelDate: data.travelDate,
          duration: data.duration,
          travelers: data.travelers,
          ageRange: data.ageRange,
          heardFrom: data.heardFrom,
          interests: labelsFor(data.interests, INTERESTS),
          regions: labelsFor(data.regions, REGIONS),
          lodging: labelsFor(data.lodging, LODGING),
          budget: BUDGETS.find((b) => b.id === data.budget)?.label ?? "",
          budgetRange: BUDGETS.find((b) => b.id === data.budget)?.amount ?? "",
          message: [data.interestNotes, data.regionNotes, data.preferenceNotes, data.details]
            .filter(Boolean)
            .join("\n\n"),
          source: "itineraire-sur-mesure",
        }),
      });
      if (!res.ok) throw new Error("Erreur");
      setDone(true);
      localStorage.removeItem(STORAGE_KEY);
      keepFormInView();
    } catch {
      setError("Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        ref={rootRef}
        className="mx-auto max-w-xl rounded-3xl border border-cream-dark bg-white p-10 text-center shadow-md"
      >
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue text-3xl text-white">
          ✓
        </span>
        <h2 className="font-display text-3xl font-bold text-ink">Votre demande est envoyée</h2>
        <p className="mt-4 leading-relaxed text-muted">
          Merci {data.firstName} ! Raja étudie personnellement votre projet et vous répond sous 24 h
          avec une proposition d&apos;itinéraire sur mesure.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-3xl border border-cream-dark bg-white shadow-lg"
    >
      {/* Stepper */}
      <div className="grid grid-cols-3 bg-brand-blue">
        {STEPS.map((s) => (
          <div
            key={s.num}
            className={`px-2 py-4 text-center transition-colors md:px-4 ${
              step === s.num ? "bg-brand-red" : "bg-brand-blue"
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70 md:text-xs">
              Étape {s.num}
            </p>
            <p className="mt-0.5 text-xs font-bold text-white md:text-sm">{s.title}</p>
          </div>
        ))}
      </div>

      <div className="p-4 md:p-7">
        {/* Step 1 */}
        {step === 1 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Choisissez vos centres d'intérêt">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {INTERESTS.map((item) => (
                  <ImageCard
                    key={item.id}
                    label={item.label}
                    image={item.image}
                    selected={data.interests.includes(item.id)}
                    onToggle={() => toggleMulti("interests", item.id)}
                  />
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Indiquez ici vos souhaits ou suggestions"
                value={data.interestNotes}
                onChange={(e) => setData((d) => ({ ...d, interestNotes: e.target.value }))}
                className="mt-4 w-full resize-none rounded-xl border border-cream-dark px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
              />
            </Panel>

            <Panel title="Choisissez votre région">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {REGIONS.map((item) => (
                  <ImageCard
                    key={item.id}
                    label={item.label}
                    image={item.image}
                    selected={data.regions.includes(item.id)}
                    onToggle={() => toggleMulti("regions", item.id)}
                  />
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Indiquez ici vos souhaits ou suggestions"
                value={data.regionNotes}
                onChange={(e) => setData((d) => ({ ...d, regionNotes: e.target.value }))}
                className="mt-4 w-full resize-none rounded-xl border border-cream-dark px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
              />
            </Panel>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Choisissez votre hébergement">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {LODGING.map((l) => (
                  <ImageCard
                    key={l.id}
                    label={l.label}
                    subtitle={l.subtitle}
                    image={l.image}
                    selected={data.lodging.includes(l.id)}
                    onToggle={() => toggleMulti("lodging", l.id)}
                  />
                ))}
              </div>
              <textarea
                rows={2}
                placeholder="Indiquez ici vos souhaits ou suggestions"
                value={data.preferenceNotes}
                onChange={(e) => setData((d) => ({ ...d, preferenceNotes: e.target.value }))}
                className="mt-4 w-full resize-none rounded-xl border border-cream-dark px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
              />
            </Panel>

            <Panel title="Choisissez votre budget">
              <p className="mb-4 text-center text-xs text-muted">
                Budget indicatif par personne, hors vols internationaux — il nous aide simplement à
                calibrer votre itinéraire.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BUDGETS.map((b) => {
                  const selected = data.budget === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setData((d) => ({ ...d, budget: selected ? "" : b.id }))}
                      aria-pressed={selected}
                      className={`overflow-hidden rounded-xl border-2 bg-white text-left transition-all duration-200 ${
                        selected
                          ? "border-brand-red shadow-md ring-2 ring-brand-red/15"
                          : "border-cream-dark hover:border-brand-blue/50 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`relative flex aspect-[4/3] flex-col items-center justify-center bg-gradient-to-br ${b.gradient} px-2 text-white`}
                      >
                        <span className="font-display text-lg font-bold leading-none drop-shadow-sm md:text-xl">
                          {b.amount}
                        </span>
                        <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-white/85">
                          jusqu&apos;à / pers.
                        </span>
                        <span
                          className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                            selected
                              ? "border-white bg-white text-brand-red"
                              : "border-white/70 bg-white/20 text-transparent"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>
                      </div>
                      <p className="px-2 py-3 text-center text-[11px] font-bold leading-snug text-ink md:text-xs">
                        {b.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Panel>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Votre voyage">
              <div className="relative mb-5 h-32 overflow-hidden rounded-xl">
                <Image
                  src="/images/destinations/places/jaipur-amber.jpg"
                  alt="Votre voyage en Inde"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 460px"
                />
              </div>
              <div className="space-y-3">
                <Field
                  label="Date approximative de voyage"
                  value={data.travelDate}
                  onChange={(v) => setData((d) => ({ ...d, travelDate: v }))}
                  placeholder="Ex. mars 2027"
                />
                <Field
                  label="Durée du voyage"
                  value={data.duration}
                  onChange={(v) => setData((d) => ({ ...d, duration: v }))}
                  placeholder="Ex. 15 jours"
                />
                <Field
                  label="Nombre de personnes"
                  value={data.travelers}
                  onChange={(v) => setData((d) => ({ ...d, travelers: v }))}
                  placeholder="Ex. 2"
                />
                <Field
                  label="Tranche d'âge"
                  value={data.ageRange}
                  onChange={(v) => setData((d) => ({ ...d, ageRange: v }))}
                  placeholder="Ex. 45-60 ans"
                />
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-ink">
                    Autre précision de votre part
                  </span>
                  <textarea
                    rows={3}
                    value={data.details}
                    onChange={(e) => setData((d) => ({ ...d, details: e.target.value }))}
                    placeholder="Rythme souhaité, fêtes à ne pas manquer, contraintes alimentaires…"
                    className="w-full resize-none rounded-xl border border-cream-dark px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                  />
                </label>
                <Field
                  label="Comment nous connaissez-vous ?"
                  value={data.heardFrom}
                  onChange={(v) => setData((d) => ({ ...d, heardFrom: v }))}
                  placeholder="Google, Routard, bouche-à-oreille…"
                />
              </div>
            </Panel>

            <Panel title="Vos coordonnées">
              <div className="relative mb-5 h-32 overflow-hidden rounded-xl">
                <Image
                  src="/images/hotels/heritage-rambagh.jpg"
                  alt="Raja vous répond sous 24h"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 460px"
                />
              </div>
              <div className="space-y-3">
                <Field
                  label="Prénom"
                  required
                  value={data.firstName}
                  onChange={(v) => setData((d) => ({ ...d, firstName: v }))}
                  placeholder="Votre prénom"
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={data.email}
                  onChange={(v) => setData((d) => ({ ...d, email: v }))}
                  placeholder="vous@exemple.fr"
                />
                <Field
                  label="Ville"
                  value={data.city}
                  onChange={(v) => setData((d) => ({ ...d, city: v }))}
                  placeholder="Votre ville"
                />
                <Field
                  label="Pays"
                  value={data.country}
                  onChange={(v) => setData((d) => ({ ...d, country: v }))}
                  placeholder="Votre pays"
                />
              </div>

              <div className="mt-5 rounded-xl bg-cream-dark/40 p-4">
                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-brand-blue" />
                  Raja prépare lui-même chaque itinéraire, sans intermédiaire. Vous recevez une
                  proposition personnalisée et gratuite sous 24 h.
                </p>
              </div>
            </Panel>
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-7 flex items-center justify-between gap-4 border-t border-cream-dark pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:gap-2.5 hover:underline"
            >
              <ChevronLeft size={17} /> Précédent
            </button>
          ) : (
            <span />
          )}

          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Étape {step} sur 3
          </p>

          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-dark"
            >
              Suivant <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-dark disabled:opacity-60"
            >
              <Send size={15} />
              {submitting ? "Envoi en cours…" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
