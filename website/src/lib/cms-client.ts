import type { Payload } from "payload";

// Zugang zum CMS für die öffentlichen Seiten. Liefert null, wenn das CMS nicht genutzt
// wird oder nicht startet; die Seiten zeigen dann den Standardinhalt aus `content/`.

/** Soll die Website ihre Inhalte aus dem CMS lesen? */
export function cmsEnabled() {
  // Beim Bauen gibt es keine Datenbank, die Seiten entstehen aus dem Standardinhalt.
  // Zur Laufzeit holen sich die Seiten per Neuberechnung den Stand aus dem CMS.
  if (process.env.NEXT_PHASE === "phase-production-build") return false;
  if (!process.env.PAYLOAD_SECRET) return false;
  const setting = process.env.CMS_CONTENT;
  if (setting === "true" || setting === "false") return setting === "true";
  // Auf Vercel ist der Speicher flüchtig (auch Uploads): die Vorschau zeigt den Standardinhalt,
  // außer CMS_CONTENT=true ist ausdrücklich gesetzt.
  return !process.env.VERCEL;
}

let loading: Promise<Payload | null> | undefined;

export function getCms(): Promise<Payload | null> {
  if (!cmsEnabled()) return Promise.resolve(null);
  loading ??= (async () => {
    try {
      const [{ getPayload }, { default: config }] = await Promise.all([import("payload"), import("@payload-config")]);
      return await getPayload({ config });
    } catch (error) {
      console.error("CMS nicht erreichbar, die Seiten zeigen den Standardinhalt.", error);
      loading = undefined;
      return null;
    }
  })();
  return loading;
}
