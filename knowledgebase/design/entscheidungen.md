# Entscheidungslog

Neueste Einträge oben. Jede Festlegung bekommt einen Eintrag und wird zusätzlich in die passende Themendatei übernommen.

## 31.10.2026 – Backend-Startseite: Verwaltung getrennt von der Redaktion

- **Entscheidung:** Die Startseite des Backends zeigt zwei Abschnitte: „Redaktion“ mit den Werkzeugen für alle und darunter, durch eine Linie abgesetzt und ruhiger gestaltet, „Verwaltung“ mit „E-Mail und Anmeldungen“ und „Konten“, nur für Admins sichtbar.
- **Begründung:** Wunsch von Enrico; die Einstellungen sollen nicht zwischen den täglichen Aufgaben stehen. Das Menü trennte beides schon, keine neuen Menüpunkte.
- **Datei:** `website/src/cms/components/Dashboard.tsx`, `website/src/app/(payload)/custom.css`
- **Von:** Enrico (mit Claude)

## 31.10.2026 – Infos als Navigationsseite

- **Entscheidung:** Infos bekommt keine Unterseiten. Oben stehen Wegweiser in der Optik von „Sie sind hier, weil …“ zu Spurensicherung, Broschüren und Flyer, weiterführenden Informationen und Wanderausstellung, alle auf derselben Seite; dazu die Unterpunkte im Menü (Enrico). Rad der Gewalt und Gewaltspirale als Vorschau, Download als PDF.
- **Begründung:** Wunsch der Frauenberatungsstelle nach Unterpunkten, Entscheidung Steffen: eine Seite, die zu den Bereichen führt.
- **Datei:** `website/src/content/pages/info.ts`, Blöcke `linkHub` und `graphics`
- **Von:** Steffen (mit Claude)
## 31.10.2026 – Unterpunkte im Menü, Mitgliederliste ohne Namen

- **Entscheidung:** „Infos“ hat Unterpunkte: am Desktop beim Zeigen oder per Tastaturfokus, mobil immer sichtbar und eingerückt. Die Mitgliederliste nennt nur Einrichtungen, keine Namen.
- **Begründung:** Wünsche der Frauenberatungsstelle (21.10.2026) und des AG (28.10.2026).
- **Dateien:** `website/src/content/site.ts`, `website/src/components/SiteHeader.tsx`, `website/src/content/pages/working-group.ts`
- **Von:** Auftraggeber, umgesetzt mit Claude

## 31.10.2026 – Seitenköpfe Hilfe und Infos getauscht

- **Entscheidung:** Hilfe zeigt das pinke Band mit der Rechtsanwältin, die Frau und Kind schützt (band-p12), Infos das orangefarbene Band mit Frau und Kind auf dem Weg (band-p07). Ton und Grundfarbe der Bänder wandern mit.
- **Begründung:** Wunsch der Frauenberatungsstelle (Anmerkungen vom 21.10.2026).
- **Datei:** `website/src/content/page-bands.ts`
- **Von:** Steffen (mit Claude)

## 17.10.2026 – Bilder im Beitrag, Downloads, Archiv auf Aktuelles

- **Entscheidung:** Bilder im Text mittig in voller Textbreite oder links/rechts in halber Breite (3:2 zugeschnitten, Text daneben, mobil volle Breite), unabhängig von der Auflösung der Datei. Downloads als Liste unter dem Beitrag: Vorschaubild oder PDF-Symbol, Name, „PDF, Größe“, dunkler Knopf „Download“. Archivierte Beiträge eingeklappt („Archiv (n)“) am Ende von Aktuelles, im Stil der Anlaufstellen-Gruppen.
- **Begründung:** Wunsch des Auftraggebers; einheitliches Bild, egal was hochgeladen wird; Downloads sofort erkennbar.
- **Datei:** `website/src/app/(site)/globals.css` (`.figure`, `.downloads`, `.archive`)
- **Von:** Steffen (mit Claude)

