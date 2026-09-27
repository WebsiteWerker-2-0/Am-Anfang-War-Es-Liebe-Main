# Skills

Projekt-Skills für Claude Code. Claude Code findet sie automatisch, sobald eine Sitzung in diesem Repo startet. Aufruf per `/name` oder, bei modell-aufgerufenen Skills, automatisch, wenn die Aufgabe passt.

Quelle: [mattpocock/skills](https://github.com/mattpocock/skills), Stand `c55ee46` (18.09.2026), MIT-Lizenz (siehe [LICENSE](LICENSE)). Die Dateien sind unverändert übernommen, nur die Codex-Konfiguration (`agents/openai.yaml`) fehlt. Aktualisieren mit `scripts/update-skills.sh`.

## Nur auf Aufruf (`/name`)

| Skill | Wofür |
|---|---|
| [grill-with-docs](grill-with-docs/SKILL.md) | Vor jeder größeren Änderung: Claude fragt den Plan gründlich ab und pflegt dabei `CONTEXT.md` und ADRs |
| [grill-me](grill-me/SKILL.md) | Dasselbe ohne Doku, für Fragen außerhalb des Codes (Inhalte, Absprachen mit dem AG) |
| [to-spec](to-spec/SKILL.md) | Das Besprochene als Spezifikation in ein GitHub-Issue schreiben |
| [to-tickets](to-tickets/SKILL.md) | Einen Plan in kleine, abhängige GitHub-Issues zerlegen |
| [implement](implement/SKILL.md) | Eine Spezifikation oder Tickets umsetzen, mit `tdd` und abschließendem `code-review` |
| [improve-codebase-architecture](improve-codebase-architecture/SKILL.md) | Alle paar Tage: Code nach Stellen durchsuchen, die sich vertiefen lassen |
| [to-questionnaire](to-questionnaire/SKILL.md) | Offene Fragen an den AG als Fragebogen aufbereiten (Z-Lieferungen, Freigaben) |
| [handoff](handoff/SKILL.md) | Am Ende einer Sitzung: Stand für die nächste Sitzung oder den Kollegen zusammenfassen |
| [wait-what](wait-what/SKILL.md) | Wenn eine Antwort von Claude unverständlich war |
| [setup-matt-pocock-skills](setup-matt-pocock-skills/SKILL.md) | Einmalig erledigt (27.09.2026), nur erneut ausführen, um das Issue-Tracking umzustellen |

## Auch automatisch

| Skill | Wofür |
|---|---|
| [grilling](grilling/SKILL.md) | Das Befragungsmuster hinter `grill-me` und `grill-with-docs` |
| [domain-modeling](domain-modeling/SKILL.md) | Fachbegriffe schärfen, `CONTEXT.md` und ADRs schreiben |
| [tdd](tdd/SKILL.md) | Test zuerst (rot, dann grün), nur an vorher vereinbarten Schnittstellen |
| [diagnosing-bugs](diagnosing-bugs/SKILL.md) | Fehler systematisch eingrenzen: reproduzieren, minimieren, Hypothese, Fix, Regressionstest |
| [code-review](code-review/SKILL.md) | Änderungen gegen Standards (`DESIGN-UND-ENTWICKLUNG.md`) und Spezifikation prüfen |
| [codebase-design](codebase-design/SKILL.md) | Vokabular für tiefe Module und saubere Schnittstellen |
| [prototype](prototype/SKILL.md) | Wegwerf-Prototyp, um eine Gestaltungs- oder Logikfrage zu klären |
| [resolving-merge-conflicts](resolving-merge-conflicts/SKILL.md) | Merge-Konflikte sauber auflösen, wenn wir beide an `main` gearbeitet haben |
| [writing-for-agents](writing-for-agents/SKILL.md) | Beim Bearbeiten von `CLAUDE.md` oder Skills |

## Bewusst nicht übernommen

`ask-matt` (Router über alle Skills des Originals, passt nicht zur Auswahl), `triage` und `wayfinder` (Issue-Workflows für größere Teams), `teach`, `wizard`, `research`.

Der HTML-Report von `improve-codebase-architecture` lädt Tailwind und Mermaid von einem CDN. Er ist ein lokales Arbeitsdokument und gehört nie nach `website/`.
