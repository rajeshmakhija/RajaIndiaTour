"use client";

import { useEffect, useRef, useState } from "react";
import { Route, HeartHandshake, MapPin, Compass } from "lucide-react";

const tagline =
  "Agence de voyages en Inde, spécialisée dans l'organisation de circuits sur mesure";

const promises = [
  { icon: Route, label: "Voyage personnalisé" },
  { icon: HeartHandshake, label: "Accompagnement attentionné et sincère" },
  { icon: MapPin, label: "Agence locale sur place" },
  { icon: Compass, label: "Vivez des circuits inoubliables" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Don't compete with first paint — start video after a short idle.
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const enable = () => setShouldLoadVideo(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timeoutId = setTimeout(enable, 600);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      video.play().catch(() => {
        /* autoplay blocked */
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [shouldLoadVideo]);

  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <h1 className="sr-only">
        Voyages sur mesure en Inde — Raja India Tour
      </h1>

      <div className="hero-ticker-bar border-b border-cream-dark bg-white">
        <span className="hero-ticker-text text-sm font-medium text-black md:text-[15px]">
          {tagline}
        </span>
      </div>

      <div className="relative h-[calc(100svh-12rem)] min-h-[360px] w-full bg-[#1a2433] md:h-[calc(100svh-13rem)] md:min-h-[440px]">
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.15] contrast-[1.05] saturate-[1.08]"
            aria-label="Vidéo de présentation Raja India Tour"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
          aria-hidden="true"
        />

        <ul className="absolute bottom-20 right-4 z-10 max-w-[14rem] space-y-2 rounded-2xl border border-white/20 bg-black/35 p-3.5 shadow-lg backdrop-blur-md sm:max-w-xs sm:space-y-2.5 sm:p-4 md:bottom-6 md:right-6 md:max-w-sm">
          {promises.map((p) => (
            <li key={p.label} className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                <p.icon size={14} strokeWidth={2.2} />
              </span>
              <span className="text-[11px] font-semibold leading-snug text-white sm:text-sm">
                {p.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
