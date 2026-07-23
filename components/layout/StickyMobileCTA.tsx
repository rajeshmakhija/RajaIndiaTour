"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-cream-dark bg-white/95 p-3 backdrop-blur-md md:hidden shadow-lg">
      <Button href="/contact" variant="primary" className="w-full">
        Demander un devis gratuit
      </Button>
    </div>
  );
}
