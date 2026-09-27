# Design und Entwicklung: am-anfang-war-es-liebe.de

Arbeitsgrundlage für Claude (Chat und Claude Code) bei allen Aufgaben zu Gestaltung, Theme, Templates, CSS, JavaScript und WordPress-Konfiguration. Vertragliche Eckdaten stehen in `PROJEKT.md`; bei Widerspruch gilt `PROJEKT.md` bzw. die Vertragsdokumente.

Einbindung in Claude Code: in `CLAUDE.md` die Zeilen `@PROJEKT.md` und `@DESIGN-UND-ENTWICKLUNG.md` ergänzen.

**Stand:** 27.09.2026

---

## 0. Harte Regeln (vor jeder Änderung prüfen)

1. **Keine externen Ressourcen.** Keine Google Fonts, kein CDN, keine YouTube/Vimeo-Embeds, keine Karten, kein Gravatar, keine Tracking- oder Consent-Skripte. Jede Datei wird vom eigenen Server ausgeliefert.
2. **Farbwelt der Broschüre 1:1.** Markenfarben ausschließlich aus den Druckdaten (Z-06). Keine eigenen Farbtöne erfinden. Siehe Abschnitt 3.
3. **Kontaktformular speichert nichts.** Keine Einträge in der Datenbank, kein Entry-Logging, keine Kopie in Logs.
4. **Selbstcheck bleibt im Browser.** Kein Request, kein `localStorage`, kein `sessionStorage`, keine Cookies.
5. **Notausgang auf jeder Seite**, in jeder Sprache, auch in 404, Suche, Archiven.
6. **Keine Flaggen** für Sprachen. Sprachnamen in der jeweiligen Sprache ausschreiben.
7. **Keine Secrets im Repo** (Zugangsdaten, `wp-config.php` mit Keys, DB-Dumps, AUTH-Codes, Formulardaten).
8. **Neues Plugin mit Datenfluss nach außen** (Mail-Relay, API, Lizenzserver mit Nutzerdaten) nur nach Rücksprache: auslösende AVV-Informationspflicht mit 4-wöchiger Widerspruchsfrist (AVV § 5 Abs. 2).
9. **Sprache im Code:** Kommentare, Commit-Messages und UI-Texte auf Deutsch; Bezeichner (Klassen, Funktionen, Tokens) auf Englisch.

---

## 1. Referenzanalyse

Ausgewertet am 27.09.2026. Übernommen werden Muster, keine Gestaltung.

| Referenz | Übernehmen | Nicht übernehmen |
|---|---|---|
| **am-anfang-war-es-liebe.de** (Altseite, WordPress 6.9.9) | Selbstcheck-Inhalt als Ausgangsmaterial; Broschüre als Kern der Marke; Hinweis „Ihr Selbstcheck wird nicht gespeichert“; Link „Internetspuren“ prominent oben (wird F-09) | Eigener Schriftwechsler und A/A/A-Größenumschalter (ersetzt durch solide Grundgröße und Browser-Zoom); Header-Bild ohne Funktion; aktuell gesetztes `noindex` |
| **gewaltschutz-muenster.de** (Joomla/YOOtheme) | Einstieg nach Zielgruppe („Sie sind betroffen / Sie wollen helfen“); eigener Bereich „Was tun im Notfall?“ mit kurzen Linklisten; Hilfetelefon als eigener, wiederkehrender Block; Link „Zum Hauptinhalt springen“; Leichte-Sprache-Einstieg als Idee | Accessibility-Overlay-Toolbar (Farben umkehren usw.); Sprachwahl über Flaggen-GIFs; Zitat als Hero; Cookie-Einstellungen |
| **frauenhilfe-westfalen.de** (WordPress/Elementor) | Veranstaltungsliste mit Datum links und Ort; News-Teaser mit Datum; klare Rubrik „Kontakt aufnehmen“; Erklärung zur Barrierefreiheit im Footer | Elementor (Gewicht, Google-Fonts-Einstellung aktiv); Mega-Menü mit Ankerlinks; Zahlenband („300+ Bildungsangebote“); Social-Embeds |
| **frauenhilfe-muenchen.de** (TYPO3) | Telefonnummer dauerhaft im Kopf und als `tel:`-Link; Hero mit einer Botschaft und einer Handlung; drei klare Einstiege; Sprachen ausgeschrieben; Hinweis auf Browser-Zoom statt eigener Schriftgrößenknöpfe; fixierter Notausgang; Förderlogos gesammelt im Footer (Muster für F-12) | YouTube-Embed im Hero; `maximum-scale=1` im Viewport (blockiert Zoom); Notausgang als Bilddatei ohne Textalternative |
| **superpower.com** (Webflow, kommerziell) | Hero mit einem klaren Versprechen, einer Haupt- und einer Nebenhandlung und drei kurzen Vertrauensaussagen darunter; echter nummerierter Ablauf nur dort, wo die Inhalte eine Reihenfolge haben („How it works“ in 4 Schritten); FAQ als Akkordeon mit ausführlichen Antworten; großzügige Weißräume und große Headline-Typografie; Datenschutz als eigenes, verständlich erklärtes Thema | Verkaufsrhetorik, Preisanker, Statistiken als Überzeugungsmittel, Testimonials-Karussell, Pop-up-Modal, Cookie-Banner, Google Tag Manager, Autoplay-Medien |

