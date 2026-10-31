# Am Anfang war es Liebe – Website

## Website-Code

Die eigentliche Website (Next.js) liegt in `website/` — Hostinger findet die App dort selbst. Alle Code-Änderungen an der Website (Seiten, Komponenten, Styles, Konfiguration) gehören ausschließlich in diesen Ordner, nicht ins Repo-Root. `knowledgebase/` ist nur für Dokumentation/Entscheidungen, nicht für Website-Code.

**Stack-Entscheidung (überschreibt Abschnitt 10 der Design-Doku):** Next.js, nicht WordPress. Die in der Design-Doku unter Abschnitt 10 beschriebene WordPress-Architektur (Block-Theme, CPTs, Polylang) gilt **nicht mehr** (Begründung: `docs/adr/0001-nextjs-statt-wordpress.md`). Fachliche Anforderungen aus der Design-Doku (Notausgang, Selbstcheck ohne Speicherung, Anlaufstellen, Mediathek, Veranstaltungen, Mehrsprachigkeit) bleiben bestehen und werden in Next.js umgesetzt.

**Blog-Bereich:** Die Auftraggeber sollen Blog-Inhalte selbst pflegen können. Next.js hat kein eigenes Redaktions-Interface. **Entschieden: self-hosted Headless-CMS** (läuft mit auf eigenem Server/Hostinger, keine Inhalte bei Dritten — passt zu Regel 1 der Design-Doku), und zwar **Payload CMS** im selben Next.js-Projekt unter `/backend` (SQLite, Konten nur durch Admins), siehe `docs/adr/0004-payload-cms-unter-backend.md` und `website/README.md`. `/backend` nie verlinken. Aktuelles und Veranstaltungen kommen aus dem CMS, alle übrigen Inhalte aus dem Code (`website/src/content/`, ADR-0006).

**Harte Regeln aus Design-Doku Abschnitt 0 gelten unverändert für Next.js**, nur die technische Umsetzung wechselt von WordPress zu Next.js: keine externen Ressourcen (Fonts, CDN, Embeds, Tracking), Farben auf Grundlage der Broschüre (weitere als Token erlaubt), kein Speichern des Selbstchecks/Kontaktformulars, Notausgang auf jeder Seite, keine Flaggen, keine Secrets im Repo. Schriften (Epilogue, für Kyrillisch und Arabisch IBM Plex Sans und Noto Naskh) lädt `next/font` beim Build und liefert sie selbst aus, der Browser fragt nie bei Google an (`docs/adr/0002-keine-externen-ressourcen.md`).

**Feature-Umfang:** Es werden alle fachlichen Anforderungen aus `DESIGN-UND-ENTWICKLUNG.md` Abschnitt 10.2 in Next.js umgesetzt: Anlaufstellen, Veranstaltungen, Mediathek, Aktuelles/Blog, Selbstcheck — plus Notausgang (Abschnitt 6.2) und Mehrsprachigkeit DE/AR/RU/EN/TR inkl. RTL (Abschnitt 10.3). Die dort beschriebene WordPress/Polylang-Umsetzung ist die Zielbeschreibung *der Anforderung*, nicht mehr die technische Vorgabe.

## Hosting & Deployment

- **Hostinger** (Node.js-Web-App) baut `main` bei **jedem Push** automatisch (Node 22, `npm run build`, etwa 2 Minuten) und startet neu. Ein Push nach `main` ist also eine Veröffentlichung: vorher `npm run lint`, `npx tsc --noEmit` und `npm run build`. Auf einem Branch arbeiten, wenn etwas größer ist, und erst nach Prüfung nach `main` bringen.
- **Domains:** Die Website läuft auf der Hostinger-Testdomain `midnightblue-barracuda-110814.hostingersite.com`. Die Hauptdomain `am-anfang-war-es-liebe.de` zeigt noch die alte WordPress-Seite. DNS, Domain und Abrechnung nur nach Rücksprache ändern.
- Den Build-Status liefert das Hostinger-Plugin (`hostinger@claude-plugins-official`). Hostinger meldet Builds nicht an GitHub zurück.
- **Vercel läuft aus** (OFFEN: Abschalten). Bis dahin baut Vercel jede Änderung als Vorschau mit, dort nur Standardinhalt und ein Demo-Backend mit flüchtigen Daten. Nicht mehr als Ziel für Prüfungen verwenden.
- Der Build nutzt **Webpack** (`next build --webpack`). Turbopack bricht auf Hostinger ab.
- Zugangsdaten (SSH, hPanel, Passwörter, Secrets) stehen nie im Repository. Das Repository ist öffentlich.

## Backend und Redaktionsbereich (Stand 17.10.2026)

Vor Arbeiten am Backend, an Seiteninhalten oder an Veranstaltungen lesen: `docs/uebergabe-backend.md` (Architektur, Betrieb, Fallstricke, Befehle), `docs/redaktion-handbuch.md` (wie die Redaktion arbeitet), `docs/adr/0004-…` bis `0008-…`.

