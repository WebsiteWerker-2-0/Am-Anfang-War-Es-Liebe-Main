#!/usr/bin/env bash
# Holt die ausgewählten Skills aus github.com/mattpocock/skills nach .claude/skills/.
# Aufruf: scripts/update-skills.sh [git-ref]   (Standard: main)
# Danach Diff prüfen, .claude/skills/README.md (Stand) anpassen und committen.
set -euo pipefail

REF="${1:-main}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/.claude/skills"

# Auswahl für dieses Projekt. Bei Änderungen auch .claude/skills/README.md
# und den Abschnitt „Agent skills“ in CLAUDE.md anpassen.
SKILLS=(
  productivity/grilling
  productivity/grill-me
  productivity/handoff
  productivity/wait-what
  productivity/to-questionnaire
  productivity/writing-for-agents
  engineering/grill-with-docs
  engineering/domain-modeling
  engineering/setup-matt-pocock-skills
  engineering/tdd
  engineering/diagnosing-bugs
  engineering/code-review
  engineering/codebase-design
  engineering/improve-codebase-architecture
  engineering/to-spec
  engineering/to-tickets
  engineering/implement
  engineering/prototype
  engineering/resolving-merge-conflicts
)

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git clone --quiet https://github.com/mattpocock/skills.git "$TMP/skills"
git -C "$TMP/skills" checkout --quiet "$REF"
SHA="$(git -C "$TMP/skills" rev-parse HEAD)"

for path in "${SKILLS[@]}"; do
  name="$(basename "$path")"
  rm -rf "$DEST/$name"
  mkdir -p "$DEST/$name"
  cp -R "$TMP/skills/skills/$path/." "$DEST/$name/"
  # agents/openai.yaml ist nur für Codex relevant
  rm -rf "$DEST/$name/agents"
done
cp "$TMP/skills/LICENSE" "$DEST/LICENSE"

echo "Skills aktualisiert auf mattpocock/skills@$SHA"