## 17.10.2026 – Redaktionsbereich farblos, nächster Schritt hervorgehoben

- **Entscheidung:** Das Backend bleibt Liquid Glass, aber ohne Farben (Grautöne). Die wichtigste Aktion jeder Seite ist die einzige dunkle, kräftige Fläche; „Speichern“ bleibt beim Scrollen sichtbar.
- **Begründung:** Wunsch des Auftraggebers nach schlichterer Oberfläche; Laien finden den nächsten Schritt sofort.
- **Datei:** `website/src/app/(payload)/custom.css`
- **Von:** Steffen (mit Claude)

## 2026-10-17 – Selbstcheck-Ampel in echten Ampelfarben
- **Entscheidung:** Die Lichter der Ampel leuchten in echtem Rot `#ff2a2a`, Gelb `#ffcc00` und Grün `#00b050` (Tokens `--c-signal-*`). Das Gehäuse ist dunkel (`--c-ink`) wie bei einer echten Ampel statt weiß. `--c-warning` (Ocker) entfällt.
- **Begründung:** Wunsch von Enrico: Die gedeckten Funktionsfarben wirkten nicht wie eine Ampel. Echtes Gelb erreicht auf Weiß nur 1,5:1, auf dem dunklen Gehäuse 10,2:1, Rot 4,1:1, Grün 5,4:1. Die Farben sind nur Grafik, die Stufe steht als Text daneben.
- **Betrifft:** selbstcheck.md, farben.md, `website/src/app/(site)/globals.css` (`--c-signal-*`, `.traffic-light`), `website/src/components/SelfCheck.tsx`
- **Von:** Enrico (mit Claude)

## 2026-10-17 – Selbstcheck: eigenes Band, Ergebnis als gezeichnete Ampel
- **Entscheidung:** Der Selbstcheck steht auf einem Band in Cyan über die volle Breite mit Wellenkanten und der Illustration „thoughts“ (wie das Band der Startseite). Alles darin in Tinte. Das Ergebnis zeigt eine gezeichnete Ampel neben der Stufe als Überschrift statt Etikett mit Symbol und Karte mit farbiger Kante. Fortschritt als Punkte je Aussage im Bereich statt „Frage n“. Der Hinweisblock über dem Selbstcheck entfällt, der Hinweis steht oben im Band.
- **Begründung:** Rückmeldung von Enrico: Der Selbstcheck ging im Lesefluss unter, das Ergebnis wirkte generisch. Das Band hebt ihn ab und knüpft an die Startseite an. Die Ampel zeigt, wo die Stufe auf der Skala liegt, was ein Etikett nicht kann. Cyan erlaubt nur Tinte als Schrift (5,3:1).
- **Betrifft:** selbstcheck.md, komponenten.md, `website/src/components/SelfCheck.tsx`, `website/src/components/blocks/index.tsx` (`SelfCheckStage`), `website/src/app/(site)/globals.css` (`.self-check-stage`, `.traffic-light`, `html { overflow-x: clip }`), `website/src/content/pages/self-check.ts`
- **Von:** Enrico (mit Claude)

