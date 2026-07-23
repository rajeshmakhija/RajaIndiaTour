"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import type { TourDay } from "@/lib/data/tours";

export function ItineraryOverview({ days }: { days: TourDay[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">Faites défiler les {days.length} jours du circuit</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scroll(1)}
            disabled={!canRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2"
      >
        {days.map((d) => (
          <a
            key={d.day}
            href={`#jour-${d.day}`}
            data-card
            className="group w-[70vw] max-w-[240px] shrink-0 snap-start sm:w-[42vw] md:w-[220px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cream-dark shadow-sm">
              <Image
                src={d.image}
                alt={d.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 70vw, 240px"
              />
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-red">
              Jour {d.day}
            </p>
            <h3 className="mt-1 flex items-center gap-1 font-display text-base font-bold text-ink underline decoration-cream-dark decoration-2 underline-offset-4 group-hover:text-brand-blue">
              {d.title}
              <ArrowDown size={14} className="shrink-0 text-muted" />
            </h3>
          </a>
        ))}
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 -right-4 w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 ${
          canRight ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
