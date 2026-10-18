"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  MapPin,
  Printer,
  RotateCcw,
} from "lucide-react";

type Props = { slug: string };

const rajasthanStops = [
  { name: "Delhi", note: "La porte d'entrée, vive et monumentale.", nights: "1 à 2 nuits", x: 70, y: 12 },
  { name: "Mandawa", note: "Les havelis peintes du Shekhawati.", nights: "1 nuit", x: 52, y: 22 },
  { name: "Bikaner", note: "Une citadelle rouge au bord du désert.", nights: "1 nuit", x: 31, y: 31 },
  { name: "Jaisalmer", note: "La ville dorée et les dunes du Thar.", nights: "2 nuits", x: 14, y: 51 },
  { name: "Jodhpur", note: "Mehrangarh au-dessus de la ville bleue.", nights: "2 nuits", x: 36, y: 57 },
  { name: "Udaipur", note: "Des palais et une lumière douce sur les lacs.", nights: "2 nuits", x: 42, y: 78 },
  { name: "Pushkar", note: "Une pause sacrée autour du lac.", nights: "1 nuit", x: 55, y: 56 },
  { name: "Jaipur", note: "Palais, bazars et architecture rose.", nights: "2 nuits", x: 67, y: 47 },
  { name: "Agra", note: "Le Taj Mahal au lever du jour.", nights: "1 nuit", x: 83, y: 35 },
];

const months = [
  { month: "Janvier", regions: "Rajasthan, Kerala, Inde du Nord", mood: "Matins frais, journées lumineuses et air sec dans le Nord.", advice: "Prévoyez une veste pour les départs matinaux et les soirées." },
  { month: "Février", regions: "Rajasthan, Madhya Pradesh, Kerala", mood: "Une période douce, très agréable pour les villes et les safaris.", advice: "Réservez tôt : c'est l'un des mois les plus recherchés." },
  { month: "Mars", regions: "Rajasthan, Varanasi, Madhya Pradesh", mood: "Le printemps s'installe et Holi peut colorer le voyage.", advice: "La chaleur augmente rapidement en fin de mois." },
  { month: "Avril", regions: "Ladakh bas, Himalaya, Inde du Nord", mood: "Les plaines chauffent, les contreforts himalayens deviennent attirants.", advice: "Privilégiez un rythme calme et des visites tôt le matin." },
  { month: "Mai", regions: "Himalaya, Sikkim, stations d'altitude", mood: "La chaleur domine les plaines tandis que la montagne respire.", advice: "Évitez les circuits urbains trop denses dans le Nord." },
  { month: "Juin", regions: "Ladakh, Himalaya", mood: "Les routes d'altitude s'ouvrent progressivement.", advice: "Gardez de la souplesse : l'ouverture des cols dépend des conditions." },
  { month: "Juillet", regions: "Ladakh, Rajasthan pour les voyageurs souples", mood: "La mousson verdit les paysages, le Ladakh reste la grande échappée.", advice: "Prévoyez des marges pour les transports dans les régions pluvieuses." },
  { month: "Août", regions: "Ladakh, Kerala verdoyant", mood: "Montagnes accessibles au nord, végétation spectaculaire au sud.", advice: "Le Kerala est magnifique mais humide ; choisissez-le en connaissance de cause." },
  { month: "Septembre", regions: "Ladakh, Rajasthan, Inde du Nord", mood: "Une transition généreuse : moins de pluie et des paysages encore verts.", advice: "Excellent compromis pour éviter la très haute saison." },
  { month: "Octobre", regions: "Rajasthan, Varanasi, Kerala", mood: "Le pays entre dans une saison plus sèche et les fêtes se multiplient.", advice: "Confirmez les dates de Diwali avant de construire l'itinéraire." },
  { month: "Novembre", regions: "Presque toute l'Inde", mood: "Températures agréables et belles conditions de voyage.", advice: "Anticipez hébergements et transports sur les itinéraires populaires." },
  { month: "Décembre", regions: "Rajasthan, Goa, Kerala, Inde du Sud", mood: "Soleil d'hiver, soirées fraîches au Nord et douceur tropicale au Sud.", advice: "La période des fêtes demande de réserver plusieurs mois à l'avance." },
];

