# Website am-anfang-war-es-liebe.de

Erster Entwurf der neuen Website des Arbeitskreises „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“. Next.js (App Router), Deployment über Vercel mit Root Directory `website/`. Die öffentlichen Seiten werden statisch erzeugt, der Redaktionsbereich unter `/backend` ist ein Payload-CMS im selben Projekt (ADR-0004).

Verbindliche Vorgaben: [`../knowledgebase/design/DESIGN-UND-ENTWICKLUNG.md`](../knowledgebase/design/DESIGN-UND-ENTWICKLUNG.md).

## Starten

```bash
npm install
npm run dev
```

## Aufbau

Bezeichner im Code sind die englischen Entsprechungen aus [`../CONTEXT.md`](../CONTEXT.md), URLs und Anker bleiben deutsch.

| Pfad | Inhalt |
|---|---|
| `src/app/` | Seiten: Start, Hilfe, Selbstcheck, Aktuelles, Kurse, Infos, Arbeitskreis, Kontakt, Internetspuren, Sprachen, Impressum, Datenschutz |
| `src/components/` | Seitenblöcke (`blocks/`, `CmsPage`), Hilfeleiste und Notausgang (`SiteHeader`, `QuickExit`), Selbstcheck (`SelfCheckForm`), Wanderausstellung (`ExhibitionSlider`), Anlaufstelle (`SupportServiceSection`), Beiträge (`PostList`), Kontaktformular (`ContactForm`) |
| `src/content/` | Standardinhalt: alle Seiten (`pages/`), Seitenrahmen (`site.ts`), Anlaufstellen (`support-services.ts`), Beiträge der Altseite (`posts.json`). Vorlage für das CMS und Ersatz, wenn es nicht erreichbar ist. |
| `src/payload.config.ts`, `src/cms/` | Redaktionsbereich (Payload CMS): Konfiguration, Collections, Zugriffsregeln, Import der Altseite |
| `src/app/(payload)/` | Oberfläche und Schnittstelle des Redaktionsbereichs unter `/backend` (eigenes Root-Layout) |
| `src/migrations/` | Datenbank-Migrationen des CMS |
| `src/assets/` | Broschüren-Illustrationen (`illustrations/`, `band-pNN` = Broschürenseite) und Tafeln der Wanderausstellung (`exhibition/`) |
| `public/medien/` | Bilder und Videos aus den Beiträgen der Altseite |
| `public/downloads/` | Dokumente: Broschüre, Flyer, Plakat |

## Redaktionsbereich (`/backend`)

Der Arbeitskreis pflegt die Website selbst: alle Seiten, Aktuelles, Veranstaltungen, Anlaufstellen, Dateien sowie Menü und Fuß. Der Bereich ist von der Website aus nirgends verlinkt, für Suchmaschinen gesperrt und nur mit Konto erreichbar. Es gibt keine Registrierung und keine voreingestellten Zugangsdaten.

**Aufbau im Backend = Aufbau der Website**

| Menü im Backend | Inhalt |
|---|---|
| Seiten | Die 12 Seiten der Website. Jede Seite hat Überschrift, Einleitung, Illustrationsband und eine Liste von Blöcken (Textabschnitt, Hinweiskasten, Dokumentenliste, Foto, Kontaktformular …) in der Reihenfolge der Seite. Seiten lassen sich bearbeiten, aber nicht anlegen oder löschen. |
| Beiträge (Aktuelles) | Titel, Datum, Kurzfassung, Titelbild, Text, weitere Bilder, Dokumente zum Download, Status (Entwurf, Veröffentlicht, Archiviert), Position per Ziehen in der Liste |
| Veranstaltungen | Titel, Beginn, Ende, Ort, Bild, Beschreibung, Plätze, „Anmeldung offen“, Dokumente, Status, Position (noch nicht auf der Website angebunden) |
| Anlaufstellen | Hauptanlaufstellen und aufklappbare Gruppen der Hilfeseite, mit Schnellzugriff für die Startseite |
| Kopf und Fuß der Seite | Menü, Sprachwahl, Hilfetelefon in der Hilfeleiste, Postfächer, Fußbereich |
| Dateien | Bilder, PDFs, Videos mit Titel, Alternativtext und Öffentlich-Schalter. Öffentliche Dateien liegen unter `/dateien/<Name>`. |
| Redakteur:innen | Rollen „Redaktion“ und „Admin“ (nur Admins verwalten Konten) |

Archivierte oder als Entwurf gespeicherte Beiträge sind öffentlich nicht sichtbar. Änderungen erscheinen sofort auf der Website. Der Notausgang (Ziel und Beschriftung) ist bewusst nicht im Backend änderbar.

