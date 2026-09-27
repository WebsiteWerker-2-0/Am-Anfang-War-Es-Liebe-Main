# Website am-anfang-war-es-liebe.de

Erster Entwurf der neuen Website des Arbeitskreises „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“. Next.js (App Router), statisch erzeugt, Deployment über Vercel mit Root Directory `website/`.

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
| `src/content/posts.json` | Beiträge der Altseite, erzeugt mit `python3 ../altseite/import-posts.py`, später aus dem CMS (ADR-0001) |
| `src/assets/` | Broschüren-Illustrationen (`illustrations/`, `band-pNN` = Broschürenseite) und Tafeln der Wanderausstellung (`exhibition/`) |
| `public/medien/` | Bilder und Videos aus den Beiträgen der Altseite |
| `public/downloads/` | Dokumente: Broschüre, Flyer, Plakat |

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
- Förderlogo MKJFGFI (Z-11)
