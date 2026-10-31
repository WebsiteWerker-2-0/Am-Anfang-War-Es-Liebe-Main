# Selbstcheck

Festlegungen für den interaktiven Selbstcheck (F-02). Entscheidungen vom 17.10.2026, siehe `entscheidungen.md`. **Live seit 17.10.2026, noch ohne fachliche Freigabe durch den AG** (Entscheidung Enrico). Texte, Gewichte und Warnzeichen sind ein Entwurf, die Freigabe ist nachzuholen.

## Ablauf (Entscheidungsbaum)

Eine Frage pro Schritt, keine eigene Adresse und kein Verlaufseintrag je Frage.

1. „Sind Sie oder ist jemand anderes gerade in Gefahr?“ Ja / Nein / Weiß nicht. Bei Ja kommt zuerst ein Hilfeschritt mit 110 und Hilfetelefon, danach geht es auf Wunsch weiter.
2. „Um wen geht es?“ Mich selbst / eine Frau, die ich kenne / ein Kind oder eine*n Jugendliche*n.
3. Bereich wählen (nicht bei Kindern): Kontrolle und seelische Gewalt, Körperliche Gewalt und Drohungen, Sexuelle Gewalt, Geld und Arbeit, Stalking und digitale Gewalt, Druck über die Kinder. Oder „Alle Bereiche nacheinander“.
4. Die Aussagen des Bereichs einzeln: Ja / Nein / Weiß nicht, dazu „Überspringen“. Nach einem Bereich: weitere Bereiche oder „Zum Ergebnis“.
5. Ergebnis als Ampel mit Hilfe passend zu den Bereichen, in denen etwas zutraf.

Immer da: „Zurück“ und „Neu beginnen“. Über jeder Aussage stehen der Bereich und je Aussage ein Punkt: erledigt gefüllt, aktuell als gefüllter Strich, offen als Ring (für Screenreader „Aussage n von m“). Kein Fortschritt über den ganzen Baum, weil die Äste unterschiedlich lang sind. Bei jedem Schritt springt der Fokus auf die neue Frage, beim Laden der Seite nicht.

## Ampel

| Stufe | Bezeichnung | Wann |
|---|---|---|
| Grün | Wenige Anzeichen | Summe der Gewichte unter 2, kein Warnzeichen |
| Gelb | Deutliche Anzeichen von Gewalt | Summe ab 2, oder „Weiß nicht“ bei einem Warnzeichen oder bei der Gefahrenfrage |
| Rot | Hinweise auf hohe Gefahr | Summe ab 6, ein Warnzeichen mit „Ja“ oder „Ja“ bei der Gefahrenfrage |

- Gewichte 1 bis 3 je Aussage. „Nein“, „Überspringen“ und „Weiß nicht“ zählen nicht zur Summe.
- **Warnzeichen** (mit „Ja“ immer Rot): Todesdrohung, Würgen, Waffe, Zunahme der Gewalt, Gewalt in der Schwangerschaft, Vergewaltigung, Verfolgen nach der Trennung; bei Kindern Schlagen/Einsperren und sexuelle Übergriffe.
- Grün ist keine Entwarnung. Der Text sagt: dem eigenen Gefühl vertrauen, darüber sprechen.
- Gelb nur wegen „Weiß nicht“ hat einen eigenen Text, weil dann nichts Zutreffendes beschrieben wurde.
- Bei Rot werden die Warnzeichen mit „Ja“ aufgelistet, die Hilfe beginnt mit dem Notruf 110.
- Unter jedem Ergebnis steht: „Dieser Selbstcheck ist keine fachliche Einschätzung und ersetzt keine Beratung. Wenn Sie sich bedroht fühlen, nehmen Sie das ernst, auch wenn das Ergebnis etwas anderes sagt.“

## Gestaltung

