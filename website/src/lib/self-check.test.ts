// Tests für Ablauf und Bewertung des Selbstchecks: npm test
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { ADULT_AREAS, ALWAYS_HELP, AREAS, EMERGENCY_HELP, type AreaId, type Subject } from "@/content/self-check-tree";
import {
  answerDanger,
  answerStatement,
  assess,
  chooseArea,
  chooseSubject,
  continueAfterDanger,
  remainingAreas,
  showResult,
  start,
  type Answer,
  type State,
} from "./self-check";

// Alle Folgezustände, die die Oberfläche anbietet
function choices(state: State): State[] {
  switch (state.step.kind) {
    case "danger":
      return (["yes", "no", "unsure"] as Answer[]).map((answer) => answerDanger(state, answer));
    case "dangerHelp":
      return [continueAfterDanger(state)];
    case "subject":
      return (["self", "other", "child"] as Subject[]).map((subject) => chooseSubject(state, subject));
    case "area":
      return [...remainingAreas(state), "all" as const].map((choice) => chooseArea(state, choice));
    case "statement":
      return (["yes", "no", "unsure", "skip"] as Answer[]).map((answer) => answerStatement(state, answer));
    case "more":
      return [showResult(state), ...remainingAreas(state).map((id) => chooseArea(state, id))];
    case "result":
      return [];
  }
}

// Wege ohne die Antworten auf Aussagen: Antworten ändern den Weg nicht, nur das Ergebnis
const pathKey = (state: State) =>
  JSON.stringify([state.step, state.subject, state.queue, state.done, state.danger]);

test("jeder Weg durch den Baum endet an einem Ergebnis", () => {
  const seen = new Set<string>();
  const stack: { state: State; depth: number }[] = [{ state: start(), depth: 0 }];
  let results = 0;
  while (stack.length > 0) {
    const { state, depth } = stack.pop()!;
    assert.ok(depth < 200, `Weg zu lang, vermutlich eine Schleife: ${pathKey(state)}`);
    const next = choices(state);
    if (state.step.kind === "result") {
      results++;
      continue;
    }
    assert.ok(next.length > 0, `Sackgasse ohne Ergebnis: ${pathKey(state)}`);
    // Aussagen nur mit „Überspringen“ verfolgen, sonst wächst der Baum exponentiell
    const followed = state.step.kind === "statement" ? [next[3]] : next;
    for (const child of followed) {
      const key = pathKey(child);
      if (seen.has(key)) continue;
      seen.add(key);
      stack.push({ state: child, depth: depth + 1 });
    }
  }
  assert.ok(results > 0);
});

function walk(subject: Subject, areas: AreaId[] | "all", answer: (id: string) => Answer = () => "no", danger: Answer = "no") {
  let state = answerDanger(start(), danger);
  if (state.step.kind === "dangerHelp") state = continueAfterDanger(state);
  state = chooseSubject(state, subject);
  if (subject !== "child") state = chooseArea(state, areas === "all" ? "all" : areas[0]);
  const rest = areas === "all" ? [] : areas.slice(1);
  while (state.step.kind !== "result") {
    if (state.step.kind === "statement") {
      const statement = AREAS.find((area) => area.id === (state.step as { area: AreaId }).area)!.statements[state.step.index];
      state = answerStatement(state, answer(statement.id));
    } else if (state.step.kind === "more") {
      const next = rest.shift();
      state = next ? chooseArea(state, next) : showResult(state);
    } else {
      throw new Error(`Unerwarteter Schritt ${state.step.kind}`);
    }
  }
  return state;
}

const only = (...ids: string[]) => (id: string) => (ids.includes(id) ? "yes" : "no") as Answer;

test("„alle Bereiche“ fragt jede Aussage für Erwachsene genau einmal", () => {
  const state = walk("self", "all");
  const expected = AREAS.filter((area) => ADULT_AREAS.includes(area.id)).flatMap((area) => area.statements.map((s) => s.id));
  assert.deepEqual(Object.keys(state.answers).sort(), expected.sort());
  assert.deepEqual([...state.done].sort(), [...ADULT_AREAS].sort());
});