**Ableitung:** Klarheit und Handlungsführung von Superpower und München, Zielgruppen-Einstieg von Münster, Veranstaltungs- und Aktuelles-Muster von Westfalen, Inhalt und Tonalität aus der Broschüre.

---

## 2. Gestaltungskonzept: „Die Broschüre, aufgeschlagen“

Die Website übersetzt die Broschüre (Stand Juli 2016, Gestaltung und Illustrationen fien-design.de) in ein ruhiges, lesbares Medium. Die Broschüre liefert bereits die Dramaturgie: Sie beginnt mit „Sie lesen diese Broschüre, weil …“ und gliedert die Hilfe in wiederkehrende Fragen „Was kann … für Sie tun?“. Diese beiden Figuren sind das gestalterische Rückgrat.

### 2.1 Prinzipien

1. **Hilfe vor Inhalt.** Von jeder Seite aus sind Notausgang, Hilfetelefon und Sprachwahl ohne Scrollen erreichbar.
2. **Ruhe statt Dringlichkeit.** Keine Autoplays, keine Zähler, keine Countdown- oder Verkaufsrhetorik, keine Pop-ups. Die Zielgruppe ist potenziell in akuter Belastung.
3. **Die Broschüre spricht.** Überschriften als Fragen in der Sprache der Broschüre („Was kann die Polizei für Sie tun?“), Anrede „Sie“; Kinder und Jugendliche werden, wie in der Broschüre, mit „Ihr/Euch“ angesprochen.
4. **Farbe aus der Broschüre, Charakter aus Typografie und Illustration.** Die Identität muss auch mit der noch nicht gelieferten Palette tragen. Deshalb liegt das Unterscheidende in Typografie, Satzspiegel und den Broschüren-Illustrationen.
5. **Nichts verlässt den Server.** Jede Gestaltungsentscheidung, die eine externe Ressource bräuchte, ist ausgeschlossen.

### 2.2 Das eine prägende Element

Der **Einstieg „Sie sind hier, weil …“** auf der Startseite: ein großer Serifensatz, darunter die Gründe aus der Broschüre als direkte Wege in die Seite. Alles andere bleibt zurückhaltend.

```
Sie sind hier, weil …
  Sie in Ihrer Beziehung verletzt, bedroht oder kontrolliert werden   → Selbstcheck / Hilfe
  Sie von Ihrem Ex-Partner verfolgt werden                            → Kampagnen / Stalking
  Sie jemanden kennen, der Gewalt erlebt                              → Hilfe für Angehörige
  Sie helfen möchten oder sich informieren wollen                     → Infos / Arbeitskreis
```

Die Formulierungen sind ein Vorschlag auf Basis der Broschüre (S. 3) und benötigen die Textfreigabe des AG (Z-01). Die Pfeile stehen hier nur für die Verlinkung; im UI keine angehängten Pfeilzeichen.

### 2.3 Bewusst vermiedene Standardmuster

- Raster aus gleichförmigen, abgerundeten Karten mit identischem Schatten für jeden Inhalt
- Versal-Eyebrows über jeder Überschrift; Hervorhebung eines einzelnen Worts in der Headline
- Zahlen- und Statistikbänder, Testimonials-Karussells
- Fade-in-Animation pro Abschnitt, Hover-Animation auf jeder Karte
- Nummerierung (01/02/03) für Inhalte ohne Reihenfolge
- Bildklischees zu Gewalt (Faust, blaues Auge, zusammengekauerte Frau im Dunkeln)
- Orange als Kampagnenfarbe („Orange the World“) ohne Deckung durch die Broschüre

---

## 3. Farbe

### 3.1 Vorgehen bis zur Lieferung Z-06

Die Markenfarben sind **nicht festgelegt, solange die Druckdaten fehlen**. Die Werte unten sind Platzhalter für Staging und dürfen nicht in die Freigabe gehen.

