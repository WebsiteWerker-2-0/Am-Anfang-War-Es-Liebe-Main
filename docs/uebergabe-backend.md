# Übergabe: Backend, Veranstaltungen und Betrieb

Stand 17.10.2026. Dieses Dokument bringt eine neue Sitzung (oder Person) auf den Stand des Redaktionsbereichs. Lesereihenfolge: `CLAUDE.md`, dieses Dokument, dann die ADRs 0004 bis 0006 in `docs/adr/`. Für Redakteurinnen gibt es ein eigenes Handbuch: `docs/redaktion-handbuch.md`. Zugangsdaten stehen nirgends im Repository (das Repo ist öffentlich).

## Was es gibt

- Website: Next.js 16 (App Router) in `website/`, ISR (60 s), keine externen Ressourcen, Notausgang auf jeder Seite.
- Redaktionsbereich unter `/backend`: Payload CMS 3.90 im selben Projekt (SQLite, Konten nur durch Admins), auf Deutsch.
- **Die Redaktion sieht nur drei Bereiche: Aktuelles, Veranstaltungen, Dateiarchiv.** Admins zusätzlich Verwaltung (Redakteur:innen, E-Mail und Anmeldungen). **Seiten, Anlaufstellen, Menü, Sprachwahl und Fuß sind bewusst nicht im Backend**, sie stehen im Code (ADR-0006).
- Läuft auf **Hostinger** (Node.js-Web-App, baut `main` bei jedem Push) und als Vorschau auf **Vercel** (dort zeigt die Website nur den Altbestand, das Backend ist eine Demo mit flüchtigen Daten).

## Wo welcher Inhalt liegt

| Inhalt | Ort | Änderbar durch |
|---|---|---|
| Seiten (12), Texte, Blöcke | `website/src/content/pages/*.ts`, Datenmodell `content/model.ts` | Entwicklung (Pull Request) |
| Anlaufstellen | `content/support-services.ts` | Entwicklung |
| Menü, Sprachwahl, Hilfetelefon, Fuß, Postfächer der Kontaktseite | `content/site.ts` | Entwicklung |
| Aktuelles | CMS, Sammlung `posts` (Altbestand: `content/posts.json` als Vorlage) | Redaktion |
| Veranstaltungen und Anmeldungen | CMS, Sammlungen `courses`, `registrations` | Redaktion |
| Dateien | CMS, Sammlung `media`, öffentlich unter `/dateien/<Name>` | Redaktion |
| Empfänger und Postfach für Anmeldungen | CMS, Global `mail` | Admins |

`src/lib/content.ts` liefert Seiten, Site und Anlaufstellen aus dem Code und Beiträge/Veranstaltungen aus dem CMS (`cmsEnabled()` in `src/lib/cms-client.ts`: aus beim Bauen, ohne Geheimnis, auf Vercel). **Die Website ist nie vom CMS abhängig**: ohne CMS erscheinen der Altbestand der Beiträge und keine Veranstaltungen. Änderungen im Backend lösen `revalidateSite()` aus, die Seiten sind nach Sekunden aktuell. Das Einspielen (`src/cms/seed.ts`, über `onInit`) füllt nur die Beiträge der Altseite, `CMS_SEED=false` schaltet es ab.

Darstellung: `src/components/blocks/index.tsx` (Blöcke), `CmsPage.tsx` (Seitenrahmen), `src/lib/rich.tsx` und `src/lib/html-to-jsx.tsx` (Text aus HTML-Standardinhalt und aus dem CMS mit denselben Klassen). Neuer Blocktyp = Typ in `model.ts`, Renderer, Standardinhalt in `content/pages/`. Das CMS kennt Blöcke nicht mehr.

## Veranstaltungen und Anmeldung (ADR-0005)

