# Am Anfang war es Liebe – Website

## Website-Code

Die eigentliche Website (Next.js) liegt in `website/` — das ist auch das bei Vercel hinterlegte Root Directory. Alle Code-Änderungen an der Website (Seiten, Komponenten, Styles, Konfiguration) gehören ausschließlich in diesen Ordner, nicht ins Repo-Root. `knowledgebase/` ist nur für Dokumentation/Entscheidungen, nicht für Website-Code.

**Stack-Entscheidung (überschreibt Abschnitt 10 der Design-Doku):** Next.js, nicht WordPress. Die in der Design-Doku unter Abschnitt 10 beschriebene WordPress-Architektur (Block-Theme, CPTs, Polylang) gilt **nicht mehr**. Fachliche Anforderungen aus der Design-Doku (Notausgang, Selbstcheck ohne Speicherung, Anlaufstellen, Mediathek, Veranstaltungen, Mehrsprachigkeit) bleiben bestehen und werden in Next.js umgesetzt.

**Blog-Bereich:** Die Auftraggeber sollen Blog-Inhalte selbst pflegen können. Next.js hat kein eigenes Redaktions-Interface, braucht also ein CMS im Hintergrund. Wahl noch offen (siehe unten) — solange ungeklärt, keinen Blog-Code fest an einen Anbieter binden.

## Hosting & Deployment

- **Zielhosting (produktiv):** Hostinger.
- **Aktuell / Preview:** Vercel (Root Directory `website`, Branch `main`). Jeder Push nach `main` löst automatisch ein Vercel-Deployment aus — dient aktuell der Vorschau, nicht dem finalen Hosting.
- Nach Code-Änderungen an der Website immer committen und pushen, damit das Ergebnis auf Vercel sichtbar wird — nicht nur lokal lassen.
- Vor dem Umzug auf Hostinger prüfen: Hostinger-Plan mit Node.js/Next.js-Unterstützung nötig (reines PHP-Hosting reicht nicht).

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