1. Farbwerte aus den Druckdaten (PDF/X oder InDesign) auslesen, bevorzugt als Sonderfarben- oder CMYK-Angaben.
2. CMYK farbmanagt nach sRGB konvertieren (Quellprofil laut Druckdaten, sonst PSO Coated v3 bzw. ISO Coated v2; Rendering Intent relativ farbmetrisch). Keine naive CMYK-Formelumrechnung.
3. Ergebnis in Tabelle 3.3 dokumentieren (Quelle, CMYK, sRGB-Hex, Kontrastwerte).
4. Kontraste nach WCAG 2.2 prüfen. Erreicht eine Broschürenfarbe gegen Weiß oder Textfarbe nicht 4,5:1, wird sie **nur für Flächen, Illustrationen und Dekor** verwendet, nie für Fließtext oder Links. So bleibt die Farbwelt 1:1 erhalten, ohne die Lesbarkeit zu opfern.
5. Aufhellungen oder Abdunklungen (z. B. Hover, Hintergrundtöne) gelten als Abweichung und brauchen die Designfreigabe des AG.

### 3.2 Token-Struktur

Rollen statt Farbnamen. Markenrollen werden aus Z-06 befüllt, Funktionsrollen sind neutral und markenunabhängig.

```css
:root {
  /* Markenrollen: PLATZHALTER bis Z-06, nicht freigabefähig */
  --c-brand-primary:   #6B6B6B;
  --c-brand-secondary: #9A9A9A;
  --c-brand-accent:    #4A4A4A;
  --c-brand-surface:   #EFEFEF;

  /* Funktionsrollen */
  --c-ink:        #26232B;  /* Fließtext */
  --c-ink-muted:  #5B5663;  /* Metadaten, Hinweise, >= 4.5:1 auf --c-paper */
  --c-paper:      #FFFFFF;  /* Seitenhintergrund */
  --c-line:       #D8D5DD;  /* Trennlinien, Formularränder */
  --c-focus:      #1A5FB4;  /* Fokusring, >= 3:1 gegen angrenzende Farben */
  --c-error:      #B00020;
  --c-success:    #1B6E3A;

  /* Notausgang: stärkste Broschürenfarbe mit >= 4.5:1 zu weißer Schrift,
     sonst --c-ink. Endgültige Zuordnung mit Designfreigabe. */
  --c-exit-bg:    var(--c-ink);
  --c-exit-fg:    #FFFFFF;
}
```

### 3.3 Farbtabelle (nach Z-06 ausfüllen)

| Rolle | Quelle in der Broschüre | CMYK | sRGB | Kontrast zu Weiß | Einsatz |
|---|---|---|---|---|---|
| brand-primary | _offen_ | | | | |
| brand-secondary | _offen_ | | | | |
| brand-accent | _offen_ | | | | |
| brand-surface | _offen_ | | | | |

### 3.4 Dark Mode

Nicht vorgesehen. Die Farbwelt ist an die Druckvorlage gebunden; ein Dark Mode wäre eine Abweichung. `color-scheme: light` setzen.

---

## 4. Typografie

### 4.1 Schriften

Alle Schriften stehen unter SIL Open Font License, werden als WOFF2 lokal unter `assets/fonts/` gehostet und je Schriftsystem per `unicode-range` getrennt, sodass arabische oder kyrillische Dateien nur geladen werden, wenn entsprechende Zeichen vorkommen.

| Rolle | Latein, Kyrillisch (DE, EN, TR, RU) | Arabisch (AR) |
|---|---|---|
| Überschriften, Einstieg „Sie sind hier, weil …“ | **Literata** (variabel, optische Größen) | **Noto Naskh Arabic** 600 |
| Fließtext, UI, Formulare | **IBM Plex Sans** 400/600 | **IBM Plex Sans Arabic** 400/600 |

Begründung: Literata ist eine für Bildschirmlektüre entworfene Buchschrift mit Kyrillisch und trägt den Charakter einer gedruckten Broschüre. IBM Plex Sans und Plex Sans Arabic sind als Familie aufeinander abgestimmt und decken alle fünf Sprachen im UI ab. Vor Einbau prüfen: Glyphenabdeckung für Türkisch (ğ, ı, İ, ş) und Russisch in den subsetteten Dateien.