- Sammlung `courses` (im Backend „Veranstaltungen“, der Name bleibt intern), `registrations` (nicht im Menü, `group: false`; in der Veranstaltung als Join-Liste, dazu Startseite des Backends), Global `mail`. Logik in `src/lib/courses.ts`, `registration.ts`, `mail.ts`.
- Öffentliche Schnittstellen: `GET /api/kurse` (Stand, ohne Cache), `POST /api/kurse/anmeldung` (Herkunft, verstecktes Feld, Begrenzung 10 je Adresse und Stunde über `CMS_REGISTRATION_LIMIT`, Plätze werden nacheinander vergeben, Doppelanmeldungen werden abgelehnt).
- Die Kursliste `src/components/CourseList.tsx` (Client) fragt alle 30 s nach und lädt auch nach, wenn die Seite ohne Veranstaltungen erzeugt wurde. Block `courseList` im Standardinhalt der Seite „Kurse“. Ohne Veranstaltung erscheint der Hinweis „Termine folgen“.
- E-Mail über nodemailer. Test: Knopf „Test-E-Mail senden“ im Backend (Admin). Lokal fängt ein SMTP-Server wie `smtp-server` (npm) auf Port 2525 die Mails auf. Scheitert der Versand, bleibt die Anmeldung gespeichert und zeigt „Nicht gesendet“.

## Redaktions-Oberfläche

- Menügruppen kommen aus `admin.group` der Sammlungen: je Bereich eine eigene Gruppe (Aktuelles, Veranstaltungen, Dateiarchiv), die Überschrift blendet `custom.css` aus, damit das Menü flach wirkt. „Verwaltung“ ist nach Rolle ausgeblendet (`admin.hidden`). Startseite: `src/cms/components/Dashboard.tsx` (Schaltflächen), die Standard-Karten von Payload sind ausgeblendet.
- Gestaltung: `src/app/(payload)/custom.css` (Liquid Glass, Orange und Magenta der Broschüre, hell und dunkel). Größen in px, Payload setzt die Basisschrift auf 13 px. Betrifft nur das Backend. Die Klassen (`.nav`, `.nav-group`, `.nav__link`, `#nav-group-<Name>`) gehören Payload: nach einem Update das Backend ansehen.
- Einfach halten: Slug von Beiträgen und Veranstaltungen ist unsichtbar und bleibt beim Umbenennen gleich, Spezialfelder sind eingeklappt, Versionsverlauf für Aktuelles und Veranstaltungen, Link „Auf der Website ansehen“, deutsche Beschriftungen, die Redaktion legt Dateien direkt im Beitrag oder in der Veranstaltung ab.
- Rollen: `admin` und `editor` (`src/cms/access.ts`). Nur Admins verwalten Konten und E-Mail-Einstellungen.

## Betrieb auf Hostinger

- Hostinger klont `main`, findet `website/` selbst und führt `npm install` und `npm run build` aus, danach Neustart. Build und Deployment dauern etwa 2 Minuten und starten bei **jedem** Push nach `main`.
- Node 22. Build mit **Webpack** (`next build --webpack`): Turbopack bricht dort bei der CSS-Verarbeitung ab (eigener PostCSS-Prozess endet sofort).
- Umgebungsvariablen setzt man in hPanel (Websites → Node.js web app), Namen genau schreiben. Nötig: `PAYLOAD_SECRET` (langer Zufallswert), `CMS_DATA_DIR` (absoluter Pfad außerhalb des App-Ordners, damit Deployments Datenbank und Uploads nicht überschreiben). Zum Anlegen des ersten Kontos vorübergehend `CMS_ALLOW_FIRST_USER=true`, Konto im Browser anlegen, Variable wieder entfernen. Einträge, die nicht aus diesem Projekt stammen, nicht löschen.
- Logs: Build-Protokolle unter `hbuilds/logs/<id>/…deploy.log` im Konto-Ordner der Website. Die laufende App schreibt `console.log` und `stderr.log` in ihr Arbeitsverzeichnis (`hbuilds/versions/<id>/nodejs`, zu finden über den Prozess `next-server`). Dort stehen Fehler des Backends.
- Im Standalone-Ordner liegt nur, was nachverfolgt wird. Zur Laufzeit gelesene Dateien (heute nur `public/…` für das Einspielen der Beiträge) gehören in `outputFileTracingIncludes` in `next.config.ts`.
- Noch zu prüfen: Behält der Tarif Dateien in `CMS_DATA_DIR` zwischen Deployments? Sind Backups täglich mit 14 Tagen Aufbewahrung (Pflichtenheft 3.1)? Serverstandort Deutschland?

## Fallstricke (alle schon einmal aufgetreten)

