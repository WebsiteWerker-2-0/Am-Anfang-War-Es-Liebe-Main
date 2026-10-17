# Entscheidungslog

Neueste Einträge oben. Jede Festlegung bekommt einen Eintrag und wird zusätzlich in die passende Themendatei übernommen.

## 2026-10-17 – Notausgang: Desktop-Leiste fixiert, Esc-Wiederholung ignoriert
- **Entscheidung:** Ab 64em bleibt die Hilfeleiste (mit Notausgang) beim Scrollen oben stehen (`position: sticky`), `scroll-padding-block-start` verhindert verdeckte Sprungmarken. Mobil bleibt der fixierte Knopf unten rechts. Das Tastenkürzel (zweimal Esc in 1 s) ignoriert Auto-Repeat (`e.repeat`), gehaltenes Esc löst nichts aus. Der Notausgang in den Sprachfassungen auf `/sprachen` trägt das `lang` der jeweiligen Sprache.
- **Begründung:** Grundsatz 1 (Abschnitt 2.1): Notausgang ohne Scrollen erreichbar. Auf Desktop war er nach dem Scrollen nicht mehr sichtbar. Gehaltenes Esc (z. B. beim Schließen eines Dialogs) hätte den Notausgang versehentlich ausgelöst.
- **Betrifft:** komponenten.md, `website/src/app/(site)/globals.css` (`.help-bar`), `website/src/components/QuickExit.tsx`, `website/src/components/blocks/index.tsx`
- **Von:** Enrico (mit Claude)

## 2026-10-13 – Hilfeleiste auf Sand, Schrift eine Stufe kleiner
- **Entscheidung:** Die Hilfeleiste steht auf einer Fläche in `--c-brand-surface` (Sand) statt auf Weiß mit Trennlinie. Schrift `--fs-xs` (0.833rem, neu) statt `--fs-sm`. Gestufte Textfarben: Beschriftungen und nicht aktive Sprachen in `--c-ink-muted`, Rufnummer und aktive Sprache in `--c-ink` und fett. Der Notausgang behält Größe und Farbe.
- **Begründung:** Leiste, Logo und Überschrift standen alle dunkel auf Weiß, die Leiste hob sich nicht vom Kopf ab. Sand ist laut farben.md für Hinweisflächen vorgesehen, also keine neue Farbe (harte Regel 2). Kontraste: `--c-ink` auf Sand 11,73:1, `--c-ink-muted` auf Sand 5,39:1. Cyan als Fläche wäre zu laut gewesen, eine dunkle Leiste hätte den dunklen Notausgang verschluckt.
- **Betrifft:** komponenten.md, farben.md, DESIGN-UND-ENTWICKLUNG.md Abschnitt 4.2, `website/src/app/globals.css` (`.help-bar`, `--fs-xs`)
- **Von:** Enrico (mit Claude)

## 2026-10-13 – Seitenkopf: Titel und Illustration in einem Band
- **Entscheidung:** Seiten mit Broschüren-Band (Hilfe, Kurse, Infos, Arbeitskreis, Aktuelles) zeigen Titel und Einleitung links auf Weiß, rechts eine Farbfläche (52vw) mit gewellter Kante und der Illustration unten rechts. Mobil steht die Fläche oben mit gewellter Unterkante. Unter dem Titel ein kurzer Balken in der Seitenfarbe (Orange bzw. Magenta), keine Wellenlinie. Entwurf im Claude-Design-Canvas „AAWEL Seitenbanner Redesign".
- **Begründung:** Das alte Band war eine leere Fläche über der Überschrift und schnitt Figuren ab. Text nie auf der Farbe, weil Magenta keinen Textkontrast erreicht. Bildhöhe auf 19rem gedeckelt, weil die Bänder nur 254 px hoch sind. Flächenfarbe je Band aus dem JPG gemessen, sonst ist das Bildrechteck zu sehen.
- **Betrifft:** komponenten.md, `website/src/components/PageHeader.tsx`, `website/src/content/page-bands.ts`, `website/src/app/globals.css` (`.page-hero`)
- **Von:** Enrico (mit Claude)

## 2026-10-13 – Förderlogo: unten weniger Polsterung
- **Entscheidung:** Die weiße Fläche um das MKJFGFI-Logo im Fuß hat unten 0.75rem statt 1rem Polsterung (oben 1rem, seitlich 1.5rem). Das Logo selbst bleibt unverändert (offizielle Datei, geprüft gegen bra.nrw.de).
- **Begründung:** Im offiziellen Logo steht der Text oben bündig am Wappen, das Wappen reicht weiter nach unten. Bei gleicher Polsterung wirkt unten mehr Weiß; optischer Ausgleich.
- **Betrifft:** komponenten.md, `website/src/app/globals.css` (`.funding-logo`)
- **Von:** Enrico (mit Claude)

## 2026-10-13 – Gendersprache: Gendersternchen
- **Entscheidung:** Personenbezeichnungen mit Gendersternchen (Freund*innen, Kolleg*innen), neutrale Formen bevorzugt. Weibliche Formen bleiben, wo nur Frauen gemeint sind (z. B. Beraterinnen der Frauenberatungsstelle). Texte des AG und archivierte Pressebeiträge bleiben im Wortlaut.
- **Begründung:** Von der Gleichstellungsstelle bestätigt.
- **Betrifft:** alle Website-Texte, DESIGN-UND-ENTWICKLUNG.md Abschnitt 14
- **Von:** Enrico (Freigabe Gleichstellungsstelle)

## 2026-09-27 – Erster Website-Entwurf in Next.js
- **Entscheidung:** Der erste Entwurf läuft als Next.js-Website in `website/` (Vercel). Farben vorläufig aus der Broschüren-PDF, Schriften Literata und IBM Plex Sans selbst gehostet, Broschüren-Illustrationen als Bildwelt, Ausstellungstafeln 2022 als Slider.
- **Begründung:** Vercel-Verknüpfung durch das Team; Gestaltung nach DESIGN-UND-ENTWICKLUNG.md („Die Broschüre, aufgeschlagen“). Die Vorgaben dort zu WordPress (Abschnitt 10) gelten für diesen Entwurf nicht.
- **Betrifft:** farben.md, typografie.md, komponenten.md
- **Von:** Enrico (mit Claude)

## 2026-09-27 – Arbeitsgrundlage Design und Entwicklung
- **Entscheidung:** `DESIGN-UND-ENTWICKLUNG.md` ist die verbindliche Arbeitsgrundlage für Gestaltung und Entwicklung.
- **Begründung:** Harte Regeln, Farbwelt und Komponenten an einer Stelle festhalten.
- **Betrifft:** DESIGN-UND-ENTWICKLUNG.md
- **Von:** Enrico

<!--
## JJJJ-MM-TT – Kurztitel
- **Entscheidung:** …
- **Begründung:** …
- **Betrifft:** farben.md / typografie.md / …
- **Von:** Name
-->