## 2026-10-17 – Selbstcheck als Entscheidungsbaum mit Ampel
- **Entscheidung:** Der Selbstcheck fragt eine Frage nach der anderen und verzweigt: Gefahr jetzt, um wen es geht (mich, eine Frau, die ich kenne, ein Kind), Bereich der Gewalt, dann die Aussagen einzeln (Ja / Nein / Weiß nicht / Überspringen). Am Ende steht eine Ampel Grün / Gelb / Rot aus gewichteten Aussagen. Warnzeichen führen immer zu Rot. Grün ist keine Entwarnung, jede Stufe nennt passende Hilfe und den Hinweis „keine fachliche Einschätzung“. Gelb `--c-warning: #8a5a00` ist neu (5,9:1). Der Baum liegt im Code und ist mit Tests abgesichert, ohne JavaScript bleibt die Checkliste. Auf der Startseite bleibt das Band mit Verweis.
- **Begründung:** Wunsch nach mehr Interaktivität. Die Ampel ersetzt die Vorgabe „keine Auswertung, keine Ampel“ aus Abschnitt 6.3 bewusst. Einwand von Claude: Eine Ampel kann Frauen in Gefahr falsch beruhigen. Deshalb Warnzeichen, die immer zu Rot führen, keine Entwarnung bei Grün und Freigabe durch die Fachfrauen des AG vor dem Livegang. Die Speicherregeln (ADR-0003) gelten unverändert.
- **Offen:** Gewichte, Schwellen, Warnzeichen und Texte sind ein Entwurf von Claude. Auf Enricos Entscheidung am 17.10.2026 ohne Freigabe durch den AG live geschaltet. Die fachliche Freigabe (Z-02) ist nachzuholen.
- **Betrifft:** selbstcheck.md (neu), komponenten.md, farben.md, DESIGN-UND-ENTWICKLUNG.md Abschnitt 6.3 und 14, CONTEXT.md (Selbstcheck, Bereich, Ampel, Warnzeichen), `website/src/content/self-check-tree.ts`, `website/src/lib/self-check.ts`, `website/src/components/SelfCheck.tsx`, `website/src/app/(site)/globals.css`
- **Von:** Enrico (mit Claude)
## 2026-10-17 – Redaktionsbereich: schlank, groß, Liquid Glass
- **Entscheidung:** Das Backend zeigt der Redaktion nur Aktuelles, Veranstaltungen und das Dateiarchiv, Admins zusätzlich Verwaltung. Seiten, Anlaufstellen, Menü und Fuß sind nicht im Backend änderbar. Gestaltung des Backends als Liquid Glass (durchscheinende Flächen, warme Verläufe in Orange und Magenta), Menüpunkte 19 px und 56 px hoch, helle und dunkle Ansicht, Startseite mit großen Schaltflächen.
- **Begründung:** Die Redaktion bedient das Backend ohne Vorkenntnisse und soll nur das Nötigste ändern können. Die Gestaltung der Website selbst bleibt unberührt.
- **Betrifft:** `website/src/app/(payload)/custom.css`, `docs/adr/0006-schlanke-redaktion.md`. Die dunkleren Orange- und Magentatöne (`#d9480f`, `#c2185b`) sind Funktionsfarben der Oberfläche für Kontrast zu weißer Schrift, keine Markenfarben (siehe Entscheidung zu UI-bedingten Farbabweichungen).
- **Von:** Steffen

## 2026-10-17 – Notausgang: Hinweistext in jeder Sprachfassung
- **Entscheidung:** Auf `/sprachen` steht unter dem Notausgang jeder Sprachfassung (AR, RU, EN, TR) ein Satz zu Ziel (Wettervorhersage bei Google) und Tastenkürzel (zweimal Esc), Schrift `.small`, mit `lang` und `dir` der Fassung. Die Texte liegen im Code (`QUICK_EXIT_HINTS`), nicht im CMS. Beschriftungen geprüft: „مغادرة الصفحة“, „Покинуть страницу“, „Leave this page“, „Sayfadan çık“; AR mit `dir="rtl"` und gespiegeltem Icon.
- **Begründung:** Abschnitt 6.2: Das Tastenkürzel muss erklärt werden, bisher nur auf Deutsch (`/internetspuren`). Im Code statt im CMS, weil der Hinweis das Ziel beschreibt und sich mit ihm ändern muss; so gilt er auch sofort auf der laufenden Seite ohne Migration.
- **Offen:** Übersetzungen von Claude, Freigabe durch den AG steht aus (`OFFEN:` im Code).
- **Betrifft:** komponenten.md, `website/src/content/navigation.ts`, `website/src/components/blocks/index.tsx`
- **Von:** Enrico (mit Claude)