const packingGroups = [
  { title: "Documents", items: ["Passeport et copie numérique", "Visa vérifié", "Assurance voyage", "Billets et réservations", "Contacts utiles hors ligne"] },
  { title: "Dans le bagage cabine", items: ["Médicaments essentiels", "Chargeur et batterie externe", "Une tenue de rechange", "Petite trousse de toilette", "Gourde vide"] },
  { title: "Vêtements", items: ["Tenues légères et respirantes", "Étole ou foulard", "Veste légère", "Chaussures déjà portées", "Tenue couvrante pour les lieux religieux"] },
  { title: "Santé et confort", items: ["Protection solaire", "Répulsif anti-moustiques", "Gel hydroalcoolique", "Petite pharmacie personnelle", "Bouchons d'oreilles"] },
];

const festivals = [
  { season: "Hiver", name: "Festival du désert de Jaisalmer", place: "Jaisalmer", note: "Musique, costumes et traditions du Thar dans la lumière dorée de février." },
  { season: "Printemps", name: "Holi", place: "Rajasthan et Inde du Nord", note: "La fête des couleurs. Une expérience intense qui demande un cadre bien choisi." },
  { season: "Été", name: "Hemis", place: "Ladakh", note: "Danses masquées et cérémonies bouddhistes au monastère d'Hemis." },
  { season: "Mousson", name: "Onam", place: "Kerala", note: "Décors floraux, repas de fête et traditions qui célèbrent le retour du roi Mahabali." },
  { season: "Automne", name: "Dussehra", place: "Mysore et Inde du Nord", note: "Processions, lumières et récits épiques prennent possession de l'espace public." },
  { season: "Automne", name: "Diwali", place: "Dans toute l'Inde", note: "Lampes, réunions familiales et célébrations de la lumière. Les dates varient chaque année." },
  { season: "Automne", name: "Foire de Pushkar", place: "Pushkar", note: "Pèlerins, éleveurs et voyageurs se rencontrent au bord du lac sacré." },
  { season: "Hiver", name: "Hornbill Festival", place: "Nagaland", note: "Un grand rendez-vous culturel du Nord-Est, généralement au début de décembre." },
];

const journeyOptions = [
  { from: "Delhi", to: "Agra", time: "3 à 4 h par la route", note: "Le train rapide peut réduire le trajet selon l'horaire." },
  { from: "Delhi", to: "Jaipur", time: "5 à 6 h par la route", note: "Partez tôt pour arriver avant la circulation du soir." },
  { from: "Agra", to: "Jaipur", time: "4 à 5 h par la route", note: "Fatehpur Sikri constitue une halte naturelle." },
  { from: "Jaipur", to: "Jodhpur", time: "5 à 6 h par la route", note: "Une vraie journée de liaison, à garder légère à l'arrivée." },
  { from: "Jodhpur", to: "Udaipur", time: "5 à 6 h par la route", note: "Ranakpur permet de transformer le trajet en journée de découverte." },
  { from: "Jaipur", to: "Jaisalmer", time: "10 à 11 h par la route", note: "Le train de nuit est souvent une alternative plus intelligente." },
  { from: "Kochi", to: "Munnar", time: "4 à 5 h par la route", note: "La montée devient plus lente à l'approche des plantations." },
  { from: "Munnar", to: "Thekkady", time: "3 à 4 h par la route", note: "Une belle liaison à travers les paysages du Kerala." },
  { from: "Thekkady", to: "Alleppey", time: "4 à 5 h par la route", note: "Prévoyez une arrivée à temps pour l'embarquement sur les backwaters." },
  { from: "Delhi", to: "Varanasi", time: "Environ 1 h 30 de vol", note: "Le train de nuit offre une expérience différente mais demande plus de temps." },
];