```css
@font-face {
  font-family: "Literata";
  src: url("../fonts/literata-var-latin.woff2") format("woff2");
  font-weight: 400 700;
  font-display: swap;
  unicode-range: U+0000-024F, U+1E00-1EFF, U+2000-206F, U+20AC;
}
/* analog: literata-var-cyrillic.woff2 mit U+0400-04FF, plex-sans-*, plex-sans-arabic-*, noto-naskh-arabic-* */

:root {
  --font-display: "Literata", "Noto Naskh Arabic", Georgia, serif;
  --font-text: "IBM Plex Sans", "IBM Plex Sans Arabic", system-ui, sans-serif;
}
```

Preload nur für die zwei Dateien, die auf der deutschen Startseite oberhalb des Falzes benötigt werden (Literata Latin, Plex Sans Latin 400).

### 4.2 Schriftgrößen

Fluide Skala, Verhältnis 1,25, Grundgröße 18 px. Keine Schriftgrößenknöpfe; Zoom bis 200 % ohne Verlust von Inhalten oder Funktionen.

| Token | Wert | Einsatz |
|---|---|---|
| `--fs-sm` | `0.889rem` | Metadaten, Bildunterschriften |
| `--fs-base` | `1.125rem` | Fließtext |
| `--fs-md` | `clamp(1.25rem, 1.1rem + 0.6vw, 1.406rem)` | Lead, h4 |
| `--fs-lg` | `clamp(1.4rem, 1.2rem + 1vw, 1.758rem)` | h3 |
| `--fs-xl` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.197rem)` | h2 |
| `--fs-2xl` | `clamp(2.1rem, 1.6rem + 2.6vw, 2.747rem)` | h1 |
| `--fs-hero` | `clamp(2.6rem, 1.8rem + 4vw, 4.2rem)` | „Sie sind hier, weil …“ |

### 4.3 Satzregeln

- Zeilenlänge Fließtext max. `68ch`, linksbündig (RTL: rechtsbündig), kein Blocksatz, `hyphens: auto` mit korrektem `lang`-Attribut.
- Zeilenabstand: Fließtext 1,6; Überschriften 1,15; Arabisch Fließtext 1,8.
- Arabisch: kein `letter-spacing`, keine Kursive, keine Versalien-Transformation; Grundgröße eine Stufe höher (`--fs-md` als Fließtextgröße).
- Keine Versalien für Labels oder Navigation. Hervorhebung über Schriftschnitt (600), nicht über Farbe allein.
- Deutsche Anführungszeichen „…“ und typografische Apostrophe; Telefonnummern mit schmalem geschütztem Leerzeichen (`&#8239;`) gruppieren und im `tel:`-Link ohne Leerzeichen schreiben.

---

## 5. Raster, Abstände, Formen

- **Abstandsskala (rem):** 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6. Als `--space-1` bis `--space-9`.
- **Container:** Inhalt `min(68ch, 100% - 2 × --space-5)`; breite Elemente (Slider, Veranstaltungsliste) `min(72rem, 100% - 2 × --space-5)`.
- **Breakpoints:** `40em` (Tablet), `64em` (Desktop). Mobile first.
- **Radien nach Hierarchie:** Controls (Buttons, Felder) `6px`; Flächen mit Inhalt `0`; Illustrationsflächen dürfen der Form der Broschüren-Illustration folgen. Kein einheitlicher Radius auf allem.
- **Schatten:** keine, außer am fixierten Notausgang auf Mobilgeräten (Abhebung vom Inhalt).
- **Linien** statt Karten zur Gliederung von Listen (Anlaufstellen, Termine, Dokumente).
- **Logische CSS-Eigenschaften** durchgehend (`margin-inline-start`, `padding-block`, `inset-inline-end`), damit RTL ohne Sonder-Stylesheet funktioniert. Richtungsabhängige Icons mit `:dir(rtl) { transform: scaleX(-1); }` spiegeln.

### 5.1 Wireframes Startseite

Mobil:

```
┌────────────────────────────────┐
│ [Logo AK]          [Sprache ▾] │
│ Hilfetelefon 116 016 (tel:)    │
├────────────────────────────────┤
│ Sie sind hier, weil …          │  ← --fs-hero, Literata
│ ─ Sie verletzt, bedroht …      │
│ ─ Sie verfolgt werden …        │
│ ─ Sie jemanden kennen …        │
│ ─ Sie helfen möchten …         │
├────────────────────────────────┤
│ Selbstcheck: kurzer Einstieg   │
├────────────────────────────────┤
│ Wichtigste Anlaufstellen (4)   │
│ Frauenhaus 24 h · Polizei 110  │
├────────────────────────────────┤
│ Wandausstellung (Slider F-10)  │
├────────────────────────────────┤
│ Aktuelles / Termine            │
├────────────────────────────────┤
│ Footer, Förderhinweis MKJFGFI  │
└────────────────────────────────┘
          [ Seite verlassen ]  ← fixiert unten, inline-end
```

