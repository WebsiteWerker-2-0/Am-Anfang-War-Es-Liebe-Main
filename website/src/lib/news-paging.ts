// Seiten der Beitragsliste auf „Aktuelles“. Die Auswahl steht in der Adresse (?anzahl=25&seite=2),
// damit sie ohne JavaScript funktioniert und nichts im Browser gespeichert wird.
export const PER_PAGE_OPTIONS = [10, 25, 50] as const;
const DEFAULT_PER_PAGE = PER_PAGE_OPTIONS[0];

export type NewsPagingParams = { anzahl?: string | string[]; seite?: string | string[] };

export type NewsPaging = { perPage: number; page: number; pageCount: number; start: number; end: number };

/** Ungültige oder zu große Werte aus der Adresse fallen auf den nächsten gültigen Wert zurück */
export function newsPaging(total: number, params: NewsPagingParams = {}): NewsPaging {
  const perPage = PER_PAGE_OPTIONS.find((option) => String(option) === params.anzahl) ?? DEFAULT_PER_PAGE;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  const requested = typeof params.seite === "string" && /^\d+$/.test(params.seite) ? Number(params.seite) : 1;
  const page = Math.min(Math.max(1, requested), pageCount);
  const start = (page - 1) * perPage;
  return { perPage, page, pageCount, start, end: Math.min(start + perPage, total) };
}

export function newsPageHref(perPage: number, page: number) {
  const query = new URLSearchParams();
  if (perPage !== DEFAULT_PER_PAGE) query.set("anzahl", String(perPage));
  if (page > 1) query.set("seite", String(page));
  const search = query.toString();
  return `/aktuelles${search ? `?${search}` : ""}#beitraege`;
}