test("Kinder: nur der Bereich Kinder, keine Bereichswahl", () => {
  const state = walk("child", ["child"]);
  assert.deepEqual(state.done, ["child"]);
});

test("Grün, wenn nichts zutrifft", () => {
  assert.equal(assess(walk("self", "all")).level, "green");
});

test("Gelb ab Summe 2, Rot ab Summe 6", () => {
  assert.equal(assess(walk("self", ["control"], only("blame"))).level, "green");
  assert.equal(assess(walk("self", ["control"], only("blame", "insult"))).level, "yellow");
  assert.equal(assess(walk("self", ["physical"], only("hit"))).level, "yellow");
  // isolate 2 + confine 2 + monitor 2 = 6
  assert.equal(assess(walk("self", ["control"], only("isolate", "confine", "monitor"))).level, "red");
});

test("ein Warnzeichen mit „Ja“ führt immer zu Rot", () => {
  for (const id of ["threat", "strangle", "weapon", "escalation", "pregnancy"]) {
    const result = assess(walk("self", ["physical"], only(id)));
    assert.equal(result.level, "red", id);
    assert.deepEqual(result.warnings.map((s) => s.id), [id]);
  }
  assert.equal(assess(walk("other", ["sexual"], only("rape"))).level, "red");
  assert.equal(assess(walk("child", ["child"], only("beaten"))).level, "red");
});

test("„Weiß nicht“ bei einem Warnzeichen führt mindestens zu Gelb", () => {
  const state = walk("self", ["physical"], (id) => (id === "strangle" ? "unsure" : "no"));
  assert.equal(assess(state).level, "yellow");
});

test("Gefahr jetzt: Rot, Unsicherheit: mindestens Gelb", () => {
  assert.equal(assess(walk("self", ["control"], () => "no", "yes")).level, "red");
  const unsure = assess(walk("self", ["control"], () => "no", "unsure"));
  assert.equal(unsure.level, "yellow");
  assert.equal(unsure.uncertainOnly, true);
  assert.equal(assess(walk("self", ["control"], only("blame", "insult"))).uncertainOnly, false);
});

test("Überspringen und Nein zählen nicht", () => {
  assert.equal(assess(walk("self", "all", () => "skip")).level, "green");
});

test("Hilfe: Notruf zuerst bei Rot, Hilfe zum Bereich, keine Doppelungen", () => {
  const red = assess(walk("self", ["sexual"], only("rape")));
  assert.equal(red.help[0], EMERGENCY_HELP);
  assert.ok(red.help.some((link) => link.href === "/hilfe#spurensicherung"));
  assert.equal(new Set(red.help.map((link) => link.href)).size, red.help.length);

  const green = assess(walk("other", "all"));
  assert.ok(!green.help.includes(EMERGENCY_HELP));
  for (const link of ALWAYS_HELP.other) assert.ok(green.help.includes(link));
});

test("jede Aussage hat eine eindeutige ID und für Erwachsene einen Text für Dritte", () => {
  const ids = AREAS.flatMap((area) => area.statements.map((s) => s.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const area of AREAS.filter((a) => a.id !== "child")) {
    for (const statement of area.statements) assert.ok(statement.other, statement.id);
  }
});

test("jeder Hilfe-Link zeigt auf einen vorhandenen Anker", () => {
  const sources = ["../content/pages/help.ts", "../content/support-services.ts"]
    .map((file) => readFileSync(new URL(file, import.meta.url), "utf8"))
    .join("\n");
  const links = [...AREAS.flatMap((a) => a.help), ...Object.values(ALWAYS_HELP).flat(), EMERGENCY_HELP];
  for (const { href } of links) {
    const [path, anchor] = href.split("#");
    if (!anchor) continue;
    assert.equal(path, "/hilfe", href);
    assert.match(sources, new RegExp(`(id|anchor|sectionId): "${anchor}"`), href);
  }
});
