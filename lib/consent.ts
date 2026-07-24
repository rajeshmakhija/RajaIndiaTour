/** localStorage key for the visitor's cookie / Consent Mode choice */
export const CONSENT_STORAGE_KEY = "rit_cookie_consent";

export type ConsentChoice = "granted" | "denied";

export const CONSENT_GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const;

export const CONSENT_DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Tell GA / GTM the visitor accepted or refused tracking. */
export function updateConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", choice === "granted" ? CONSENT_GRANTED : CONSENT_DENIED);
}
