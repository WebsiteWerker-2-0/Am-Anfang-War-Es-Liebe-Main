# Übergabe: Backend, Kurse und Betrieb

Stand 17.10.2026. Dieses Dokument bringt eine neue Sitzung (oder Person) auf den Stand des Redaktionsbereichs. Lesereihenfolge: `CLAUDE.md`, dieses Dokument, dann die ADRs 0004 und 0005 in `docs/adr/`. Für Redakteurinnen gibt es ein eigenes Handbuch: `docs/redaktion-handbuch.md`. Zugangsdaten stehen nirgends im Repository (das Repo ist öffentlich).

## Was es gibt

- Website: Next.js 16 (App Router) in `website/`, ISR (60 s), keine externen Ressourcen.
- Redaktionsbereich unter `/backend`: Payload CMS 3.90 im selben Projekt (SQLite, Konten nur durch Admins), Oberfläche auf Deutsch.
- Das Backend ist wie die Website aufgebaut: jede der 12 Seiten ist ein Eintrag mit denselben Blöcken in derselben Reihenfolge. Dazu Aktuelles, Kurse mit Anmeldung, Anlaufstellen, Dateien, Kopf und Fuß, E-Mail-Einstellungen.
- Läuft produktiv-ähnlich auf **Hostinger** (Node.js-Web-App, baut `main` bei jedem Push) und als Vorschau auf **Vercel** (dort zeigt die Website den Standardinhalt, das Backend ist nur eine Demo mit flüchtigen Daten).

## Wie Inhalte laufen

```
Standardinhalt (website/src/content/)  ──seed──►  CMS-Datenbank  ──lesen──►  Website
        ▲ Vorlage und Ersatz                          ▲ Redaktion ändert hier
```

- `src/content/pages/*.ts`: Standardinhalt jeder Seite im Datenmodell `src/content/model.ts` (Blöcke, Text als HTML-Zeichenkette, Bilder als Schlüssel). Reine Daten ohne Bildimporte, damit auch Skripte sie laden können. `src/content/site.ts` (Menü, Fuß), `support-services.ts` (Anlaufstellen), `posts.json` (Beiträge der Altseite).
- `src/lib/content.ts` liest zuerst das CMS und fällt auf den Standardinhalt zurück (`cmsEnabled()` in `src/lib/cms-client.ts`: aus beim Bauen, ohne `PAYLOAD_SECRET`, auf Vercel). **Die Website ist nie vom CMS abhängig.**
- Seeding (`src/cms/seed.ts`) läuft bei jedem Start über `onInit` und füllt fehlende Teile (je Seite, Anlaufstelle, Beitrag einzeln, Fehler einzelner Teile legen das Backend nicht lahm). `CMS_SEED=false` schaltet es ab.
- Änderungen im Backend lösen `revalidateSite()` aus (`src/cms/revalidate.ts`), die Seiten sind nach Sekunden aktuell.
- Darstellung der Blöcke: `src/components/blocks/index.tsx`, Seitenrahmen `CmsPage.tsx`, Text `src/lib/rich.tsx` (CMS-Text und HTML-Standardinhalt mit denselben Klassen), `src/lib/html-to-jsx.tsx`.
- Neuer Blocktyp = Typ in `model.ts`, Payload-Block in `src/cms/blocks/page-blocks.ts`, Renderer, Umwandlung in `seed.ts` (`convertBlock`), Standardinhalt.

## Kurse und Anmeldung (ADR-0005)

- Sammlungen `courses` und `registrations`, Global `mail` (nur Admins). Logik in `src/lib/courses.ts`, `registration.ts`, `mail.ts`.
- Öffentliche Schnittstellen: `GET /api/kurse` (Stand, ohne Cache), `POST /api/kurse/anmeldung`. Die Kursliste `src/components/CourseList.tsx` ist eine Client-Komponente, fragt alle 30 s nach und lädt auch nach, wenn die Seite ohne Kurse erzeugt wurde.
- Block `courseList` auf der Seite „Kurse“. Ohne veröffentlichte Kurse erscheint der Hinweis „Termine folgen“ wie früher.
- E-Mail über nodemailer. Test: Knopf „Test-E-Mail senden“ im Backend. Lokal lässt sich ein SMTP-Server wie `smtp-server` (npm) auf Port 2525 zum Auffangen der Mails nutzen.

## Redaktions-Oberfläche

Menügruppen und Reihenfolge ergeben sich aus `collections`/`globals` in `src/payload.config.ts` und `admin.group` der Sammlungen. Startseite: `src/cms/components/Dashboard.tsx`. Rollen: `admin` und `editor` (`src/cms/access.ts`). Redakteurinnen sehen weder Konten noch E-Mail-Einstellungen. Versionsverlauf (`versions`) für Seiten, Aktuelles, Kurse. Seltene Felder sind unter „Erweitert“ eingeklappt. Events (Veranstaltungen) sind ausgeblendet, bis die Seite gebaut ist.

## Betrieb auf Hostinger