## 2026-10-17 – Notausgang: Back-Forward-Cache und no-store
- **Entscheidung:** Kehrt eine Seite, die den Notausgang ausgelöst hatte, aus dem Back-Forward-Cache zurück (`pageshow` mit `event.persisted`), löst sie ihn sofort erneut aus. Der Merker liegt nur im Arbeitsspeicher der Seite. Zusätzlich senden alle Seiten `Cache-Control: no-store`, gesetzt in `src/proxy.ts`, weil Next.js den Header aus `next.config.ts` bei vorgerenderten Seiten überschreibt. Statische Dateien bleiben cachebar.
- **Begründung:** Wer nach dem Notausgang „Zurück“ drückt, soll die Website nicht aus dem Cache wiedersehen. Bewusst nicht bei jeder Rückkehr aus dem Cache auslösen, sonst würfe schon ein normales Zurück innerhalb der Website die Besucherin hinaus. `no-store` hält die Seiten außerdem aus dem Browser-Zwischenspeicher (Internetspuren). Folge: Das Hostinger-CDN speichert die HTML-Seiten nicht mehr zwischen, jede Anfrage geht an Next.js (dort weiter mit 60-s-Cache).
- **Betrifft:** komponenten.md, DESIGN-UND-ENTWICKLUNG.md Abschnitt 6.2, `website/src/components/QuickExit.tsx`, `website/src/proxy.ts`
- **Von:** Enrico (mit Claude)

## 2026-10-17 – Notausgang: Ziel bleibt Google-Suche „wetter“
- **Entscheidung:** Der Notausgang führt weiter auf `https://www.google.com/search?q=wetter`. Verworfen: dwd.de.
- **Begründung:** Wie in Abschnitt 6.2 vorgesehen; im Verlauf steht nur eine Wettersuche. Bekannter Nachteil: Ein frischer Browser zeigt zuerst Googles Cookie-Abfrage.
- **Betrifft:** komponenten.md, `website/src/content/navigation.ts` (`QUICK_EXIT_URL`)
- **Von:** Enrico

## 2026-10-17 – UI-bedingte Farbabweichungen sind zulässig
- **Entscheidung:** Farbabweichungen von der Broschürenpalette, die für die Benutzeroberfläche erforderlich sind (Funktionsfarben wie Notausgang-Rot, Fehler, Erfolg, Fokus), sind in Ordnung. Markenfarben und Flächen der Gestaltung bleiben an die Broschüre gebunden (harte Regel 2).
- **Begründung:** Funktionsfarben müssen Kontrast und Erkennbarkeit sichern, was die Broschürenpalette nicht leistet (Magenta und Orange erreichen keinen Textkontrast, Rot fehlt ganz).
- **Betrifft:** farben.md, DESIGN-UND-ENTWICKLUNG.md Abschnitt 0 (Regel 2), Abschnitt 14, Eintrag „Notausgang in Rot mit Icon“
- **Von:** Enrico

## 2026-10-17 – Notausgang in Rot mit Icon
- **Entscheidung:** Der Notausgang ist rot (`--c-exit-bg: #b00020`, Schrift weiß) und trägt ein Icon (Tür mit Pfeil nach außen, Inline-SVG, in RTL gespiegelt). Der fixierte Mobil-Knopf hat zusätzlich einen weißen 2-px-Ring.
- **Begründung:** Der Notausgang soll sich auf jeder Seite sofort erkennen lassen. Rot ist sonst nirgends Flächenfarbe, Kontrast zu Weiß 7,3:1, zu Sand 5,6:1.
- **Abweichung:** Rot stammt nicht aus der Broschüre (harte Regel 2). Es ist eine Funktionsfarbe wie `--c-error`. Die Abweichung ist durch die Entscheidung „UI-bedingte Farbabweichungen sind zulässig“ gedeckt (gleicher Tag).
- **Betrifft:** komponenten.md, farben.md, DESIGN-UND-ENTWICKLUNG.md Abschnitt 14, `website/src/app/(site)/globals.css` (`--c-exit-bg`, `.quick-exit__icon`), `website/src/components/QuickExit.tsx`
- **Von:** Enrico (mit Claude)

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
