# Komponenten

<!-- Pro Komponente ein Abschnitt: Aussehen, Zustände (hover/aktiv/deaktiviert), Einsatz -->

## Hilfeleiste

- Helle Fläche (`--c-brand-surface`), keine Trennlinie zum Kopf.
- Schrift `--fs-xs`; Beschriftungen und nicht aktive Sprachen `--c-ink-muted`, Rufnummer und aktive Sprache `--c-ink` fett.
- Notausgang (`--fs-sm`, `--c-exit-bg`) in Rot `#b00020` mit weißer Schrift und Icon (Tür mit Pfeil nach außen, Inline-SVG, `aria-hidden`, in RTL gespiegelt). Er ist die einzige rote Fläche der Seite und hebt sich so von Sand und Inhalt ab.
- Mobil fixierter Knopf zusätzlich mit weißem 2-px-Ring, damit er auf jedem Hintergrund sichtbar bleibt.
- Ab 64em sticky am oberen Rand, damit der Notausgang auf Desktop beim Scrollen erreichbar bleibt. Mobil übernimmt der fixierte Knopf unten rechts.
- Tastenkürzel zweimal Esc in 1 s; gehaltene Taste (`e.repeat`) zählt nicht.
- Ziel: Google-Suche `q=wetter` (`QUICK_EXIT_URL` in `content/navigation.ts`), bestätigt am 17.10.2026.
- Back-Forward-Cache: Holt der Browser eine Seite zurück, die den Notausgang schon ausgelöst hatte (`pageshow` mit `event.persisted`), verlässt sie sich sofort wieder. Der Merker liegt nur im Arbeitsspeicher. Normales Zurück innerhalb der Website bleibt möglich.
- Alle Seiten der Website senden `Cache-Control: no-store` (`src/proxy.ts`), damit der Browser sie weder im Back-Forward-Cache noch im Zwischenspeicher ablegt. Statische Dateien (`/_next/`, Adressen mit Dateiendung) bleiben cachebar.
- Sprachfassungen auf `/sprachen`: unter dem Notausgang ein Satz zu Ziel und Tastenkürzel in der jeweiligen Sprache (`QUICK_EXIT_HINTS`, im Code wie das Ziel). Deutscher Hinweis auf `/internetspuren`.
- [ ] Hinweistexte AR, RU, EN, TR vom AG freigeben lassen

## Selbstcheck

- Entscheidungsbaum mit Ampel, eine Frage pro Schritt, auf einem hellen Band über die volle Breite mit Wellenkanten. Ergebnis als gezeichnete Ampel neben der Stufe. Festlegungen in `selbstcheck.md`.
- Neue Knopfstile dafür: `.button--secondary` (weiß mit dunklem Rand), `.link-button` (Knopf im Aussehen eines Links), `.choice` (Auswahl über volle Breite mit Beschreibung).

## Seitenkopf mit Broschüren-Band

- Desktop (ab 64em): Titel und Einleitung links auf Weiß, Farbfläche rechts (52vw) mit gewellter Kante, Illustration unten rechts, max. 19rem hoch.
- Mobil: Farbfläche oben über volle Breite mit gewellter Unterkante, Text darunter.
- Unter dem Titel ein kurzer Balken (3rem × 0.25rem) in Orange bzw. Magenta.
- Flächenfarbe = gemessener Grund des JPGs (`content/page-bands.ts`), Bildausschnitt je Band einstellbar.
- [ ] Bänder in höherer Auflösung aus den Druckdaten (Z-06) neu exportieren, dann Farben neu abgleichen

## Förderhinweis im Fuß

- MKJFGFI-Logo (offizielle Datei, unverändert) auf weißer Fläche, weil die Schrift schwarz auf transparentem Grund ist.
- Polsterung oben 1rem, unten 0.75rem (optischer Ausgleich, Text steht im Logo oben bündig am Wappen), seitlich 1.5rem.

## Offen

- [ ] Button-Stile festlegen
- [ ] Navigation festlegen