- Hostinger klont `main`, findet `website/` selbst und führt `npm install` und `npm run build` aus, danach Neustart. Build und Deployment dauern etwa 2 Minuten und starten bei **jedem** Push nach `main`.
- Node 22. Build mit **Webpack** (`next build --webpack`): Turbopack bricht dort bei der CSS-Verarbeitung ab (eigener PostCSS-Prozess endet sofort, „TurbopackInternalError … globals.css“).
- Umgebungsvariablen setzt man in hPanel (Websites → Node.js web app). Namen genau schreiben. Nötig: `PAYLOAD_SECRET` (langer Zufallswert), `CMS_DATA_DIR` (absoluter Pfad außerhalb des App-Ordners, z. B. im Home-Verzeichnis, damit Deployments Datenbank und Uploads nicht überschreiben). Zum Anlegen des ersten Kontos vorübergehend `CMS_ALLOW_FIRST_USER=true`, Konto im Browser anlegen, Variable wieder entfernen. Fremde Einträge in der Liste nicht löschen.
- Logs: Build-Protokolle unter `hbuilds/logs/<id>/…deploy.log` im Konto-Ordner der Website. Die laufende App schreibt `console.log` und `stderr.log` in ihr Arbeitsverzeichnis (`hbuilds/versions/<id>/nodejs`, zu finden über den Prozess `next-server`). Dort stehen Fehler des Backends.
- Nach dem Deployment liegen nur Dateien im Standalone-Ordner (`.next/standalone`). Was zur Laufzeit gelesen wird (`src/assets`, `public/…`), muss über `outputFileTracingIncludes` in `next.config.ts` hineinkommen.
- Noch zu prüfen: Behält der Tarif Dateien in `CMS_DATA_DIR` zwischen Deployments? Sind Backups täglich mit 14 Tagen Aufbewahrung (Pflichtenheft 3.1)? Serverstandort Deutschland?

## Fallstricke (alle schon einmal aufgetreten)

1. **Migrationen nie löschen oder neu erzeugen**, sobald eine Datenbank sie angewendet hat. Neue Änderungen: `npm run cms:types`, `npm run cms:importmap`, dann `npm run cms:migrate:create -- <name>` und die Dateien committen. Fragt der Befehl „blank migration?“, gibt es keine Schemaänderung: mit `n` antworten.
2. **CMS-Skripte laufen im Produktionsmodus** (`NODE_ENV=production` in den npm-Skripten). Im Entwicklungsmodus schiebt Payload das Schema direkt in die Datenbank, und der nächste Serverstart wartet auf eine Rückfrage („dev mode … data loss“). Auf dem Server bedeutet das: hängender Start.
3. `outputFileTracingIncludes`: Die Schlüssel sind Muster (picomatch), eckige Klammern der Routen wirken als Zeichenklasse. `"/backend/**"` statt `"/backend/[[...segments]]"`.
4. `notFound()` bei zur Laufzeit erzeugten Seiten liefert nur eine leere Hülle. Deshalb leitet die Beitragsseite unbekannte Adressen auf `/aktuelles` um. Unbekannte Adressen der Website zeigt `src/app/global-not-found.tsx` (experimentell, `experimental.globalNotFound`), weil Website und Backend je ein Root-Layout haben. Der Notausgang muss auch dort erscheinen (`SiteDocument`).
5. Zwei Server mit demselben `.next`-Ordner überschreiben sich den ISR-Zwischenspeicher: Vergleichstests getrennt fahren.
6. Mit Webpack bekommt der Seitentitel der 404-Seite sonst den Titel-Zusatz doppelt (`notFoundMetadata` in `src/lib/site-metadata.ts`).
7. Formular zurücksetzen nach `await`: `event.currentTarget` ist dann leer, Element vorher merken.
8. React-Lint verbietet `Date.now()` im Rendern und direktes `setState` im Effekt.
9. Die Paketversionen von Payload müssen alle gleich sein (aktuell 3.90.2, exakt angepinnt). Next muss zur Payload-Peer-Angabe passen (`>=16.3.3 <17`).

## Befehle

| Befehl (in `website/`) | Wirkung |
|---|---|
| `npm run dev` | Entwicklung, Daten in `./data` |
| `npm run build` / `npm run start` | Produktionsbau (Webpack) und Start |
| `npm run cms:types`, `cms:importmap`, `cms:migrate:create -- <name>` | nach Änderungen an Feldern, Dateien committen |
| `npm run cms:seed` | Standardinhalt einspielen (läuft sonst bei jedem Start) |
| `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin` | erstes Konto, Passwort mind. 12 Zeichen |
| `python3 scripts/compare-html.py <Referenz> <Prüfling> website/src/content/posts.json` | HTML zweier Server Seite für Seite vergleichen (siehe Kopf des Skripts) |

## Prüfen vor dem Push

`npm run lint`, `npx tsc --noEmit` (die Meldungen zu `PageProps`/`LayoutProps` verschwinden nach einem Build), `npm run build`. Bei Umbauten an Seiten oder Blöcken `scripts/compare-html.py` gegen `main`. Bei Änderungen an Kursen und Anmeldung den Ablauf einmal komplett durchspielen (Kurs anlegen, anmelden, Warteliste, Storno, E-Mail).

## Offene Punkte

- Löschfrist für Kursanmeldungen mit dem Arbeitskreis festlegen (Pflichtenheft § 13), Datenschutzerklärung und AVV um Anmeldungen und E-Mail-Versand ergänzen.
- Vertrag: Das Pflichtenheft nennt WordPress auf Hetzner. Next.js und Hostinger brauchen die schriftliche Abstimmung mit dem Kunden und die AVV-Information (Frist 4 Wochen, § 5 Abs. 2).
- Veranstaltungen (F-06) und Seiteninhalte in fünf Sprachen (F-03) sind nicht gebaut. Kontaktformular (F-04) hat noch keinen Versand.
- Passwort-zurücksetzen-E-Mails des CMS gehen mangels Mailadapter in die Konsole. Admins setzen Passwörter von Hand zurück.
- Farben warten auf die Druckdaten (Z-06), Texte und Daten auf die Freigaben des Kunden (siehe `// OFFEN:` im Code).