- **Band:** Der Selbstcheck steht auf einem eigenen Band in Cyan (`--c-brand-primary`) über die volle Breite, mit gewellter Kante oben und unten. Es ist dasselbe Band wie „Gewalt hat viele Gesichter“ auf der Startseite, von dem man herkommt. Ab 64em steht rechts unten die Illustration „thoughts“, deren Grund dasselbe Cyan ist; mobil entfällt sie, damit die Frage oben bleibt. Der Hinweis „wird nicht gespeichert“ steht mit Schloss oben im Band.
- **Nur Tinte auf Cyan:** `--c-ink` erreicht 5,3:1. Gedämpfte Schrift, Fokusblau, Weiß und die Ampelfarben erreichen dort nur 2 bis 2,9:1, deshalb im Band keine gedämpfte Schrift und Fokusring in Tinte.
- **Fragen** in Literata `--fs-lg`, die Einleitung der Aussage („Ihr (Ex-)Partner …“) in Plex darüber.
- **Antworten** als Knöpfe `.button--secondary` (weiß mit dunklem Rand), mindestens 48 px hoch. „Überspringen“, „Zurück“ und „Neu beginnen“ als `.link-button`. Bereichswahl als `.choice` über volle Breite mit kurzer Beschreibung.
- **Ergebnis:** eine gezeichnete Ampel (dunkles Gehäuse in `--c-ink` wie eine echte Ampel, drei Lichter, nur eines leuchtet) neben der Stufe als Überschrift in Literata `--fs-xl`. Keine Etiketten, keine Karten, keine farbigen Kanten: Die Ampel ist die einzige farbige Stelle. Lichter in echten Ampelfarben: Rot `--c-signal-red` (#ff2a2a, 4,1:1 zum Gehäuse), Gelb `--c-signal-yellow` (#ffcc00, 10,2:1), Grün `--c-signal-green` (#00b050, 5,4:1). Ausgeschaltete Lichter nur leicht heller als das Gehäuse. Das Gehäuse hebt sich mit 5,3:1 vom Cyan ab. Ein weißes Gehäuse ginge nicht, weil Ampelgelb auf Weiß nur 1,5:1 erreicht. Die Grafik ist `aria-hidden`, die Stufe steht als Text da (WCAG 1.4.1), für Screenreader mit „Ergebnis:“ davor.
- Darunter der Text der Stufe als Einleitung, bei Rot die Warnzeichen als Liste mit Linien, dann „Wer Ihnen helfen kann“ wie die Anlaufstellen (Nummern groß in Literata) und der Hinweis „keine fachliche Einschätzung“.

## Datenschutz (ADR-0003)

- Ausgewertet wird nur im Browser. Der Zustand liegt im Arbeitsspeicher der Komponente: keine Anfrage, kein Web Storage, keine Cookies, keine Adressänderung, kein Verlaufseintrag.
- Kehrt die Seite aus dem Back-Forward-Cache zurück, beginnt der Selbstcheck neu. Die Seite sendet ohnehin `Cache-Control: no-store`.

## Technik und Pflege

- Inhalt: `website/src/content/self-check-tree.ts`, Ablauf und Bewertung: `website/src/lib/self-check.ts`, Oberfläche: `website/src/components/SelfCheck.tsx`.
- Der Baum liegt im Code, nicht im CMS. `npm test` prüft, dass jeder Weg an einem Ergebnis ankommt, die Ampelregeln greifen und jeder Hilfe-Link auf einen vorhandenen Anker der Hilfeseite zeigt.
- Ohne JavaScript erscheint die Checkliste (Block „Selbstcheck“ in `website/src/content/pages/self-check.ts`). Seiten stehen seit ADR-0006 nur im Code.
- Nur auf `/selbstcheck`. Die Startseite verweist weiter mit dem Band „Gewalt hat viele Gesichter“.

## Offen (Fragen an den AG, Z-02)

- [ ] **Dringend, weil schon live:** Fachliche Freigabe der Ampel: Gewichte, Schwellen (2 und 6) und Warnzeichen. Entwurf nach anerkannten Risikofaktoren (u. a. Danger Assessment nach Campbell), keine validierte Gefährdungseinschätzung.
- [ ] Texte der drei Stufen für jede Person (mich, eine Frau, die ich kenne, ein Kind), der Text für Unsicherheit und der Hinweis „keine fachliche Einschätzung“.
- [ ] Neue Aussagen (im Code mit `added: true`): Handy kontrollieren, Würgen, Waffe, Zunahme der Gewalt, Schwangerschaft, Druck zu sexuellen Handlungen und Nacktbildern, Schulden auf den eigenen Namen, Auflauern nach der Trennung, sowie alle sechs Aussagen zu Kindern.
- [ ] Ast „Kind oder Jugendliche*r“: Gehört er in den Selbstcheck, oder reicht ein Verweis auf Jugendamt und Nummer gegen Kummer? Wer im Arbeitskreis kann die Aussagen fachlich prüfen?
- [ ] Hilfe je Bereich: Passt die Zuordnung der Anlaufstellen?
- [ ] Übersetzungen für AR, RU, EN, TR, sobald die Sprachfassungen kommen.
