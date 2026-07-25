"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CONSENT_STORAGE_KEY, type ConsentChoice } from "@/lib/consent";
import {
  captureFbclid,
  detectAndRememberMetaTraffic,
  trackMetaEvent,
} from "@/lib/meta/client";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Loads Meta Pixel only for Meta-sourced visitors (fbclid / _fbc / FB-IG referrer)
 * after cookie consent, then fires ViewContent (Pixel + CAPI).
 */
export function MetaPixel() {
  const [allowed, setAllowed] = useState(false);
  const [fromMeta, setFromMeta] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const lastPath = useRef<string>("");

  useEffect(() => {
    captureFbclid();
    setFromMeta(detectAndRememberMetaTraffic());

    const syncConsent = () => {
      try {
        const c = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
        setAllowed(c === "granted");
      } catch {
        setAllowed(false);
      }
    };
    syncConsent();

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<ConsentChoice>).detail;
      setAllowed(detail === "granted");
      if (detail === "granted") lastPath.current = "";
      setFromMeta(detectAndRememberMetaTraffic());
    };
    window.addEventListener("rit-consent", onConsent as EventListener);
    return () => window.removeEventListener("rit-consent", onConsent as EventListener);
  }, []);

  useEffect(() => {
    if (!allowed || !fromMeta || !PIXEL_ID || !scriptReady) return;

    const fire = () => {
      const path = window.location.pathname + window.location.search;
      if (lastPath.current === path) return;
      lastPath.current = path;
      captureFbclid();
      void trackMetaEvent("ViewContent");
    };

    fire();

    const onNav = () => {
      window.setTimeout(fire, 80);
    };
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, [allowed, fromMeta, scriptReady]);

  if (!PIXEL_ID || !allowed || !fromMeta) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onReady={() => setScriptReady(true)}
    >
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