Desktop: Kopfzeile zweizeilig (oben Hilfeleiste mit Sprachwahl, Hilfetelefon, Notausgang; darunter Logo und Hauptnavigation). Einstieg zweispaltig: links der Satz „Sie sind hier, weil …“ mit den Wegen, rechts eine Broschüren-Illustration. Alle weiteren Abschnitte einspaltig im Textcontainer.

---

## 6. Komponenten

### 6.1 Hilfeleiste (Kopf, alle Seiten)

- Reihenfolge im DOM: Skip-Link, Notausgang, Sprachwahl, Hilfetelefon, Logo, Navigation. Der Notausgang ist per Tastatur das erste interaktive Element nach dem Skip-Link.
- Sprachwahl als Liste mit Namen in Eigenschreibung: Deutsch, العربية, Русский, English, Türkçe. Jeder Link mit `lang` und `hreflang`. Keine Flaggen, keine Ländercodes als alleinige Beschriftung.
- Hilfetelefon als `tel:`-Link. Aktuelle Kurzwahl **116 016** (Broschüre 2016 nennt noch 08000 116 016); vor Livegang gegen hilfetelefon.de verifizieren und vom AG freigeben lassen.

### 6.2 Notausgang (F-01)

- Beschriftung: „Seite verlassen“ (Übersetzungen je Sprache). Kein reines Icon, kein Bild.
- Desktop: in der Hilfeleiste; Mobil: zusätzlich fixiert unten inline-end, Mindestgröße 48 × 48 px, nicht vom Cookie- oder sonstigem UI verdeckbar (es gibt keines).
- Tastenkürzel: zweimal `Esc` innerhalb von 1 s. Im Hinweistext auf der Seite F-09 erklären.
- `Referrer-Policy: no-referrer` serverseitig setzen, damit die Zielseite keine Herkunft sieht.

```js
// assets/js/exit.js (ohne Abhängigkeiten, defer)
const EXIT_URL = "https://www.google.com/search?q=wetter";
function leave() {
  document.body.hidden = true;           // Inhalt sofort ausblenden
  window.location.replace(EXIT_URL);     // aktuellen Verlaufseintrag ersetzen
}
document.querySelectorAll("[data-exit]").forEach(el =>
  el.addEventListener("click", e => { e.preventDefault(); leave(); })
);
let last = 0;
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  const now = Date.now();
  if (now - last < 1000) leave();
  last = now;
});
```

Das Element ist zusätzlich ein normaler Link (`<a href="https://www.google.com/search?q=wetter" data-exit rel="noreferrer">`), damit es ohne JavaScript funktioniert. Frühere Seiten der Website bleiben im Verlauf; das ist vertraglich akzeptiert und auf F-09 erklärt.

### 6.3 Selbstcheck (F-02)

- Umsetzung als statische Checkbox-Liste in einem `<form>` ohne `action`, Submit-Verhalten unterbunden, `autocomplete="off"`.
- Keine Speicherung: kein Web Storage, keine Cookies, keine Requests. Beim Zurücknavigieren (Back-Forward-Cache) Zustand zurücksetzen:

```js
window.addEventListener("pageshow", () => {
  document.querySelectorAll("#selbstcheck input[type=checkbox]")
    .forEach(cb => { cb.checked = false; });
});
```

- Keine Auswertung, kein Score, keine Ampel. Nach der Liste ein fester Text mit Verweis auf Anlaufstellen (Text vom AG, Z-02).
- Hinweis „Ihr Selbstcheck wird nicht gespeichert.“ direkt über der Liste, nicht erst am Ende.

### 6.4 Anlaufstelle (Hilfe & Kontaktstellen)

- Überschrift als Frage aus der Broschüre: „Was kann die Frauenberatungsstelle für Sie tun?“
- Feste Reihenfolge der Daten: Name, Träger, Telefon (`tel:`), Erreichbarkeit, Adresse, E-Mail, Website.
- Die vier wichtigsten Stellen offen, weitere in `<details>`-Gruppen. Natives `<details>/<summary>`, kein JS-Akkordeon.
- Frauenhäuser als Liste ohne Karte; die Adresse des Schutzhauses wird nicht veröffentlicht (Broschüre S. 10).
- Datenquelle: CPT oder Block-Pattern, gepflegt aus Z-03. Kein Hardcoding im Template.

### 6.5 Abläufe mit echter Reihenfolge

