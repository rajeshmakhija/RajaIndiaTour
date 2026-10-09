import { CONSENT_STORAGE_KEY } from "@/lib/consent";

export type MetaBrowserEvent = "ViewContent" | "Contact" | "Search" | "Lead";

/** Session flag: visitor arrived via Meta (ad click / Facebook / Instagram). */
const META_TRAFFIC_KEY = "rit_from_meta";
let pendingFbclid: string | null = null;
let observedMetaTraffic = false;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function hasMarketingConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function isMetaReferrer(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const host = new URL(document.referrer).hostname.toLowerCase();
    return ["facebook.com", "fb.com", "fb.me", "instagram.com"].some(
      (domain) => host === domain || host.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

/**
 * Detect Meta-sourced traffic and remember it for the browser session
 * so later pages / form submits still count as Meta.
 */
export function detectAndRememberMetaTraffic(): boolean {
  if (typeof window === "undefined") return false;

  if (hasMarketingConsent()) {
    try {
      if (sessionStorage.getItem(META_TRAFFIC_KEY) === "1") return true;
    } catch {
      /* private mode */
    }
  }

  const params = new URLSearchParams(window.location.search);
  const hasFbclid = Boolean(params.get("fbclid") || pendingFbclid);
  const hasFbc = Boolean(readCookie("_fbc"));
  const fromMeta = observedMetaTraffic || hasFbclid || hasFbc || isMetaReferrer();

  if (fromMeta) {
    observedMetaTraffic = true;
    if (hasMarketingConsent()) {
      try {
        sessionStorage.setItem(META_TRAFFIC_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }

  return fromMeta;
}

/** True only for visitors who came from Meta (this session). */
export function isFromMetaTraffic(): boolean {
  return detectAndRememberMetaTraffic();
}

/** Persist fbclid as _fbc for Meta attribution (ads click → site). */
export function captureFbclid(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  pendingFbclid = params.get("fbclid") || pendingFbclid;
  if (!hasMarketingConsent()) return undefined;
  const fbclid = pendingFbclid;
  if (!fbclid) return readCookie("_fbc");

  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  const maxAge = 90 * 24 * 60 * 60;
  document.cookie = `_fbc=${encodeURIComponent(fbc)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  pendingFbclid = null;
  try {
    sessionStorage.setItem(META_TRAFFIC_KEY, "1");
  } catch {
    /* ignore */
  }
  return fbc;
}

export function clearMetaTrackingCookies(): void {
  if (typeof document === "undefined") return;
  const domain = window.location.hostname.replace(/^www\./, "");
  for (const name of ["_fbc", "_fbp"]) {
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
    document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax; domain=${domain}`;
  }
  try {
    sessionStorage.removeItem(META_TRAFFIC_KEY);
  } catch {
    /* ignore */
  }
}

export function getMetaClickIds(): { fbp?: string; fbc?: string } {
  const fbc = captureFbclid();
  const fbp = readCookie("_fbp");
  return {
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };
}

/** Fire browser Pixel + CAPI only for Meta traffic + consent. */
export async function trackMetaEvent(
  eventName: MetaBrowserEvent,
  options: {
    email?: string;
    searchString?: string;
    eventId?: string;
  } = {},
): Promise<string | null> {
  if (typeof window === "undefined") return null;
  if (!hasMarketingConsent()) return null;
  if (!isFromMetaTraffic()) return null;

  const eventId = options.eventId ?? newEventId();
  const { fbp, fbc } = getMetaClickIds();
  const event_source_url = window.location.href;
  const client_user_agent = navigator.userAgent;

  if (typeof window.fbq === "function") {
    const params: Record<string, string> = {};
    if (options.searchString) params.search_string = options.searchString;
    window.fbq("track", eventName, params, { eventID: eventId });
  }

  // The contact endpoint sends these CAPI conversions after email delivery.
  if (eventName === "Lead" || eventName === "Contact") return eventId;

  try {
    await fetch("/api/meta/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        events: [
          {
            event_name: eventName,
            event_id: eventId,
            event_source_url,
            client_user_agent,
            fbp,
            fbc,
            search_string: options.searchString,
          },
        ],
      }),
      keepalive: true,
    });
  } catch {
    /* non-blocking */
  }

  return eventId;
}

/** Payload to attach to /api/contact for server-side Lead + Contact. */
export function metaFormContext(): {
  marketingConsent: boolean;
  fromMeta: boolean;
  eventSourceUrl: string;
  clientUserAgent: string;
  fbp?: string;
  fbc?: string;
  leadEventId: string;
  contactEventId: string;
} {
  const fromMeta = isFromMetaTraffic();
  const { fbp, fbc } = fromMeta ? getMetaClickIds() : {};
  return {
    marketingConsent: hasMarketingConsent(),
    fromMeta,
    eventSourceUrl: typeof window !== "undefined" ? window.location.href : "",
    clientUserAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    fbp,
    fbc,
    leadEventId: newEventId(),
    contactEventId: newEventId(),
  };
}
