// Hilfen für Standardinhalte. Die Dateien in diesem Ordner sind reine Daten, damit
// das Seeding des CMS sie auch außerhalb von Next.js laden kann (keine Bildimporte).

/** Telefonnummer als Link, mit schmalem geschütztem Leerzeichen (wie PhoneLink) */
export function tel(number: string) {
  return `<a href="tel:${number.replace(/[^\d+]/g, "")}">${number.replace(/ /g, " ")}</a>`;
}