type QuizQuestion = {
  question: string;
  answers: { label: string; scores: Record<string, number> }[];
};

const quizQuestions: QuizQuestion[] = [
  { question: "Quel paysage vous appelle le plus ?", answers: [
    { label: "Palais, forts et désert", scores: { rajasthan: 3 } },
    { label: "Montagnes et grands espaces", scores: { ladakh: 3 } },
    { label: "Eau, végétation et douceur", scores: { kerala: 3 } },
    { label: "Temples, fleuve et spiritualité", scores: { varanasi: 3 } },
  ] },
  { question: "Quel rythme imaginez-vous ?", answers: [
    { label: "Un grand itinéraire riche en étapes", scores: { rajasthan: 2, nord: 1 } },
    { label: "Lent, avec du temps pour respirer", scores: { kerala: 2, varanasi: 1 } },
    { label: "Aventureux et proche de la nature", scores: { ladakh: 2, madhya: 2 } },
  ] },
  { question: "Quel souvenir voulez-vous rapporter ?", answers: [
    { label: "Une nuit dans le désert", scores: { rajasthan: 3 } },
    { label: "Une route au-dessus des nuages", scores: { ladakh: 3 } },
    { label: "Une nuit sur les backwaters", scores: { kerala: 3 } },
    { label: "L'aube sur le Gange", scores: { varanasi: 3 } },
    { label: "L'observation d'un tigre", scores: { madhya: 3 } },
  ] },
  { question: "Pour une première visite, vous préférez…", answers: [
    { label: "Les grands classiques", scores: { nord: 3, rajasthan: 1 } },
    { label: "Une région au caractère très fort", scores: { rajasthan: 2, ladakh: 2 } },
    { label: "Une entrée plus douce", scores: { kerala: 3 } },
  ] },
];

const quizResults: Record<string, { title: string; text: string; href: string }> = {
  rajasthan: { title: "Le Rajasthan", text: "Votre voyage aime les récits, les villes anciennes et les paysages qui changent chaque jour.", href: "/destinations/rajasthan" },
  ladakh: { title: "Le Ladakh", text: "Vous cherchez l'espace, l'altitude et un voyage qui laisse une vraie place au silence.", href: "/destinations/ladakh" },
  kerala: { title: "Le Kerala", text: "Votre Inde se dessine dans un rythme plus doux, entre végétation, cuisine et chemins d'eau.", href: "/destinations/kerala" },
  varanasi: { title: "Varanasi et l'Inde spirituelle", text: "Vous êtes attiré par les rituels, les rencontres et les lieux dont la mémoire dépasse les monuments.", href: "/destinations/varanasi" },
  madhya: { title: "Le Madhya Pradesh", text: "Vous recherchez une Inde plus sauvage, entre patrimoine, forêts et observation animalière.", href: "/destinations/madhya-pradesh" },
  nord: { title: "Le Triangle d'Or et l'Inde du Nord", text: "Vous souhaitez commencer par des repères célèbres et une première immersion très vivante.", href: "/destinations/nord" },
};