**Woher die Seiten ihre Inhalte nehmen:** aus dem CMS. Ist das CMS aus oder nicht erreichbar (kein `PAYLOAD_SECRET`, Fehler), zeigt die Website den **Standardinhalt** aus `src/content/pages/`, der dem Inhalt der bisherigen Website entspricht. Dieselben Dateien füllen ein leeres CMS beim ersten Start. Die Website ist also nie vom CMS abhängig.

**Lokal starten**

```bash
cp .env.example .env.local        # PAYLOAD_SECRET eintragen (z. B. openssl rand -hex 32)
npm install
npm run dev
ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin   # erstes Konto, Passwort mind. 12 Zeichen
```

Dann `http://localhost:3000/backend` öffnen. Beim ersten Start füllt sich das CMS mit Seiten, Anlaufstellen, Kopf/Fuß und den 18 Beiträgen der Altseite.

**Inhalte oder Aufbau einer Seite im Code ändern:** Standardinhalt in `src/content/pages/`, Darstellung in `src/components/blocks/`, Felder im Backend in `src/cms/`. Nach Änderungen an den Feldern `npm run cms:types`, `npm run cms:importmap` und `npm run cms:migrate:create -- <name>` ausführen und die erzeugten Dateien committen. Auf dem Server laufen Migrationen beim Start.

**Hostinger**: In hPanel unter *Websites → Node.js web app → Import Git repository* dieses Repository und den Branch `main` wählen, Node 22. Hostinger findet die App in `website/` selbst und baut bei jedem Push neu. Umgebungsvariablen in hPanel anlegen: `PAYLOAD_SECRET` und `CMS_DATA_DIR` (absoluter Pfad außerhalb des App-Ordners, damit Deployments Datenbank und Uploads nicht überschreiben). Danach per SSH im App-Ordner das erste Konto anlegen: `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin`. Der Build läuft mit Webpack (`next build --webpack`) statt mit Turbopack: Turbopack bricht auf Servern mit verlinktem `node_modules` oder wenig Arbeitsspeicher mit einem „Turbopack error“ ab, Webpack braucht außerdem weniger Speicher (gemessen 0,9 statt 1,2 GB). Hostinger setzt `output: "standalone"` selbst; getestet ist der Standalone-Start mit Datenbank, Uploads und Backend. Noch zu klären ist, ob der Tarif Dateien im App-Ordner zwischen Deployments behält (daher `CMS_DATA_DIR`).

**Vercel-Vorschau**: Dort ist nur `/tmp` beschreibbar, Datenbank und Uploads sind flüchtig und je Instanz getrennt. Deshalb zeigt die Vorschau die Website mit dem Standardinhalt (`CMS_CONTENT` nicht gesetzt). Das Backend läuft trotzdem, zum Ansehen der Oberfläche in Vercel (Preview) `PAYLOAD_SECRET` und `CMS_ALLOW_FIRST_USER=true` setzen und das erste Konto im Browser anlegen. Änderungen im Backend erscheinen dort nicht auf der Website. Zum Ausprobieren des Bearbeitens eignen sich lokaler Start oder Hostinger.

## Umgesetzt nach Vorgabe

- Keine externen Ressourcen (ADR-0002): Schriften über `next/font` selbst gehostet, keine Embeds, kein Tracking, keine Cookies
- Notausgang auf jeder Seite (Hilfeleiste, mobil zusätzlich fixiert), zweimal Esc, `Referrer-Policy: no-referrer`
- Selbstcheck ohne Speicherung, Zurücksetzen beim Zurücknavigieren (ADR-0003)
- Anlaufstellen mit fester Datenreihenfolge, weitere Stellen in nativen `<details>`
- Wanderausstellung als Slider mit `scroll-snap`, ohne Autoplay
- Sicherheits-Header in `next.config.ts`, CSP vorerst als Report-Only
- `noindex` für den Entwurf

## Offen im Entwurf

Im Code mit `OFFEN:` markiert. Die wichtigsten Punkte:

- Markenfarben sind aus der Web-PDF der Broschüre abgetastet und damit vorläufig, bis die Druckdaten (Z-06) da sind
- Alle Nummern, Zeiten und Adressen stammen von der Altseite bzw. Broschüre 2016 und müssen vom AG bestätigt werden (Z-03)
- Kontaktformular hat noch keinen Versand (Zustellweg ohne Speicherung klären, AVV)
- Übersetzungen (AR, RU, EN, TR) sind nur eine Hinweisseite und brauchen Freigabe
- Impressum und Datenschutzerklärung sind Platzhalter
- Nutzungsrechte der Broschüren-Illustrationen (fien-design) für das Web klären
- Förderlogo MKJFGFI ist eingebaut, Größe und Platzierung nach den Fördervorgaben prüfen (Z-11)
