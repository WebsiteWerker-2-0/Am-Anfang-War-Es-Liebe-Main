# Am Anfang war es Liebe – Website

## Website-Code

Die eigentliche Website (Next.js) liegt in `website/` — das ist auch das bei Vercel hinterlegte Root Directory. Alle Code-Änderungen an der Website (Seiten, Komponenten, Styles, Konfiguration) gehören ausschließlich in diesen Ordner, nicht ins Repo-Root. `knowledgebase/` ist nur für Dokumentation/Entscheidungen, nicht für Website-Code.

**Stack-Entscheidung (überschreibt Abschnitt 10 der Design-Doku):** Next.js, nicht WordPress. Die in der Design-Doku unter Abschnitt 10 beschriebene WordPress-Architektur (Block-Theme, CPTs, Polylang) gilt **nicht mehr** (Begründung: `docs/adr/0001-nextjs-statt-wordpress.md`). Fachliche Anforderungen aus der Design-Doku (Notausgang, Selbstcheck ohne Speicherung, Anlaufstellen, Mediathek, Veranstaltungen, Mehrsprachigkeit) bleiben bestehen und werden in Next.js umgesetzt.

**Blog-Bereich:** Die Auftraggeber sollen Blog-Inhalte selbst pflegen können. Next.js hat kein eigenes Redaktions-Interface. **Entschieden: self-hosted Headless-CMS** (Payload oder Strapi, läuft mit auf eigenem Server/Hostinger, keine Inhalte bei Dritten — passt zu Regel 1 der Design-Doku). Konkretes Produkt (Payload vs. Strapi) noch offen, mit AG/Kollege final klären.

**Harte Regeln aus Design-Doku Abschnitt 0 gelten unverändert für Next.js**, nur die technische Umsetzung wechselt von WordPress zu Next.js: keine externen Ressourcen (Fonts, CDN, Embeds, Tracking), Farben strikt aus Broschüre, kein Speichern des Selbstchecks/Kontaktformulars, Notausgang auf jeder Seite, keine Flaggen, keine Secrets im Repo. Schriften (Literata, IBM Plex Sans) lädt `next/font` beim Build und liefert sie selbst aus, der Browser fragt nie bei Google an (`docs/adr/0002-keine-externen-ressourcen.md`).

**Feature-Umfang:** Es werden alle fachlichen Anforderungen aus `DESIGN-UND-ENTWICKLUNG.md` Abschnitt 10.2 in Next.js umgesetzt: Anlaufstellen, Veranstaltungen, Mediathek, Aktuelles/Blog, Selbstcheck — plus Notausgang (Abschnitt 6.2) und Mehrsprachigkeit DE/AR/RU/EN/TR inkl. RTL (Abschnitt 10.3). Die dort beschriebene WordPress/Polylang-Umsetzung ist die Zielbeschreibung *der Anforderung*, nicht mehr die technische Vorgabe.

## Hosting & Deployment

- **Zielhosting (produktiv):** Hostinger.
- **Aktuell / Preview:** Vercel (Root Directory `website`, Branch `main`). Jeder Push nach `main` löst automatisch ein Vercel-Deployment aus — dient aktuell der Vorschau, nicht dem finalen Hosting.
- Nach Code-Änderungen an der Website immer committen und pushen, damit das Ergebnis auf Vercel sichtbar wird — nicht nur lokal lassen.
- Vor dem Umzug auf Hostinger prüfen: Hostinger-Plan mit Node.js/Next.js-Unterstützung nötig (reines PHP-Hosting reicht nicht).

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
