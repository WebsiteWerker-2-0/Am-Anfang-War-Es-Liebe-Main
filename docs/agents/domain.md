# Domain-Doku

Wie die Skills die Fachdoku dieses Repos lesen.

## Vor dem Erkunden lesen

- **`CONTEXT.md`** im Repo-Root: das Glossar der Fachbegriffe (Single-Context-Repo).
- **`docs/adr/`**: ADRs, die den Bereich betreffen, in dem gearbeitet wird.
- **`knowledgebase/design/`**: festgelegte Gestaltungsentscheidungen (Farben, Typografie, Komponenten) und das Entscheidungslog. Verbindliche Gesamtvorgabe ist `knowledgebase/design/DESIGN-UND-ENTWICKLUNG.md`.

Fehlt eine dieser Dateien, einfach weitermachen. `/domain-modeling` legt sie an, sobald ein Begriff oder eine Entscheidung geklärt ist.

## Wohin was gehört

| Art | Ort |
|---|---|
| Fachbegriff (was etwas ist) | `CONTEXT.md` |
| Architektur-Entscheidung, schwer umkehrbar | `docs/adr/NNNN-titel.md` |
| Gestaltungsentscheidung | `knowledgebase/design/<thema>.md` plus Eintrag in `entscheidungen.md` |

## Vokabular des Glossars verwenden

Wer einen Fachbegriff nennt (Issue-Titel, Refactoring-Vorschlag, Hypothese, Testname, Bezeichner im Code), nimmt den Begriff aus `CONTEXT.md`. Im Code gilt die englische Entsprechung aus dem Glossar. Synonyme, die das Glossar unter _Vermeiden_ führt, nicht verwenden.

Fehlt ein Begriff im Glossar, ist das ein Signal: Entweder wird Sprache erfunden, die das Projekt nicht nutzt, oder es gibt eine echte Lücke, die für `/domain-modeling` notiert wird.

## ADR-Konflikte benennen

Widerspricht ein Ergebnis einem ADR, das ausdrücklich sagen statt es stillschweigend zu übergehen:

> _Widerspricht ADR-0002 (keine externen Ressourcen), sollte aber neu besprochen werden, weil …_
