import { createHash, randomInt, timingSafeEqual } from "node:crypto";

// Codes für den zweiten Faktor, nur im Arbeitsspeicher (ein Prozess auf Hostinger). Nach einem Neustart
// fordert man einfach einen neuen Code an. Gespeichert wird nur ein Hash des Codes.

const CODE_LIFETIME = 10 * 60 * 1000;
const RESEND_AFTER = 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_SENDS_PER_HOUR = 6;

type Entry = { hash: Buffer; expires: number; attempts: number; sentAt: number; sends: number[] };
// Auf globalThis, damit Seite und Server-Aktionen sicher denselben Speicher nutzen
const store = globalThis as typeof globalThis & { aalTwoFactorCodes?: Map<string, Entry> };
const codes = (store.aalTwoFactorCodes ??= new Map<string, Entry>());

const hash = (code: string) => createHash("sha256").update(`${process.env.PAYLOAD_SECRET ?? ""}:${code}`).digest();

export type IssueResult = { code: string } | { wait: "resend" | "hourly" } | { active: true };

/** Neuen Code erzeugen. Ohne `force` nur, wenn kein gültiger Code mehr offen ist. */
export function issueCode(session: string, force = false): IssueResult {
  const now = Date.now();
  const entry = codes.get(session);
  if (entry && !force && entry.expires > now && entry.attempts < MAX_ATTEMPTS) return { active: true };
  const sends = (entry?.sends ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (entry && now - entry.sentAt < RESEND_AFTER) return { wait: "resend" };
  if (sends.length >= MAX_SENDS_PER_HOUR) return { wait: "hourly" };
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  codes.set(session, { hash: hash(code), expires: now + CODE_LIFETIME, attempts: 0, sentAt: now, sends: [...sends, now] });
  return { code };
}

export type CheckResult = "ok" | "wrong" | "expired" | "locked";

export function checkCode(session: string, input: string): CheckResult {
  const entry = codes.get(session);
  if (!entry || entry.expires < Date.now()) return "expired";
  if (entry.attempts >= MAX_ATTEMPTS) return "locked";
  entry.attempts += 1;
  const given = hash(input.replace(/\s/g, ""));
  if (!timingSafeEqual(given, entry.hash)) return entry.attempts >= MAX_ATTEMPTS ? "locked" : "wrong";
  codes.delete(session);
  return "ok";
}
