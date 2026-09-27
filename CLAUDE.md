# Am Anfang war es Liebe – Website

## Website-Code

Die eigentliche Website (Next.js) liegt in `website/` — das ist auch das bei Vercel hinterlegte Root Directory. Alle Code-Änderungen an der Website (Seiten, Komponenten, Styles, Konfiguration) gehören ausschließlich in diesen Ordner, nicht ins Repo-Root. `knowledgebase/` ist nur für Dokumentation/Entscheidungen, nicht für Website-Code.

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
