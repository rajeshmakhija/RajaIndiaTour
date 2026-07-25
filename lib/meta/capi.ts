import { createHash } from "node:crypto";

const API_VERSION = process.env.META_API_VERSION ?? "v21.0";

export type MetaStandardEvent = "ViewContent" | "Contact" | "Search" | "Lead";

export type MetaCapiEvent = {
  event_name: MetaStandardEvent;
  event_id: string;
  event_source_url: string;
  client_user_agent: string;
  email?: string;
  fbp?: string;
  fbc?: string;
  client_ip_address?: string;
  /** Optional search term for Search events */
  search_string?: string;
  event_time?: number;
};

function pixelId(): string | undefined {
  return process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined;
}

function accessToken(): string | undefined {
  return process.env.META_DATA_API_TOKEN || undefined;
}

/** Normalize + SHA-256 hash for Meta user_data fields. */
export function hashUserData(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function buildPayload(events: MetaCapiEvent[]) {
  return {
    data: events.map((event) => {
      const user_data: Record<string, unknown> = {
        client_user_agent: event.client_user_agent,
      };
      if (event.email) user_data.em = [hashUserData(event.email)];
      if (event.fbp) user_data.fbp = event.fbp;
      if (event.fbc) user_data.fbc = event.fbc;
      if (event.client_ip_address) user_data.client_ip_address = event.client_ip_address;

      const custom_data: Record<string, string> = {};
      if (event.search_string) custom_data.search_string = event.search_string;

      return {
        event_name: event.event_name,
        event_time: event.event_time ?? Math.floor(Date.now() / 1000),
        event_id: event.event_id,
        event_source_url: event.event_source_url,
        action_source: "website",
        user_data,
        ...(Object.keys(custom_data).length ? { custom_data } : {}),
      };
    }),
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };
}

/**
 * Send Conversions API events to Meta.
 * No-ops (returns null) when pixel ID or token is missing.
 */
export async function sendMetaCapiEvents(
  events: MetaCapiEvent[],
): Promise<{ events_received?: number; error?: string } | null> {
  if (!events.length) return null;

  const id = pixelId();
  const token = accessToken();
  if (!id || !token) {
    console.warn("Meta CAPI skipped: META_PIXEL_ID or META_DATA_API_TOKEN missing");
    return null;
  }

  const url = `https://graph.facebook.com/${API_VERSION}/${id}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(events)),
    });
    const body = (await res.json().catch(() => ({}))) as {
      events_received?: number;
      error?: { message?: string };
    };
    if (!res.ok) {
      console.error("Meta CAPI error:", res.status, body);
      return { error: body.error?.message ?? `HTTP ${res.status}` };
    }
    return { events_received: body.events_received };
  } catch (err) {
    console.error("Meta CAPI request failed:", err);
    return { error: err instanceof Error ? err.message : "request failed" };
  }
}

export function isMetaConfigured(): boolean {
  return Boolean(pixelId() && accessToken());
}
