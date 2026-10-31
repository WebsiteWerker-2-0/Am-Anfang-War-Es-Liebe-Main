# Farben

## Palette der Website (seit 31.10.2026)

Hallmark-Theme „Ink“: weißes Papier, Schwarz ohne Farbton, ein Teal als einzige Akzentfarbe. Nur Farben übernommen, Schriften und Aufbau bleiben. Werte in `website/src/app/(site)/globals.css`.

| Rolle | Wert | Kontrast | Einsatz |
|---|---|---|---|
| `--c-paper` | `oklch(99.5% 0.003 100)` | | Seitengrund |
| `--c-brand-surface` | `oklch(97% 0.004 100)` | | Hinweisflächen, Hilfeleiste |
| `--c-brand-primary` | `oklch(94% 0.006 100)` | | große Bänder (Selbstcheck) |
| `--c-ink-strong` | `oklch(16% 0 0)` | | Überschriften, Abschnittsbänder |
| `--c-ink` | `oklch(28% 0 0)` | 14,4:1 auf Papier | Fließtext |
| `--c-ink-muted` | `oklch(44% 0 0)` | 7,7:1 auf Papier | Metadaten |
| `--c-line` | `oklch(89% 0.004 100)` | | Linien |
| `--c-brand-secondary`, `--c-brand-accent`, `--c-focus` | `oklch(50% 0.095 188)` (Teal) | 5,6:1 auf Papier | Logo-Wort, Unterstreichungen, Balken, Fokus |

## Farben der Broschüre (nur noch in den Illustrationen)

Die Illustrationen behalten ihre Farben. Damit an den Bildern keine Kante entsteht, bleibt ihr Grund erhalten: `--c-illustration-ground` `#f5ddb9` und die gemessenen Flächen in `content/page-bands.ts`.

| Farbe | Hex | Quelle |
|---|---|---|
| Cyan | `#00A3D3` | Titel und Illustrationen |
| Orange | `#F17E01` | „Liebe …“ im Titel, Illustrationen |
| Magenta | `#EC008C` | Innenseiten, Illustrationen |
| Sand | `#F5DDB9` | Hintergrund der Illustrationen |

## Funktionsfarben

Für die Benutzeroberfläche erforderliche Abweichungen von der Broschürenpalette sind zulässig (Entscheidung vom 17.10.2026): Notausgang-Rot `#b00020`, Fehler, Erfolg, Fokus, Lichter der Selbstcheck-Ampel in echten Ampelfarben `--c-signal-red: #ff2a2a`, `--c-signal-yellow: #ffcc00`, `--c-signal-green: #00b050`, nur für die Grafik auf dunklem Gehäuse, nie für Schrift (siehe `selbstcheck.md`).

## Weitere Farben

Seit dem 31.10.2026 sind auch für Flächen und Gestaltung Farben außerhalb der Broschüre erlaubt. Jede wird als Token angelegt und hier eingetragen (Hex, Einsatz, Kontrast). Für Text gilt mindestens 4,5:1. Die Palette oben bleibt die Grundlage der Marke.

## Offen

- [ ] Farbwerte aus den Druckdaten (Z-06) farbmanagt übernehmen und diese Tabelle ersetzen
- [x] Farbe des Notausgangs: Rot `#b00020` (Funktionsfarbe, nicht aus der Broschüre), gedeckt durch die Entscheidung vom 17.10.2026
