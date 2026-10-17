// Zweiter Faktor für das Backend: Nach dem Passwort schickt die Website einen Code an die E-Mail-Adresse
// des Kontos (Seite /backend/zwei-faktor). Ist er richtig, setzt sie das Cookie „aal-2fa“, das an die
// Anmeldesitzung gebunden ist (Konto und Sitzungsnummer aus dem Payload-Token). Ohne gültiges Cookie
// lässt proxy.ts keine Backend-Seite und keinen Backend-Aufruf mit Anmeldung durch.
// Nur Web Crypto, damit proxy.ts diese Datei nutzen kann.
// Notschalter: CMS_TWO_FACTOR=false (Umgebungsvariable) schaltet den zweiten Faktor ab, etwa wenn der
// E-Mail-Versand ausfällt und sich niemand mehr anmelden kann.

export const TWO_FACTOR_COOKIE = "aal-2fa";
export const TWO_FACTOR_PATH = "/backend/zwei-faktor";
export const PAYLOAD_TOKEN_COOKIE = "payload-token";
/** Gültigkeit der Bestätigung: so lange wie die Anmeldung selbst (Users.ts, tokenExpiration) */
export const TWO_FACTOR_MAX_AGE = 60 * 60 * 8;

export function twoFactorEnabled() {
  return process.env.CMS_TWO_FACTOR !== "false";
}

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer) {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Konto und Sitzung aus einem Payload-Token (JWT). Die Signatur prüft Payload selbst. */
export function sessionKey(token: string | undefined | null): string | null {
  const part = token?.split(".")[1];
  if (!part) return null;
  try {
    const json = JSON.parse(atob(part.replace(/-/g, "+").replace(/_/g, "/"))) as { id?: unknown; sid?: unknown; collection?: unknown };
    if (json.id === undefined || json.id === null) return null;
    return `${String(json.collection ?? "users")}:${String(json.id)}:${String(json.sid ?? "")}`;
  } catch {
    return null;
  }
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(`zwei-faktor:${process.env.PAYLOAD_SECRET ?? ""}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

/** Wert des Cookies nach richtig eingegebenem Code */
export async function createProof(session: string) {
  const expires = Math.floor(Date.now() / 1000) + TWO_FACTOR_MAX_AGE;
  return `${expires}.${await sign(`${session}|${expires}`)}`;
}

/** Gehört das Cookie zu dieser Anmeldesitzung und ist es noch gültig? */
export async function verifyProof(proof: string | undefined | null, session: string | null) {
  if (!proof || !session) return false;
  const [expires, signature] = proof.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = await sign(`${session}|${expires}`);
  // Vergleich ohne frühen Abbruch
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

/** Token aus Cookie oder Kopfzeile „Authorization: JWT …“ bzw. „Bearer …“ */
export function tokenFrom(cookie: string | undefined, authorization: string | null) {
  if (cookie) return cookie;
  const match = authorization?.match(/^(?:JWT|Bearer)\s+(.+)$/i);
  return match?.[1] ?? null;
}
