// Postfächer und Anliegen der Kontaktanfrage (F-04), Angaben vom AG am 11.10.2026 (Z-09, teilweise).
// OFFEN: Anliegen-Kategorien vom AG bestätigen lassen

export type Mailbox = { id: "help" | "information"; label: string; email: string };

export const mailboxes = {
  /** Wer aktiv Hilfe sucht */
  help: {
    id: "help",
    label: "Sie suchen Hilfe",
    email: "frauenberatungsstelle@awo-hoexter.de",
  },
  /** Wer Informationen braucht */
  information: {
    id: "information",
    label: "Sie möchten sich informieren",
    email: "gleichstellung@kreis-hoexter.de",
  },
} satisfies Record<Mailbox["id"], Mailbox>;

/** Anliegen im Kontaktformular und das Postfach, an das die Kontaktanfrage zugestellt wird */
export const concerns: { label: string; mailbox: Mailbox["id"] }[] = [
  { label: "Ich brauche Hilfe für mich", mailbox: "help" },
  { label: "Ich mache mir Sorgen um eine andere Person", mailbox: "help" },
  { label: "Ich habe eine Frage an den Arbeitskreis", mailbox: "information" },
  { label: "Etwas anderes", mailbox: "information" },
];
