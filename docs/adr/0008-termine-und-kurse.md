# Termine und Kurse getrennt, Kurse im Backend

Auf Wunsch des Auftraggebers (31.10.2026) heißt der Bereich „Veranstaltungen“ jetzt **Termine**, daneben gibt es **Kurse**. Termine sind datierte Angebote mit Plätzen und Anmeldung (ADR-0005). Kurse sind die Beschreibungen von Krav Maga / Kids Krav Maga und Wen Do, bisher fest im Code, jetzt als bearbeitbare Einträge im Backend.

**Status:** angenommen, 31.10.2026. Ergänzt ADR-0005 und ADR-0006.

## Entscheidung

- **Website:** Menüpunkte „Termine“ (`/termine`, Terminliste mit Anmeldung) und „Kurse“ (`/kurse`, Überschrift laut Dokument „Selbstverteidigungs- und Selbstbehauptungskurse“, Sprungmarken zu den Kursen und zu „Termine und Anmeldung“). Die Schnittstellen bleiben `/api/kurse` und `/api/kurse/anmeldung`.
- **Backend:** Menü Aktuelles, Termine, Kurse, Dateiarchiv (Verwaltung für Admins). Gleiche Bauart wie die übrigen Bereiche (Gruppe mit einem Eintrag, Überschrift per CSS ausgeblendet, Vorschau, Status, Reihenfolge per Ziehen).
- **Sammlungen:** `courses` bleibt der Name der Termine in Datenbank und Code (Umbenennen hieße Tabellen umbauen). Die Kurse sind die neue Sammlung `course-offers` (Name, Text, Status).
- **Wortlaut:** Die Kurstexte stammen unverändert aus dem offiziellen Dokument „KravMaga_WenDo AK_Internetseite.docx“ (`src/content/course-offers.ts`). Nur Layout ist umgesetzt: Trennlinie entfernt, fette Zwischenzeilen als Zwischenüberschriften, Aufzählungen als Listen, Internetadresse als Link. Beim Start legt `cms/seed.ts` die beiden Kurse an, solange es keinen Kurs gibt. Geprüft: Text im Backend zeichengleich mit dem Dokument.

## Folgen

- Werden alle Kurse gelöscht, kommen beim nächsten Start die Kurse aus dem Dokument zurück, und die Website zeigt sie auch ohne Neustart. Einen Kurs nicht mehr zeigen: Status „Archiviert“.
- Das Dokument nannte für Krav Maga zwei Altersangaben (ab 14 und ab 15 Jahren). Seit 31.10.2026 einheitlich „ab 15 Jahren“ (Entscheidung Steffen, Datenmigration `…_kurs_alter`); Bestätigung und weitere Rückfragen in `knowledgebase/lieferungen-ag.md`.