1. **Migrationen nie löschen oder neu erzeugen**, sobald eine Datenbank sie angewendet hat. Neue Änderungen: `npm run cms:types`, `npm run cms:importmap`, dann `npm run cms:migrate:create -- <name>` (Eingabe von `/dev/null` lesen lassen, sonst fragt der Befehl bei „keine Änderung“ nach) und die Dateien committen.
2. **SQLite-Migrationen sind nicht atomar.** Ein Fehler lässt einen halb migrierten Stand zurück. Darum jede Migration vor dem Veröffentlichen an einer Datenbank im Zustand des Servers prüfen: Stand von `main` bauen, mit Daten füllen, Verzeichnis `CMS_DATA_DIR` sichern, dann den neuen Stand darauf starten (beim Wiederholen die Sicherung zurückkopieren). Erzeugte Migrationen, die Tabellen löschen, prüfen: `DROP TABLE` scheitert an Fremdschlüsseln, wenn Verweistabellen später neu gebaut werden (so geschehen in `…_cms_verschlanken`, dort von Hand umgestellt).
3. **CMS-Skripte laufen im Produktionsmodus** (`NODE_ENV=production` in den npm-Skripten). Im Entwicklungsmodus schiebt Payload das Schema direkt in die Datenbank, und der nächste Serverstart wartet auf eine Rückfrage („dev mode … data loss“). Auf dem Server bedeutet das einen hängenden Start.
4. `outputFileTracingIncludes`: Die Schlüssel sind Muster (picomatch), eckige Klammern der Routen wirken als Zeichenklasse. `"/backend/**"` statt `"/backend/[[...segments]]"`.
5. `notFound()` bei zur Laufzeit erzeugten Seiten liefert nur eine leere Hülle. Deshalb leitet die Beitragsseite unbekannte Adressen auf `/aktuelles` um. Unbekannte Adressen der Website zeigt `src/app/global-not-found.tsx` (experimentell, `experimental.globalNotFound`), weil Website und Backend je ein Root-Layout haben. Der Notausgang muss auch dort erscheinen (`SiteDocument`).
6. Zwei Server mit demselben `.next`-Ordner überschreiben sich den ISR-Zwischenspeicher: Vergleichstests getrennt fahren.
7. Mit Webpack bekommt der Seitentitel der 404-Seite sonst den Titel-Zusatz doppelt (`notFoundMetadata` in `src/lib/site-metadata.ts`).
8. Formular zurücksetzen nach `await`: `event.currentTarget` ist dann leer, Element vorher merken.
9. React-Lint verbietet `Date.now()` im Rendern und direktes `setState` im Effekt.
10. Die Paketversionen von Payload müssen alle gleich sein (aktuell 3.91.0, exakt angepinnt). Next muss zur Peer-Angabe passen (`>=16.3.3 <17`). **Payload aktualisieren:** alle `payload`- und `@payloadcms/*`-Versionen in `package.json` gleichzeitig ändern, im `package-lock.json` die Einträge von `payload` und `@payloadcms/*` entfernen, dann `npm install` (sonst `ERESOLVE`, weil npm gegen die alte Version prüft). Danach `cms:migrate:create` gegen eine Datenbank im Serverzustand: „No schema changes detected“ heißt, keine Migration nötig.
12. `overrides` in `package.json` heben drei Pakete über die von Payload bzw. Monaco gepinnten Versionen, damit `npm audit --omit=dev` (was Hostinger prüft) sauber ist: `dompurify`, `sass` unter `@payloadcms/next` (zieht sonst `chokidar` 3 und `braces` mit), `esbuild` unter `@esbuild-kit/core-utils` (nur für `cms:migrate:create`). Nach jedem Payload-Update prüfen, ob sie noch nötig sind, und überflüssige entfernen. Die verbleibenden Meldungen zu `braces` betreffen nur ESLint (Entwicklung) und haben upstream keinen Fix.
11. Die Oberfläche von Payload rechnet in rem mit 13 px Basisschrift: Eigene Größen in px angeben.

## Befehle

| Befehl (in `website/`) | Wirkung |
|---|---|
| `npm run dev` | Entwicklung, Daten in `./data` |
| `npm run build` / `npm run start` | Produktionsbau (Webpack) und Start |
| `npm run cms:types`, `cms:importmap`, `cms:migrate:create -- <name>` | nach Änderungen an Feldern, Dateien committen |
| `npm run cms:seed` | Beiträge der Altseite einspielen (läuft sonst bei jedem Start) |
| `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin` | erstes Konto, Passwort mind. 12 Zeichen |
| `python3 scripts/compare-html.py <Referenz> <Prüfling> website/src/content/posts.json` | HTML zweier Server Seite für Seite vergleichen (siehe Kopf des Skripts) |

