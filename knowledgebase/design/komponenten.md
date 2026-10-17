# Komponenten

<!-- Pro Komponente ein Abschnitt: Aussehen, Zustände (hover/aktiv/deaktiviert), Einsatz -->

## Hilfeleiste

- Fläche in Sand (`--c-brand-surface`), keine Trennlinie zum Kopf.
- Schrift `--fs-xs`; Beschriftungen und nicht aktive Sprachen `--c-ink-muted`, Rufnummer und aktive Sprache `--c-ink` fett.
- Notausgang unverändert (`--fs-sm`, `--c-exit-bg`), hebt sich als einzige dunkle Fläche ab.

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
