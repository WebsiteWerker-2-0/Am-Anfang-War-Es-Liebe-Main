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
| `src/components/` | Hilfeleiste und Notausgang (`SiteHeader`, `QuickExit`), Selbstcheck (`SelfCheckForm`), Wanderausstellung (`ExhibitionSlider`), Anlaufstelle (`SupportServiceSection`), Beiträge (`PostList`), Kontaktformular (`ContactForm`) |
| `src/content/` | Inhalte als Daten: Anlaufstellen (`support-services.ts`), Aussagen des Selbstchecks, Tafeln, Navigation, Beiträge |
| `src/payload.config.ts`, `src/cms/` | Redaktionsbereich (Payload CMS): Konfiguration, Collections, Zugriffsregeln, Import der Altseite |
| `src/app/(payload)/` | Oberfläche und Schnittstelle des Redaktionsbereichs unter `/backend` (eigenes Root-Layout) |
| `src/migrations/` | Datenbank-Migrationen des CMS |
| `src/content/posts.json` | Beiträge der Altseite, erzeugt mit `python3 ../altseite/import-posts.py`, später aus dem CMS (ADR-0001) |
| `src/assets/` | Broschüren-Illustrationen (`illustrations/`, `band-pNN` = Broschürenseite) und Tafeln der Wanderausstellung (`exhibition/`) |
| `public/medien/` | Bilder und Videos aus den Beiträgen der Altseite |
| `public/downloads/` | Dokumente: Broschüre, Flyer, Plakat |

## Redaktionsbereich (`/backend`)

Der Arbeitskreis pflegt Aktuelles, Veranstaltungen, Seitentexte und Dateien selbst (F-05 bis F-07). Der Bereich ist von der Website aus nirgends verlinkt, für Suchmaschinen gesperrt und nur mit Konto erreichbar. Es gibt keine Registrierung und keine voreingestellten Zugangsdaten.

**Lokal starten**

```bash
cp .env.example .env.local        # PAYLOAD_SECRET eintragen (z. B. openssl rand -hex 32)
npm run dev
npm run cms:seed                  # Beiträge der Altseite einspielen (optional)
ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run cms:create-admin   # erstes Konto, Passwort mind. 12 Zeichen
```

Dann `http://localhost:3000/backend` öffnen.

**Inhalte**

| Bereich | Felder |
|---|---|
| Beiträge (Aktuelles) | Titel, Datum, Kurzfassung, Titelbild, Text, weitere Bilder, Dokumente zum Download, Status (Entwurf, Veröffentlicht, Archiviert), Position per Ziehen in der Liste |
| Veranstaltungen | Titel, Beginn, Ende, Ort, Bild, Beschreibung, Plätze, Anmeldung offen, Dokumente, Status, Position |
| Seitentexte | Titel, Einleitung, Text in DE, AR, RU, EN, TR, Status |
| Dateien | Bilder, PDFs, Videos mit Titel, Alternativtext und Öffentlich-Schalter |
| Redakteur:innen | Rollen „Redaktion“ und „Admin“ (nur Admins verwalten Konten) |

Archivierte Inhalte bleiben erhalten, sind aber öffentlich nicht mehr abrufbar. Die öffentlichen Seiten lesen noch aus `src/content/` und sind noch nicht mit dem CMS verbunden.

**Datenbank ändern**: Nach Änderungen an den Collections `npm run cms:types`, `npm run cms:importmap` und `npm run cms:migrate:create -- <name>` ausführen und die erzeugten Dateien committen. Auf dem Server laufen Migrationen beim Start.

**Hostinger**: `CMS_DATA_DIR` auf einen absoluten Pfad außerhalb des Deploy-Ordners setzen (Datenbank und Uploads), `PAYLOAD_SECRET` in hPanel anlegen, danach per SSH `npm run cms:create-admin`. Ob der Tarif dauerhaften Dateispeicher bietet, ist vor dem Umzug zu klären.

**Vercel-Vorschau**: Dort ist nur `/tmp` beschreibbar. Daten sind flüchtig und je Instanz getrennt. Mit `PAYLOAD_SECRET`, `CMS_SEED_ON_START=true` und `CMS_ALLOW_FIRST_USER=true` zeigt die Vorschau die Oberfläche mit den Bestandsbeiträgen. Für eine dauerhafte Vorschau `DATABASE_URL` auf einen libSQL-Server setzen.

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