Nummerierte Schritte (`<ol>`) nur für tatsächliche Sequenzen, z. B. Anonyme Spurensicherung (keine Körperreinigung, Kleidung trocken in Papiertüte, Kontakt zur Untersuchungsstelle), Ablauf einer Beratung, Anleitungen auf F-09. Muster aus der „How it works“-Struktur der Referenz, aber ohne Bildkarten.

### 6.6 Wandausstellungs-Slider (F-10)

- Kein Autoplay. Vor/Zurück-Buttons mit Beschriftung, Positionsanzeige („Bild 2 von 8“), Wischgesten, Tastatursteuerung.
- Jedes Bild mit Alternativtext und sichtbarem Kurztext (Z-07).
- Umsetzung mit CSS `scroll-snap` und minimalem JS; keine Slider-Bibliothek von extern.

### 6.7 Veranstaltungen (F-06)

- Liste, Datum inline-start als eigene Spalte (Tag, Monat), daneben Titel, Uhrzeit, Ort. Vergangene Termine automatisch ausblenden.
- Kurs-Termine verlinken auf das Anmeldeportal (F-11).
- Datumsformat je Sprache über `wp_date()` bzw. `Intl.DateTimeFormat`.

### 6.8 Mediathek (F-07)

- Liste je Kategorie mit Titel, Dateityp, Dateigröße, Sprache des Dokuments, Stand. Download-Link mit `download`-Attribut nur bei PDFs.
- PDFs lokal in `wp-content/uploads`, keine externen Viewer.

### 6.9 Formulare (F-04, F-11)

- Sichtbare Labels über dem Feld, keine Platzhalter als Labels. Pflichtfelder textlich markieren („Pflichtfeld“), nicht nur mit Sternchen.
- F-04: E-Mail optional; Anliegen-Auswahl als Radiogruppe; Honeypot-Feld (visuell versteckt, `tabindex="-1"`, `autocomplete="off"`); Datenschutzhinweis direkt über dem Senden-Button; Bestätigungstext „Ihr Anliegen wird zeitnah durch uns bearbeitet und vertraulich behandelt.“
- F-04 technisch: Contact Form 7 ohne Flamingo erfüllt „keine Speicherung“, da CF7 Einsendungen nicht in der Datenbank ablegt. Vor Einsatz eines anderen Plugins prüfen, ob Einträge gespeichert werden, und dies deaktivieren.
- F-11: Anmeldedaten dürfen gespeichert werden (AVV-Datenkategorie), Löschfrist ist noch offen (PROJEKT.md § 13). Die Speicherung von F-11 darf nicht dazu führen, dass F-04 mitgespeichert wird; bei Plugin-Wahl getrennt prüfen.
- Fehlermeldungen am Feld, mit `aria-describedby` verknüpft, sagen, was zu tun ist („Bitte eine Telefonnummer oder E-Mail-Adresse angeben, wenn Sie eine Antwort wünschen.“).

### 6.10 Footer

Förderhinweis MKJFGFI mit Logo gemäß Fördervorgaben (Z-11), Impressum, Datenschutzerklärung, Link zu F-09, Kontakt. Keine Social-Embeds.

---

## 7. Bildsprache und Illustration

- Primär die Illustrationen der Broschüre. **Nutzungsrechte für Web klären** (© fien-design.de); Z-08 deckt nur Fotos ab.
- Fotos ausschließlich mit Bildrechten und Einwilligungen (Z-08). Keine Stockfotos mit Gewaltdarstellung.
- Formate: AVIF mit WebP-Fallback, `srcset`/`sizes`, `loading="lazy"` außer im Einstieg, explizite `width`/`height`.
- Dekorative Illustrationen `alt=""`; inhaltstragende Bilder mit beschreibendem Alternativtext in jeder Sprache.
- Icons als Inline-SVG im Theme, `aria-hidden="true"` wenn neben Text.

---

## 8. Bewegung

- Standard: keine Animation beim Laden, keine Scroll-Animationen.
- Zulässig: Rückmeldung auf Handlungen (Öffnen von `<details>`, Formular gesendet), max. 200 ms.
- `@media (prefers-reduced-motion: reduce)` setzt alle Übergänge auf 0.

---

## 9. Barrierefreiheit als Qualitätsuntergrenze

BITV-2.0-Konformität ist vertraglich nicht geschuldet. Als interne Untergrenze gilt trotzdem WCAG 2.2 AA für: Kontraste, Tastaturbedienbarkeit, sichtbarer Fokus (2 px Outline in `--c-focus`, Offset 2 px), Zielgrößen min. 24 × 24 px (Notausgang 48 × 48 px), Landmarks, Überschriftenhierarchie, `lang` je Seite und je fremdsprachigem Abschnitt, Zoom 200 %, Reflow bei 320 px Breite. Kein Accessibility-Overlay-Plugin. Viewport ohne `maximum-scale`.