function RajasthanMap() {
  const [active, setActive] = useState(rajasthanStops[0]);
  return (
    <section className="overflow-hidden rounded-2xl bg-brand-blue-dark text-white shadow-xl shadow-brand-blue/15">
      <div className="grid lg:grid-cols-[1.25fr_.75fr]">
        <div className="relative min-h-[520px] bg-[#eee9df]">
          <Image src="/images/destinations/maps/rajasthan.jpg" alt="Carte du Rajasthan et de ses principales étapes" fill className="object-cover" sizes="(max-width:1024px) 100vw, 720px" />
          <div className="absolute inset-0 bg-brand-blue/10" />
          {rajasthanStops.map((stop) => (
            <button
              key={stop.name}
              type="button"
              onClick={() => setActive(stop)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 p-2 shadow-md transition ${active.name === stop.name ? "scale-125 border-white bg-brand-red text-white" : "border-white bg-brand-blue text-white hover:scale-110"}`}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              aria-label={`Découvrir l'étape ${stop.name}`}
              aria-pressed={active.name === stop.name}
            >
              <MapPin size={17} />
            </button>
          ))}
        </div>
        <div className="flex flex-col justify-between p-7 md:p-9">
          <div>
            <p className="text-sm font-semibold text-white/70">Étape sélectionnée</p>
            <h2 className="mt-2 font-display text-4xl font-bold">{active.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85">{active.note}</p>
            <p className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">{active.nights}</p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-2" aria-label="Choisir une étape">
            {rajasthanStops.map((stop) => (
              <button key={stop.name} type="button" onClick={() => setActive(stop)} aria-pressed={active.name === stop.name} className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${active.name === stop.name ? "bg-brand-red text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}>
                {stop.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MonthCalendar() {
  const [selected, setSelected] = useState(0);
  const current = months[selected];
  return (
    <section className="rounded-2xl bg-[#f4f6f8] p-5 md:p-8">
      <p className="mb-5 font-display text-2xl font-bold text-ink">Choisissez votre mois</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {months.map((item, index) => (
          <button key={item.month} type="button" onClick={() => setSelected(index)} aria-pressed={selected === index} className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${selected === index ? "bg-brand-blue text-white shadow-md" : "bg-white text-ink hover:text-brand-blue"}`}>
            {item.month}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 bg-white p-6 md:grid-cols-2 md:p-8">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">{current.month}</h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-red">{current.regions}</p>
        </div>
        <div>
          <p className="leading-relaxed text-muted">{current.mood}</p>
          <p className="mt-4 font-medium text-brand-blue">Conseil de Raja : {current.advice}</p>
        </div>
      </div>
    </section>
  );
}

function PackingChecklist() {
  const allItems = useMemo(() => packingGroups.flatMap((group) => group.items), []);
  const [checked, setChecked] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("raja-packing-list");
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) setChecked(parsed.filter((item): item is string => typeof item === "string" && allItems.includes(item)));
    } catch {
      setChecked([]);
    } finally {
      setHydrated(true);
    }
  }, [allItems]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("raja-packing-list", JSON.stringify(checked));
  }, [checked, hydrated]);
  const percent = Math.round((checked.length / allItems.length) * 100);
  return (
    <section className="rounded-2xl bg-brand-blue-dark p-5 text-white md:p-8 print:bg-white print:text-ink">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold">Votre valise, étape par étape</h2>
          <p className="mt-2 text-white/75 print:text-muted">{checked.length} élément{checked.length > 1 ? "s" : ""} prêt{checked.length > 1 ? "s" : ""} sur {allItems.length}</p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-blue"><Printer size={16} /> Imprimer</button>
          <button type="button" onClick={() => setChecked([])} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"><RotateCcw size={16} /> Recommencer</button>
        </div>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15 print:hidden" role="progressbar" aria-label="Progression de la valise" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><div className="h-full rounded-full bg-brand-red transition-all" style={{ width: `${percent}%` }} /></div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {packingGroups.map((group) => (
          <fieldset key={group.title} className="rounded-xl bg-white p-5 text-ink">
            <legend className="px-2 font-display text-xl font-bold text-brand-blue">{group.title}</legend>
            <div className="mt-2 space-y-3">
              {group.items.map((item) => {
                const isChecked = checked.includes(item);
                return (
                  <label key={item} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                    <input type="checkbox" checked={isChecked} onChange={() => setChecked((current) => isChecked ? current.filter((value) => value !== item) : [...current, item])} className="mt-1 h-4 w-4 accent-[#9e1449]" />
                    <span className={isChecked ? "text-muted line-through" : "text-ink"}>{item}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}

function FirstTripOverview() {
  return (
    <section className="rounded-2xl bg-brand-blue-dark p-7 text-white md:p-10">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Trois repères pour une première rencontre</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white/10 p-5"><p className="font-display text-xl font-bold">Une région à la fois</p><p className="mt-2 text-sm leading-6 text-white/75">L&apos;Inde change de langue, de paysage et de cuisine en quelques centaines de kilomètres.</p></div>
        <div className="rounded-xl bg-white/10 p-5"><p className="font-display text-xl font-bold">Un rythme humain</p><p className="mt-2 text-sm leading-6 text-white/75">Deux nuits dans une ville racontent souvent davantage qu&apos;une longue liste d&apos;étapes.</p></div>
        <div className="rounded-xl bg-white/10 p-5"><p className="font-display text-xl font-bold">La vie quotidienne</p><p className="mt-2 text-sm leading-6 text-white/75">Marchés, repas et conversations donnent au voyage sa mémoire la plus vivante.</p></div>
      </div>
    </section>
  );
}

function FestivalCalendar() {
  const seasons = ["Toutes", "Hiver", "Printemps", "Été", "Mousson", "Automne"];
  const [season, setSeason] = useState("Toutes");
  const visible = season === "Toutes" ? festivals : festivals.filter((festival) => festival.season === season);
  return (
    <section>
      <div className="flex flex-wrap gap-2" aria-label="Filtrer les festivals par saison">
        {seasons.map((item) => <button key={item} type="button" onClick={() => setSeason(item)} aria-pressed={season === item} className={`rounded-full px-4 py-2 text-sm font-semibold ${season === item ? "bg-brand-red text-white" : "bg-[#f4f6f8] text-brand-blue hover:bg-brand-blue hover:text-white"}`}>{item}</button>)}
      </div>
      <div className="mt-7 divide-y divide-cream-dark border-y border-cream-dark">
        {visible.map((festival) => (
          <article key={festival.name} className="grid gap-3 py-6 md:grid-cols-[150px_1fr_1.5fr] md:items-start">
            <p className="text-sm font-semibold text-brand-red">{festival.season}</p>
            <div><h2 className="font-display text-2xl font-bold text-ink">{festival.name}</h2><p className="mt-1 text-sm text-brand-blue">{festival.place}</p></div>
            <p className="leading-relaxed text-muted">{festival.note}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">Les dates exactes varient selon les calendriers lunaires, religieux ou locaux. Confirmez-les avant toute réservation.</p>
    </section>
  );
}

function JourneyPlanner() {
  const cities = useMemo(() => [...new Set(journeyOptions.flatMap((route) => [route.from, route.to]))], []);
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Agra");
  const route = journeyOptions.find((item) => item.from === from && item.to === to) ?? journeyOptions.find((item) => item.from === to && item.to === from);
  return (
    <section className="grid overflow-hidden rounded-2xl bg-[#f4f6f8] lg:grid-cols-[.8fr_1.2fr]">
      <div className="p-6 md:p-9">
        <h2 className="font-display text-3xl font-bold text-ink">Comparer deux étapes</h2>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-ink">Départ<select value={from} onChange={(event) => setFrom(event.target.value)} className="mt-2 w-full rounded-xl border border-cream-dark bg-white px-4 py-3 font-normal outline-none focus:border-brand-blue">{cities.map((city) => <option key={city}>{city}</option>)}</select></label>
          <label className="block text-sm font-semibold text-ink">Arrivée<select value={to} onChange={(event) => setTo(event.target.value)} className="mt-2 w-full rounded-xl border border-cream-dark bg-white px-4 py-3 font-normal outline-none focus:border-brand-blue">{cities.map((city) => <option key={city}>{city}</option>)}</select></label>
        </div>
      </div>
      <div className="relative min-h-[500px] overflow-hidden bg-brand-blue-dark text-white">
        <Image src="/images/destinations/maps/rajasthan-itinerary.png" alt="Carte illustrée d'un itinéraire au Rajasthan" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 720px" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/70 via-brand-blue-dark/10 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 z-10 rounded-xl bg-brand-blue-dark/90 p-5 backdrop-blur-sm md:inset-x-8 md:bottom-8 md:p-7" aria-live="polite">
          {from === to ? (
            <p className="text-lg text-white/80">Choisissez deux villes différentes pour comparer le trajet.</p>
          ) : route ? (
            <div><p className="text-sm font-semibold text-white/65">{from} → {to}</p><p className="mt-2 font-display text-3xl font-bold md:text-4xl">{route.time}</p><p className="mt-3 max-w-xl leading-relaxed text-white/80">{route.note}</p></div>
          ) : (
            <div><p className="font-display text-2xl font-bold">Pas de liaison directe dans ce guide</p><p className="mt-3 text-white/80">Ces villes demandent généralement une correspondance ou un itinéraire en plusieurs étapes. Raja peut vous proposer la combinaison la plus réaliste.</p></div>
          )}
        </div>
      </div>
    </section>
  );
}

function RegionQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const answering = useRef(false);
  const finished = step >= quizQuestions.length;
  const resultKey = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "rajasthan";
  const result = quizResults[resultKey];
  function answer(values: Record<string, number>) {
    if (answering.current) return;
    answering.current = true;
    setScores((current) => {
      const next = { ...current };
      Object.entries(values).forEach(([key, value]) => { next[key] = (next[key] ?? 0) + value; });
      return next;
    });
    setStep((current) => current + 1);
  }
  useEffect(() => { answering.current = false; }, [step]);
  function restart() { answering.current = false; setStep(0); setScores({}); }
  return (
    <section className="overflow-hidden rounded-2xl bg-brand-blue-dark text-white">
      <div className="h-1.5 bg-white/10" role="progressbar" aria-label="Progression du quiz" aria-valuemin={0} aria-valuemax={quizQuestions.length} aria-valuenow={Math.min(step, quizQuestions.length)}><div className="h-full bg-brand-red transition-all" style={{ width: `${Math.min((step / quizQuestions.length) * 100, 100)}%` }} /></div>
      <div className="min-h-[420px] p-7 md:p-12">
        {!finished ? (
          <div className="mx-auto max-w-3xl" aria-live="polite">
            <p className="text-sm font-semibold text-white/65">Question {step + 1} sur {quizQuestions.length}</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">{quizQuestions[step].question}</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {quizQuestions[step].answers.map((choice) => <button key={choice.label} type="button" onClick={() => answer(choice.scores)} className="rounded-xl bg-white p-5 text-left font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#f8edf2] focus:outline-none focus:ring-4 focus:ring-white/40">{choice.label}</button>)}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center" aria-live="polite">
            <p className="text-sm font-semibold text-white/65">Votre voyage commence peut-être ici</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">{result.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{result.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={result.href} className="inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white hover:bg-brand-red-dark">Découvrir cette région <ArrowRight size={17} /></Link>
              <button type="button" onClick={restart} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20"><RotateCcw size={17} /> Refaire le quiz</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function GuideInteractive({ slug }: Props) {
  if (slug === "carte-interactive-rajasthan") return <RajasthanMap />;
  if (slug === "calendrier-voyage-inde") return <MonthCalendar />;
  if (slug === "checklist-valise-inde") return <PackingChecklist />;
  if (slug === "premier-voyage-inde") return <FirstTripOverview />;
  if (slug === "calendrier-festivals-inde") return <FestivalCalendar />;
  if (slug === "temps-trajets-inde") return <JourneyPlanner />;
  if (slug === "quelle-region-inde") return <RegionQuiz />;
  return null;
}
