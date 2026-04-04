// Type-safe localStorage helpers (client-side only)

export function readJson<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as T;
    return parsed === null ? fallback : parsed;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

// ─── Storage Keys ─────────────────────────────────────────────────────────
export const KEYS = {
  USERS: "ty_users",
  SESSION: "ty_session",
  EVENTS: "ty_events",
  GUESTS: "ty_guests",
  FORMS: "ty_forms",
  SUBMISSIONS: "ty_submissions",
  SCAN_LOGS: "ty_scan_logs",
  SCANNER_SETTINGS: "ty_scanner_settings",
  QR_CODES: "ty_qr_codes",
} as const;