Nicht als Erklärung zur Barrierefreiheit oder BITV-Konformität bewerben, solange keine Prüfung erfolgt ist.

---

## 10. WordPress-Architektur

### 10.1 Grundsatz

- **Eigenes Block-Theme** mit `theme.json` als Single Source of Truth für Farben, Schriften, Abstände. Kein Page-Builder (Elementor, Divi, WPBakery).
- Child-Theme nur, wenn ein Eltern-Theme ohne externe Ressourcen und ohne Page-Builder gewählt wird.
- Redakteur-Rolle darf Inhalte, Termine, Mediathek pflegen, aber keine Theme-, Plugin- oder Farbeinstellungen ändern. Farbpalette im Editor auf die Tokens begrenzen (`"custom": false`, `"customGradient": false`, `"defaultPalette": false`).

```json
{
  "version": 3,
  "settings": {
    "appearanceTools": false,
    "color": {
      "custom": false, "customGradient": false,
      "defaultPalette": false, "defaultGradients": false, "defaultDuotone": false,
      "palette": [
        { "slug": "ink", "name": "Text", "color": "#26232B" },
        { "slug": "paper", "name": "Hintergrund", "color": "#FFFFFF" },
        { "slug": "brand-primary", "name": "Broschüre 1 (Platzhalter)", "color": "#6B6B6B" }
      ]
    },
    "typography": {
      "customFontSize": false,
      "fontFamilies": [
        { "slug": "display", "name": "Literata", "fontFamily": "var(--font-display)" },
        { "slug": "text", "name": "IBM Plex Sans", "fontFamily": "var(--font-text)" }
      ]
    },
    "layout": { "contentSize": "68ch", "wideSize": "72rem" }
  }
}
```

### 10.2 Inhaltstypen

| Typ | Umsetzung | Hinweis |
|---|---|---|
| Anlaufstellen | CPT `anlaufstelle` + Taxonomie `anlaufstelle_gruppe` | Reihenfolge per Menüreihenfolge-Feld |
| Veranstaltungen | CPT `veranstaltung` mit Datum/Uhrzeit/Ort | Kein Kalender-Plugin mit externen Karten |
| Mediathek | CPT `dokument` + Taxonomie `dokument_kategorie` | Kategorien nach Strukturfreigabe |
| Aktuelles | Standard-Beiträge | Kommentare global deaktiviert |
| Selbstcheck | Block-Pattern je Sprache | Inhalte Z-02 |

CPTs in einem kleinen projekteigenen Plugin (`aawel-core`) registrieren, nicht im Theme, damit Inhalte einen Theme-Wechsel überstehen.

### 10.3 Mehrsprachigkeit

- Polylang (kostenlose Version genügt nach aktuellem Stand für Seiten, Beiträge, CPTs, Taxonomien, Menüs und RTL). Vor Einsatz prüfen, dass keine externen Dienste aktiviert sind.
- URL-Schema: Deutsch ohne Präfix, übrige Sprachen `/ar/`, `/ru/`, `/en/`, `/tr/`.
- `hreflang`-Alternates und `html[lang][dir]` werden von Polylang gesetzt; im Theme `dir` nicht hart codieren.
- Sprachumschalter selbst rendern (Polylang-Funktion `pll_the_languages( [ 'raw' => 1 ] )`), Flaggenanzeige aus.

### 10.4 WordPress-Kern entschlacken (externe Aufrufe verhindern)

In `aawel-core`:

- Emoji-Skripte und -Styles entfernen (laden sonst von `s.w.org`), DNS-Prefetch auf `s.w.org` entfernen.
- oEmbed-Discovery und Embed-Skript deaktivieren; keine fremden Embeds.
- Kommentare und Pingbacks global deaktivieren (vermeidet Gravatar-Aufrufe).
- XML-RPC deaktivieren, REST-API-Benutzerendpunkt für nicht angemeldete Nutzer sperren.
- Nach jeder Plugin-Installation im Browser-Netzwerk-Tab prüfen: 0 Requests an fremde Hosts.

### 10.5 Server und Header (Hetzner, Produktion)

```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; font-src 'self';
  style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none';
  form-action 'self'; base-uri 'self'
Referrer-Policy: no-referrer
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=31536000
```

`'unsafe-inline'` bei Styles nur, solange der Block-Editor Inline-Styles erzeugt. CSP zuerst als `Content-Security-Policy-Report-Only` auf Staging testen. Logrotation 14 Tage (AVV).

