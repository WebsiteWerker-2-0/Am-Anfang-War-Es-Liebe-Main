import data from "./posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  image: string | null;
  html: string;
  source: string;
};

// Beiträge der Altseite, erzeugt mit altseite/import-posts.py.
// Wird durch das CMS ersetzt (ADR-0001).
export const posts = data as Post[];

export function findPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

const TIME_ZONE = "Europe/Berlin";
const longDate = new Intl.DateTimeFormat("de-DE", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});
const shortMonth = new Intl.DateTimeFormat("de-DE", { month: "short", timeZone: TIME_ZONE });

// Mittag statt Mitternacht, damit die Zeitzone das Datum nicht verschiebt
function toDate(iso: string) {
  return new Date(iso + "T12:00:00");
}

export function formatDate(iso: string) {
  return longDate.format(toDate(iso));
}

export function dateParts(iso: string) {
  const d = toDate(iso);
  return { day: String(d.getDate()), month: shortMonth.format(d), year: String(d.getFullYear()) };
}
