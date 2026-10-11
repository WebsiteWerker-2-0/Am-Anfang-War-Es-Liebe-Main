// Datumsformate der Beiträge (Zeitzone Berlin)
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