## Prüfen vor dem Push nach `main`

`npm run lint`, `npx tsc --noEmit` (die Meldungen zu `PageProps`/`LayoutProps` verschwinden nach einem Build), `npm run build`. Bei Umbauten an Seiten oder Blöcken `scripts/compare-html.py` gegen `main`. Bei Änderungen an Veranstaltungen und Anmeldung den Ablauf einmal komplett durchspielen (anlegen, anmelden, Warteliste, Storno, E-Mail). Bei Änderungen am Datenbankschema die Migration an einer Datenbank im Serverzustand prüfen (Fallstrick 2).

## Offene Punkte

- Löschfrist für Anmeldungen mit dem Arbeitskreis festlegen (Pflichtenheft § 13), Datenschutzerklärung und AVV um Anmeldungen und E-Mail-Versand ergänzen.
- Vertrag: Das Pflichtenheft nennt WordPress auf Hetzner. Next.js und Hostinger brauchen die schriftliche Abstimmung mit dem Kunden und die AVV-Information (Frist 4 Wochen, § 5 Abs. 2).
- Seiteninhalte in fünf Sprachen (F-03) sind nicht gebaut. Das Kontaktformular (F-04) hat noch keinen Versand.
- Passwort-zurücksetzen-E-Mails des CMS gehen mangels Mailadapter in die Konsole. Admins setzen Passwörter von Hand zurück.
- Farben warten auf die Druckdaten (Z-06), Texte und Daten auf die Freigaben des Kunden (siehe `// OFFEN:` im Code).
- Das Liquid-Glass-Design ist nach eigenem Ermessen gebaut: Soll es einer Vorlage („Portfolio Dashboard“) näherkommen, Screenshot dazulegen und `custom.css` anpassen.

## Nachtrag 17.10.2026 (nachmittags)

