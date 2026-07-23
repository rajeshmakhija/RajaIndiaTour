"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { DestinationPlace } from "@/lib/data/destinations";

export function PlacesCarousel({ places }: { places: DestinationPlace[] }) {
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
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Arrows */}
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Faire défiler vers la gauche"
          onClick={() => scroll(-1)}
          disabled={!canLeft}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-cream-dark disabled:hover:text-ink"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Faire défiler vers la droite"
          onClick={() => scroll(1)}
          disabled={!canRight}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-dark bg-white text-ink shadow-sm transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-cream-dark disabled:hover:text-ink"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
      >
        {places.map((place, i) => (
          <article
            key={place.name}
            data-card
            className="w-[75vw] max-w-[280px] shrink-0 snap-start sm:w-[46vw] md:w-[260px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-cream-dark shadow-sm">
              <Image
                src={place.image}
                alt={place.name}
                fill
                loading={i < 3 ? "eager" : "lazy"}
                quality={70}
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width:768px) 75vw, 280px"
              />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-ink underline decoration-cream-dark decoration-2 underline-offset-4">
              {place.name}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {place.description}
            </p>
          </article>
        ))}
      </div>

      {/* Right edge fade hint */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 -right-4 w-16 bg-gradient-to-l from-white to-transparent transition-opacity duration-300 ${
          canRight ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
