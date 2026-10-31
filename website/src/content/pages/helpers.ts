// Hilfen für Standardinhalte. Die Dateien in diesem Ordner sind reine Daten, damit
// das Seeding des CMS sie auch außerhalb von Next.js laden kann (keine Bildimporte).

/** Telefonnummer als Link, mit schmalem geschütztem Leerzeichen (wie PhoneLink) */
export function tel(number: string) {
  return `<a href="tel:${number.replace(/[^\d+]/g, "")}">${number.replace(/ /g, " ")}</a>`;
}

// Tafeln der Wanderausstellung 2022, gerendert aus dem Ausstellungs-PDF der Altseite. Für Startseite und Infos.
// OFFEN: Kurztexte und Alternativtexte vom AG (Z-07)
export const exhibitionPanels = [
  { image: { asset: "exhibition/panel-01" }, title: "Am Anfang war es Liebe …" },
  { image: { asset: "exhibition/panel-02" }, title: "Häusliche Gewalt ist durch nichts zu rechtfertigen" },
  { image: { asset: "exhibition/panel-03" }, title: "Formen von häuslicher Gewalt erkennen" },
  { image: { asset: "exhibition/panel-04" }, title: "Hilfen aus der Gewalt" },
  { image: { asset: "exhibition/panel-05" }, title: "Erste Unterstützung für Frauen in Not" },
  { image: { asset: "exhibition/panel-06" }, title: "Beratung für Frauen und Mädchen in der Region" },
  { image: { asset: "exhibition/panel-07" }, title: "Wer schlägt, der geht! Ruf 110" },
  { image: { asset: "exhibition/panel-08" }, title: "Wenn das Kindeswohl gefährdet ist" },
  { image: { asset: "exhibition/panel-09" }, title: "Das liebe Geld: Es geht auch ohne ihn" },
  { image: { asset: "exhibition/panel-10" }, title: "Du hast eine Vermutung?" },
  { image: { asset: "exhibition/panel-11" }, title: "Was Sie selbst tun können" },
  { image: { asset: "exhibition/panel-12" }, title: "Die Idee des Arbeitskreises" },
];

export const exhibitionBooking = `Sie möchten die Ausstellung zeigen? Schreiben Sie an <a href="mailto:gleichstellung@kreis-hoexter.de">gleichstellung@kreis-hoexter.de</a>.`;
