# Payload CMS im selben Projekt unter /backend

Der Arbeitskreis pflegt die Website selbst (F-05 bis F-07). Dafür läuft Payload CMS (selbst gehostet, SQLite) als Teil der Next.js-App unter `/backend`, mit eigenem Root-Layout. Damit bleibt ein Deployment für Vercel-Vorschau und Hostinger, und es gehen keine Inhalte an Dritte (ADR-0002). Das Backend ist wie die Website aufgebaut: jede Seite ist ein Eintrag mit denselben Blöcken in derselben Reihenfolge, dazu Beiträge, Veranstaltungen, Anlaufstellen, Dateien sowie Kopf und Fuß.

**Status:** angenommen, 11.10.2026

## Folgen

- Konten gibt es nur durch eine Admin, es gibt keine Registrierung. Das erste Konto entsteht per `npm run cms:create-admin`; der Weg über den Browser ist ohne `CMS_ALLOW_FIRST_USER=true` gesperrt (`src/proxy.ts`).
- `/backend` ist nirgends verlinkt, sendet `X-Robots-Tag: noindex` und `Cache-Control: no-store`. Die CSP der Website gilt dort nicht, weil die Admin-Oberfläche Inline-Skripte braucht. GraphQL ist abgeschaltet.
- Zwei Root-Layouts brauchen `src/app/global-not-found.tsx` (experimentell in Next.js 16), sonst verlöre die 404-Seite den Notausgang. Das Seitengerüst liegt gemeinsam in `SiteDocument`. Die Beitragsseite leitet unbekannte Adressen auf `/aktuelles` um, weil `notFound()` bei zur Laufzeit erzeugten Seiten nur eine leere Hülle liefert.
- **Die Website ist nie vom CMS abhängig.** Der Standardinhalt in `src/content/` (HTML-Zeichenketten und Bildschlüssel, ohne Bildimporte) füllt ein leeres CMS beim ersten Start und ersetzt es, solange es fehlt oder nicht erreichbar ist (`src/lib/content.ts`). Beim Bauen gibt es keine Datenbank, die Seiten entstehen aus dem Standardinhalt und werden zur Laufzeit alle 60 Sekunden und nach jeder Änderung im Backend neu erzeugt.
- Der Text liegt im CMS als Lexical-Zustand und wird mit denselben Klassen dargestellt wie der Standardinhalt (`src/lib/rich.tsx`, `src/lib/html-to-jsx.tsx`). Das Markup entspricht den früheren handgeschriebenen Seiten; bekannte Abweichungen: Spurensicherung auf der Hilfeseite hat einen Umbruch mehr, der Hinweis auf der Kursseite ist ein Absatz statt eines Kastens mit Absatz, Beitragsseiten zeigen Bilder und Dokumente nach der neuen Struktur.
- Seiten lassen sich bearbeiten, nicht anlegen oder löschen. Die Struktur der Website bleibt festgelegt, neue Seiten brauchen Navigation und Programmierung.
- Öffentlich lesbar sind nur veröffentlichte Beiträge und als öffentlich markierte Dateien. Dateien erscheinen unter `/dateien/<Name>`, nie unter `/backend`.
- Datenbank, Uploads und das Zugangsgeheimnis liegen im Datenordner (`CMS_DATA_DIR`, Standard `~/cms-data` im Produktivbetrieb), nicht im Git. Das Geheimnis wird beim ersten Start erzeugt (Datei `.secret`, Rechte 600), wenn `PAYLOAD_SECRET` fehlt. So braucht die App auf Hostinger keine Umgebungsvariablen, die dort nicht zuverlässig ankommen. Das erste Konto wird über die Datei `ALLOW_FIRST_USER` im Datenordner freigegeben, die nach dem ersten Konto verschwindet. Auf Vercel ist der Speicher flüchtig, dort zeigt die Vorschau den Standardinhalt. Auf Hostinger ist vor dem Umzug zu klären, ob Dateien ein Deployment überleben.
- Hostinger findet die App in `website/` selbst und baut `main` bei jedem Push (Node 22, `npm run build`). Der Build nutzt Webpack, weil Turbopack dort bei der CSS-Verarbeitung abbricht (eigener PostCSS-Prozess).
- Kontaktanfragen dürfen nicht im CMS landen (ADR-0003). Veranstaltungen und Anmeldungen (F-11) sind als Felder und Sammlung angelegt, aber noch nicht auf der Website angebunden.