- **Die Redaktion sieht fünf Bereiche:** Aktuelles, Termine (mit den Anmeldungen darin), Kurse, Mitglieder (Liste „Wer im Arbeitskreis mitarbeitet“) und das Dateiarchiv (ADR-0008). Admins zusätzlich Verwaltung (Konten, E-Mail und Anmeldungen). Das Backend muss für Laien ohne Vorkenntnisse bedienbar bleiben: wenige, große, klar benannte Bereiche, deutsche Beschriftungen, Spezialfelder eingeklappt. Keine neuen Menüpunkte ohne Entscheidung des Auftraggebers.
- **Nicht im Backend:** Seiten, Anlaufstellen, Menü, Sprachwahl, Hilfetelefon, Fuß, Postfächer der Kontaktseite, Notausgang. Sie stehen im Code unter `website/src/content/` (`pages/*.ts`, `site.ts`, `support-services.ts`) und werden dort geändert (ADR-0006). Das CMS kennt sie nicht (Sammlungen `pages`, `services`, `events` und Global `site` sind entfernt).
- **Aktuelles und Veranstaltungen** liegen im CMS (`posts`, `courses`, `registrations`, `media`). Die Seite „Termine“ zeigt veröffentlichte Termine mit freien Plätzen (live) und Anmeldeformular, die Seite „Kurse“ die Kurse aus dem Backend (Wortlaut des AG nicht verändern). Anmeldungen werden gespeichert und per E-Mail an eine im Backend hinterlegte Adresse geschickt (ADR-0005). Kontaktanfragen dürfen weiterhin **nie** gespeichert werden (ADR-0003).
- **Datenbank-Migrationen nie löschen oder neu erzeugen**, wenn sie schon irgendwo angewendet wurden (Hostinger tut das). Änderungen an Feldern: `npm run cms:types`, `npm run cms:importmap`, `npm run cms:migrate:create -- <name>`, alles committen. **SQLite-Migrationen sind nicht atomar:** jede neue Migration vorher an einer Datenbank im Zustand des Servers prüfen (Vorgehen in `docs/uebergabe-backend.md`, Fallstrick 2).
- **Zweiter Faktor:** Das Backend verlangt nach dem Passwort einen Code per E-Mail (ADR-0007, `src/lib/two-factor*.ts`, `proxy.ts`). Notschalter `CMS_TWO_FACTOR=false` in hPanel, wenn der Versand ausfällt.
- **CMS-Skripte** (`cms:seed`, `cms:create-admin`, `cms:migrate`) laufen im Produktionsmodus, sonst hängt der nächste Serverstart an einer Rückfrage.
- **Gestaltung des Backends:** `website/src/app/(payload)/custom.css` (Liquid Glass, hell und dunkel, Größen in px). Die Website selbst ist davon nicht betroffen. Gestaltungsentscheidungen in `knowledgebase/design/entscheidungen.md` festhalten.
- **`/backend` nie verlinken.** Der Notausgang muss auf jeder Seite erscheinen, auch in der 404-Seite.
- **Prüfen vor dem Push nach `main`:** `npm run lint`, `npx tsc --noEmit`, `npm run build`. Nach Umbauten am Frontend `scripts/compare-html.py` gegen `main`. Den Veranstaltungsablauf einmal komplett testen (anlegen, anmelden, Warteliste, Storno, E-Mail).
- Offene Punkte stehen am Ende von `docs/uebergabe-backend.md` (Löschfrist für Anmeldungen, Vertrag WordPress/Hetzner gegen Next.js/Hostinger, Mehrsprachigkeit).

## Agent skills

Projekt-Skills in `.claude/skills/`, eine Auswahl aus mattpocock/skills. Übersicht und wann welcher: `.claude/skills/README.md`.

### Issue tracker

GitHub-Issues dieses Repos über `gh`, auf Deutsch. Siehe `docs/agents/issue-tracker.md`.

### Domain docs

Single-Context: Glossar `CONTEXT.md` und ADRs in `docs/adr/` im Repo-Root, Gestaltungsentscheidungen in `knowledgebase/design/`. Siehe `docs/agents/domain.md`.

### Arbeitsweise

- Fachbegriffe stehen in `CONTEXT.md`. Texte und Issues nutzen den deutschen Begriff, Bezeichner im Code (Komponenten, Funktionen, Typen, CSS-Klassen) die englische Entsprechung von dort. URLs und Anker bleiben deutsch.
- Größere Änderung: zuerst `/grill-with-docs`, dann `/to-spec` oder `/to-tickets`, umsetzen mit `/implement`.
- Tests entstehen mit `tdd`, nur an vorher vereinbarten Schnittstellen. Fehler mit `diagnosing-bugs` eingrenzen.
- Vor dem Push einer größeren Änderung `code-review` seit dem letzten gepushten Stand: Standard ist `DESIGN-UND-ENTWICKLUNG.md` samt ADRs, Spezifikation das Issue.
- Offene Fragen an den AG mit `/to-questionnaire` sammeln. Sitzung mit offenem Stand beenden: `/handoff`.

## Knowledgebase

Die Wissensbasis liegt in `knowledgebase/` (Markdown). Einstieg: `knowledgebase/README.md`.

### Design-Entscheidungen speichern

Wenn wir etwas für das Design der Website festlegen:

1. In die passende Datei unter `knowledgebase/design/` eintragen (farben, typografie, layout, komponenten, bildsprache). Gibt es kein passendes Thema, eine neue Datei anlegen und in `knowledgebase/design/README.md` verlinken.
2. Einen Eintrag oben in `knowledgebase/design/entscheidungen.md` ergänzen (Datum, Entscheidung, Begründung, betroffene Datei, von wem).
3. Erledigte `- [ ]`-Punkte abhaken oder entfernen.
4. Committen und pushen, damit der andere den Stand hat. Vorher `git pull`, weil wir zu zweit arbeiten.

Vor Design-Arbeit an der Website zuerst `knowledgebase/design/` lesen und die Festlegungen einhalten.

@knowledgebase/design/DESIGN-UND-ENTWICKLUNG.md