### 10.6 Umgebungen

- Staging: HTTP-Basic-Auth, `noindex` über `wp_robots`, eigene Datenbank, keine echten Formularempfänger (Zustellung an Testpostfach).
- Produktion: `noindex` entfernen (vertraglich gefordert), Empfänger laut Z-09.
- Keine Synchronisation von Produktionsdaten nach Staging, solange Kursanmeldungen enthalten sind.

---

## 11. Performance-Budget

| Kennzahl | Ziel (mobil, Startseite) |
|---|---|
| Übertragene Daten gesamt | < 500 KB (ohne Slider-Bilder außerhalb des Viewports) |
| JavaScript | < 30 KB (komprimiert), kein jQuery im Frontend |
| Schriftdateien initial | max. 2 Dateien, zusammen < 120 KB |
| LCP | < 2,5 s bei 4G-Drosselung |
| CLS | < 0,1 |
| Requests an fremde Hosts | 0 |

---

## 12. Repository-Konventionen

Das Repository `WebsiteWerker-2-0/Am-Anfang-War-Es-Liebe-Main` ist privat und war bei Erstellung dieser Datei nicht lesbar. Die folgende Struktur ist Vorgabe für neue Dateien; bestehende Strukturen im Repo haben Vorrang und sind hier nachzutragen.

```
/
├── CLAUDE.md                     # importiert PROJEKT.md und diese Datei
├── PROJEKT.md
├── DESIGN-UND-ENTWICKLUNG.md
├── wp-content/
│   ├── themes/aawel/             # Block-Theme
│   │   ├── theme.json
│   │   ├── style.css
│   │   ├── assets/{css,js,fonts,svg}/
│   │   ├── templates/  parts/  patterns/
│   │   └── languages/
│   └── plugins/aawel-core/       # CPTs, Entschlackung, Notausgang-Einbindung
└── .gitignore                    # wp-config.php, uploads/, *.sql, .env
```

- Nicht versionieren: WordPress-Core, Fremd-Plugins (Versionen in einer Liste dokumentieren), `uploads/`, Datenbank-Dumps.
- Branch-Modell, Deployment Staging → Produktion, Build-Schritte: _hier ergänzen, sobald Repo-Inhalt bekannt._

---

## 13. Arbeitsweise für Claude

1. Vor jeder Umsetzung Abschnitt 0 prüfen. Kollidiert eine Anforderung damit, Umsetzung stoppen und den Konflikt benennen.
2. Farben ausschließlich über Tokens bzw. `theme.json`-Slugs, nie als Hex im Template.
3. Neue UI-Texte in Deutsch schreiben und als übersetzbar kennzeichnen (`__()` / `esc_html__()` mit Textdomain `aawel`). Übersetzungen fachlich vom AG freigeben lassen.
4. Jede Komponente mit Tastatur, 200 % Zoom, 320 px Breite und `dir="rtl"` prüfen.
5. Vor Commit prüfen: keine externen URLs in CSS/JS/PHP außer dem Notausgang-Ziel und redaktionellen Links.
6. Inhalte (Telefonnummern, Zeiten, Adressen) nie aus der Broschüre 2016 ungeprüft übernehmen; sie sind vom AG zu liefern (Z-01, Z-03).
7. Unsichere Annahmen im Code mit `// OFFEN:` markieren und in Abschnitt 14 eintragen.

---

## 14. Offene Design- und Technikpunkte

- [ ] Farbwerte aus Druckdaten (Z-06) extrahieren, Tabelle 3.3 füllen, Kontraste prüfen, Designfreigabe einholen
- [ ] Web-Nutzungsrechte an den Broschüren-Illustrationen (fien-design.de) klären
- [ ] Farbe des Notausgangs festlegen (Broschürenfarbe oder neutral)
- [ ] Hilfetelefon-Nummer für alle Sprachfassungen verifizieren (116 016)
- [ ] Gendersprache festlegen (Broschüre nutzt Binnen-I; Vorgabe der Gleichstellungsstelle erfragen)
- [ ] Veraltete Broschüreninhalte markieren, z. B. „Arbeitslosengeld II“ (seit 2023 Bürgergeld), Öffnungszeiten, Nummern; Korrektur durch AG
- [ ] Plugin für F-11 (Anmeldeportal mit frei definierbaren Feldern) auswählen und auf Datenflüsse prüfen
- [ ] Leichte Sprache: nicht beauftragt; ggf. als Change Request anbieten
- [ ] Repo-Struktur, Branch-Modell, Deployment nachtragen (Abschnitt 12)
