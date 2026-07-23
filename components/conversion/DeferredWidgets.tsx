"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StickyMobileCTA = dynamic(
  () =>
    import("@/components/layout/StickyMobileCTA").then((m) => m.StickyMobileCTA),
  { ssr: false },
);

const ChatWidget = dynamic(
  () =>
    import("@/components/conversion/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
);

const ContactPopup = dynamic(
  () =>
    import("@/components/conversion/ContactPopup").then((m) => m.ContactPopup),
  { ssr: false },
);

/** Load conversion widgets after first paint so they don't slow navigation. */
export function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (!cancelled) setReady(true);
    };

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(enable, 1200);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <StickyMobileCTA />
      <ChatWidget />
      <ContactPopup />
    </>
  );
}
