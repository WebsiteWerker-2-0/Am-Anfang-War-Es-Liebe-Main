# Schlanke Redaktion: nur Aktuelles, Veranstaltungen und Dateien

Die Redaktion des Arbeitskreises soll im Backend nur das Nötigste ändern können und es ohne Vorkenntnisse bedienen. Das Backend hat deshalb für die Redaktion genau drei Bereiche: **Aktuelles**, **Veranstaltungen** (mit den Anmeldungen darin) und das **Dateiarchiv**. Admins sehen zusätzlich **Verwaltung** (Konten, E-Mail und Anmeldungen). Seiten, Anlaufstellen, Menü, Sprachwahl und Fußbereich sind **nicht** im Backend verwaltbar, auch nicht für Admins.

**Status:** angenommen, 17.10.2026. Ersetzt den Teil von ADR-0004, der alle Seiten im CMS pflegbar machte.

## Entscheidung

- **Im CMS (Payload):** `posts` (Aktuelles), `courses` (Veranstaltungen, Kurse und Termine mit Plätzen und Anmeldung, siehe ADR-0005), `registrations` (Anmeldungen), `media` (Dateiarchiv), `users` und die Global `mail`.
- **Nicht im CMS:** Seiten, Anlaufstellen, Menü, Sprachwahl, Hilfetelefon, Fußbereich, Postfächer der Kontaktseite. Sie stehen im Code (`website/src/content/`) und werden dort geändert (Pull Request, Prüfung, Deployment). Die Sammlungen `pages`, `services`, `events` und die Global `site` wurden samt Tabellen entfernt (Migration `…_cms_verschlanken`).
- **Menü:** Pro Bereich eine Gruppe aus einem Eintrag, deren Überschrift per CSS verschwindet, damit das Menü flach und groß wirkt (`app/(payload)/custom.css`). Die Gruppe „Verwaltung“ ist für Redakteurinnen ausgeblendet (`admin.hidden` nach Rolle). Die Sammlung `registrations` hat `group: false`: nicht im Menü, aber erreichbar, und zwar als Liste in der jeweiligen Veranstaltung (Join-Feld) und über die Startseite des Backends.
- **Dateien:** Hochgeladen wird direkt im Beitrag oder in der Veranstaltung. Das Dateiarchiv ist nur die Übersicht.
- **Einfach halten:** Die Adresse (Slug) von Beiträgen und Veranstaltungen ist für die Redaktion unsichtbar und bleibt beim Umbenennen stabil. Seltene Angaben stehen eingeklappt („Weitere Angaben“). Startseite des Backends mit großen Schaltflächen (`src/cms/components/Dashboard.tsx`), die Standard-Karten von Payload sind ausgeblendet.
- **Gestaltung:** Liquid Glass (durchscheinende Flächen mit Weichzeichner, warme Verläufe in Orange und Magenta der Broschüre), helle und dunkle Ansicht, Menüpunkte 19 px und 56 px hoch. Größen in px, weil Payload die Basisschrift auf 13 px setzt. Nur der Redaktionsbereich ist betroffen, nicht die Website.

## Folgen

- Die Website liest Seiten, Anlaufstellen, Menü und Fuß ausschließlich aus dem Code. `getPage`, `getSite` und `getServices` in `src/lib/content.ts` kennen das CMS nicht mehr. Aktuelles und Veranstaltungen kommen aus dem CMS, ohne CMS gilt der Altbestand und es gibt keine Veranstaltungen.
- Das Einspielen (`src/cms/seed.ts`) füllt nur noch die Beiträge der Altseite. Die Blöcke der Seiten (`src/components/blocks/`) und das Datenmodell bleiben, sie stellen den Standardinhalt dar.
- **Migrationen:** SQLite führt sie nicht als Ganzes aus, ein Fehler hinterlässt einen halb migrierten Stand. Vor jedem Veröffentlichen eine Migration an einer Datenbank im Zustand des Servers prüfen (siehe `docs/uebergabe-backend.md`). Die Migration `…_cms_verschlanken` ist von Hand umgestellt: Die Tabelle der Bearbeitungssperren wird zuerst neu gebaut, sonst scheitert `DROP TABLE` an den Fremdschlüsseln.
- Texte der Seiten ändern kann nur, wer Zugriff auf den Code hat. Das ist gewollt. Soll das später wieder gehen, braucht es eine neue Entscheidung.