- Backend farblos (Liquid Glass in Grautönen), primäre Aktion dunkel hervorgehoben, „Speichern“-Leiste klebt oben. Datei: `website/src/app/(payload)/custom.css`.
- Standardstatus „Veröffentlicht“, neue Beiträge oben. Ursache der Meldung „gespeichert, aber nicht da“: Entwurf als Standard plus Einsortierung am Ende.
- Textfeld: Unterstreichen, Baustein „Datei oder Bild“ (Darstellung `src/lib/rich.tsx` für Beiträge, `src/lib/rich-html.ts` für die Veranstaltungsliste im Browser). Veranstaltungen: Feld `details`.
- Vorschau: `src/app/(site)/vorschau/…`, `src/lib/preview.ts`. CSP `frame-ancestors 'self'` nur dort (`next.config.ts`).
- Migration `20261017_142156_veranstaltung_text` **von Hand gekürzt** auf zwei `ALTER TABLE … ADD`: Payload wollte wegen des geänderten Standardwerts `posts` und `courses` per `DROP TABLE` neu bauen (Gefahr von Datenverlust, siehe Fallstrick 2). Der Standardwert gilt nur in der Anwendung. Geprüft an einer Datenbank im Serverstand.
- `push: false` im SQLite-Adapter: Auch lokal ändert sich das Schema nur über Migrationen. Nach einer neuen Migration lokal einmal im Produktionsmodus starten (z. B. `npm run cms:seed`), dann läuft sie.
- `npx payload migrate` meldet nichts und wendet nichts an; die Migrationen laufen beim Start (`prodMigrations`).
- Migration `20261017_151620_downloads_bildposition` ebenfalls von Hand auf `ADD COLUMN` gekürzt (Payload wollte `posts_documents` per `DROP TABLE` neu bauen). Setzt `show_downloads` für Beiträge, die schon Dokumente haben. Geprüft: alter Stand per `git worktree` mit Daten erzeugt, dann mit neuem Stand gestartet.
- Archiv: `getPosts` liefert nur Veröffentlichtes, `getArchivedPosts` das Archiv, `getPost` beides (`src/lib/content.ts`).
- Zweiter Faktor per E-Mail-Code, siehe ADR-0007. Getestet: Signatur, Sitzungsbindung, Ablauf, Fehlversuche (Kernfunktionen mit esbuild und Node). Den ganzen Ablauf im Browser hat Steffen nach dem Deployment getestet.
- Veranstaltungen: Vergangene Termine (Beginn bzw. Ende vor gestern) erscheinen nicht auf der Website; Hinweis am Feld „Wann beginnt es?“. Menüpunkt der Website heißt „Veranstaltungen“ (Adresse bleibt `/kurse`).
- Kalender und Auswahllisten im Backend undurchsichtig: Payload-Variablen in den Menüs auf `--aal-solid` gesetzt (`custom.css`).
- Aktuelles: Pflichtfeld „Verfasst von“ (`author`), auf der Website neben dem Datum. Migration `…_verfasst_von` von Hand mit Standardwert (NOT NULL an gefüllter Tabelle), Altbestand = „Arbeitskreis gegen Gewalt an Frauen und Kindern“.
- Neue Konten bekommen eine Zugangs-E-Mail (`src/cms/welcome-mail.ts`, Hook in `Users.ts`), erneut über den Knopf „Zugangs-E-Mail senden“ (Endpunkt `POST /backend/api/users/:id/zugang`, nur Admins). Adresse aus `SITE_URL` oder der Anfrage. Kein Passwort in der E-Mail.
- Veranstaltungen lassen sich mit Anmeldungen löschen, die Anmeldungen gehen mit (Hook `beforeDelete` in `Courses.ts`).
- Zugangs-E-Mail enthält einen Link „Passwort festlegen“ (`payload.forgotPassword` mit `disableEmail`, 7 Tage, Seite `/backend/reset/<token>`), nie ein Passwort. Payloads eigenes „Passwort vergessen“ auf der Anmeldeseite verschickt keine E-Mail (kein E-Mail-Adapter); dafür eine Admin bitten, „Zugangs-E-Mail senden“ zu klicken.
- Postfach-Passwort verschlüsselt (siehe ADR-0005). Ein noch im Klartext gespeichertes Passwort wird beim nächsten Speichern der Seite „E-Mail und Anmeldungen“ verschlüsselt; angezeigt wird es schon vorher nicht mehr.
- Sicherheitsupdate: Payload 3.90.2 → 3.91.0 (behebt u. a. `undici`), `npm audit fix` und drei `overrides` (Fallstrick 12). `npm audit --omit=dev`: 0 Schwachstellen. Keine Schemaänderung; geprüft an einer Datenbank im Serverstand (alter Stand mit Beiträgen, Veranstaltung und Anmeldung erzeugt, neuer Stand darauf gestartet, Anmeldung, Platzzählung und Backend im Browser getestet).

## Nachtrag 31.10.2026: Termine und Kurse

- „Veranstaltungen“ heißen „Termine“ (Website `/termine`, Backend „Termine“, Sammlung weiter `courses`). Neu „Kurse“ (`/kurse`, Sammlung `course-offers`), Wortlaut aus dem Dokument des AG in `src/content/course-offers.ts`, eingespielt von `seed.ts`. Siehe ADR-0008.
- Migration `…_kurse`: nur neue Tabellen und eine Spalte in `payload_locked_documents_rels` (von Payload so erzeugt, unverändert übernommen). An Daten im Serverstand geprüft.
- Vorschau: `/vorschau/termine/<id>` (vorher `/vorschau/veranstaltungen`), `/vorschau/kurse/<id>`.
- Anmerkungen der Frauenberatungsstelle (21.10.2026) umgesetzt, soweit eindeutig: Startseite (Gründe, „Beratung kostet Sie nichts“, beide Nummern der Frauenberatungsstelle im Schnellzugriff, „Unsere Wanderausstellung“ mit Buchungsadresse), Hilfe (AWO-Schwangerschaftsberatung, Diakonie nur Warburg, ASD, Weisser Ring neue Nummer, drei Online-/Telefonangebote nur mit Link), Infos (Überschrift, Einleitung, Flyer der Frauenberatungsstelle, Links neu gegliedert, gewaltschutz.info entfernt), Bänder Hilfe/Infos getauscht. Offene Rückfragen stehen im Chat vom 31.10.
