// Einfache Begrenzung je Adresse und Stunde, nur im Arbeitsspeicher (die App läuft als ein Prozess).
// Gespeichert wird nur die Uhrzeit der Anfragen, nicht ihr Inhalt.
export function rateLimiter(limit: number) {
  const attempts = new Map<string, number[]>();
  return function tooMany(ip: string | undefined) {
    // Ohne bekannte Adresse gäbe es nur einen gemeinsamen Zähler für alle: dann keine Begrenzung
    if (!ip) return false;
    const now = Date.now();
    const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
    recent.push(now);
    attempts.set(ip, recent);
    if (attempts.size > 5000) attempts.clear();
    return recent.length > limit;
  };
}

/** Erste Adresse aus x-forwarded-for (Hostinger setzt sie) */
export const clientIp = (request: Request) => request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;

/** Nur Anfragen von dieser Website, nicht von fremden Seiten */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  return !(origin && host && new URL(origin).host !== host);
}
