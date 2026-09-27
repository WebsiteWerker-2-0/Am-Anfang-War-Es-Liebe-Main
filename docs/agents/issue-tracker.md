# Issue-Tracker: GitHub

Issues und Spezifikationen für dieses Repo liegen als GitHub-Issues in `WebsiteWerker-2-0/Am-Anfang-War-Es-Liebe-Main`. Alle Operationen laufen über die `gh`-CLI. Issues auf Deutsch schreiben.

## Befehle

- **Issue anlegen**: `gh issue create --title "..." --body "..."`, mehrzeilige Texte per Heredoc.
- **Issue lesen**: `gh issue view <nummer> --comments`
- **Issues auflisten**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`, bei Bedarf mit `--label` und `--state`.
- **Kommentieren**: `gh issue comment <nummer> --body "..."`
- **Labels setzen und entfernen**: `gh issue edit <nummer> --add-label "..."` bzw. `--remove-label "..."`
- **Schließen**: `gh issue close <nummer> --comment "..."`

`gh` erkennt das Repo aus `git remote -v`.

## Pull Requests als Anfragen

**PRs als Anfragekanal: nein.** Wir arbeiten zu zweit direkt auf `main`.

## Wenn ein Skill sagt „im Issue-Tracker veröffentlichen“

Ein GitHub-Issue anlegen.

## Wenn ein Skill sagt „das zugehörige Ticket holen“

`gh issue view <nummer> --comments` ausführen.

## Abhängigkeiten zwischen Tickets

Für `/to-tickets`: Blockierende Tickets über die nativen Issue-Abhängigkeiten von GitHub verknüpfen: `gh api --method POST repos/WebsiteWerker-2-0/Am-Anfang-War-Es-Liebe-Main/issues/<kind>/dependencies/blocked_by -F issue_id=<datenbank-id-des-blockers>`. Die Datenbank-ID liefert `gh api repos/WebsiteWerker-2-0/Am-Anfang-War-Es-Liebe-Main/issues/<n> --jq .id` (nicht die `#nummer`). Falls das nicht verfügbar ist: eine Zeile `Blockiert durch: #<n>` oben in den Issue-Text.
