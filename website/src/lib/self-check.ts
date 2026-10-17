// Ablauf und Bewertung des interaktiven Selbstchecks als reine Funktionen, ohne React.
// Der Zustand lebt nur im Arbeitsspeicher der Seite (ADR-0003): keine Anfrage, kein Storage,
// keine Adressänderung. Jeder Schritt erzeugt einen neuen Zustand, „Zurück“ nimmt den vorigen.

import {
  ADULT_AREAS,
  ALWAYS_HELP,
  AREAS,
  EMERGENCY_HELP,
  THRESHOLDS,
  type Area,
  type AreaId,
  type HelpLink,
  type Level,
  type Statement,
  type Subject,
} from "@/content/self-check-tree";

export type Answer = "yes" | "no" | "unsure" | "skip";

export type Step =
  | { kind: "danger" }
  | { kind: "dangerHelp" }
  | { kind: "subject" }
  | { kind: "area" }
  | { kind: "statement"; area: AreaId; index: number }
  | { kind: "more" }
  | { kind: "result" };

export type State = {
  step: Step;
  danger?: Answer;
  subject?: Subject;
  /** Bereiche, die noch abgefragt werden (bei „alle nacheinander“ mehrere) */
  queue: AreaId[];
  /** abgeschlossene Bereiche in Reihenfolge */
  done: AreaId[];
  answers: Partial<Record<string, Answer>>;
  /** Zahl der beantworteten Fragen, für die Anzeige „Frage n“ */
  asked: number;
};

const areaById = new Map(AREAS.map((area) => [area.id, area]));

export function getArea(id: AreaId): Area {
  const area = areaById.get(id);
  if (!area) throw new Error(`Unbekannter Bereich: ${id}`);
  return area;
}

export function start(): State {
  return { step: { kind: "danger" }, queue: [], done: [], answers: {}, asked: 0 };
}

export function answerDanger(state: State, answer: Answer): State {
  return {
    ...state,
    danger: answer,
    asked: state.asked + 1,
    step: answer === "yes" ? { kind: "dangerHelp" } : { kind: "subject" },
  };
}

export function continueAfterDanger(state: State): State {
  return { ...state, step: { kind: "subject" } };
}

export function chooseSubject(state: State, subject: Subject): State {
  const next = { ...state, subject, asked: state.asked + 1, queue: [], done: [] };
  // Für Kinder gibt es nur einen Bereich, die Auswahl entfällt
  if (subject === "child") return beginQueue(next, ["child"]);
  return { ...next, step: { kind: "area" } };
}

/** Bereich wählen oder `"all"` für alle noch offenen nacheinander */
export function chooseArea(state: State, choice: AreaId | "all"): State {
  const queue = choice === "all" ? remainingAreas(state) : [choice];
  return beginQueue({ ...state, asked: state.asked + 1 }, queue);
}

export function answerStatement(state: State, answer: Answer): State {
  const { step } = state;
  if (step.kind !== "statement") return state;
  const area = getArea(step.area);
  const statement = area.statements[step.index];
  const answers = { ...state.answers, [statement.id]: answer };
  const advanced = { ...state, answers, asked: state.asked + 1 };

  if (step.index + 1 < area.statements.length) {
    return { ...advanced, step: { kind: "statement", area: area.id, index: step.index + 1 } };
  }
  const done = [...state.done, area.id];
  const queue = state.queue.slice(1);
  if (queue.length > 0) return beginQueue({ ...advanced, done }, queue);
  // Nach dem letzten Bereich: weitere anbieten, solange es welche gibt
  const finished = { ...advanced, done, queue };
  return remainingAreas(finished).length > 0
    ? { ...finished, step: { kind: "more" } }
    : { ...finished, step: { kind: "result" } };
}

export function showResult(state: State): State {
  return { ...state, step: { kind: "result" } };
}

export function remainingAreas(state: State): AreaId[] {
  if (state.subject === "child") return [];
  return ADULT_AREAS.filter((id) => !state.done.includes(id));
}

function beginQueue(state: State, queue: AreaId[]): State {
  return { ...state, queue, step: { kind: "statement", area: queue[0], index: 0 } };
}

/** Text einer Aussage für die gewählte Person */
export function statementText(statement: Statement, subject: Subject): string {
  return subject === "other" ? (statement.other ?? statement.self) : statement.self;
}

export type Assessment = {
  level: Level;
  score: number;
  /** Warnzeichen mit „Ja“ */
  warnings: Statement[];
  /** Hilfe passend zu den Antworten, ohne Doppelungen, Notruf zuerst bei Rot */
  help: HelpLink[];
  /** Gelb nur wegen „Weiß nicht“, ohne zutreffende Aussagen: eigener Text (UNCERTAIN_TEXT) */
  uncertainOnly: boolean;
};

const LEVEL_ORDER: Level[] = ["green", "yellow", "red"];
const atLeast = (level: Level, min: Level) =>
  LEVEL_ORDER[Math.max(LEVEL_ORDER.indexOf(level), LEVEL_ORDER.indexOf(min))];

/**
 * Ampel aus den Antworten. Rot: Gefahr jetzt, ein Warnzeichen mit „Ja“ oder Summe ab THRESHOLDS.red.
 * Gelb: Summe ab THRESHOLDS.yellow, Warnzeichen mit „Weiß nicht“ oder Unsicherheit bei der Gefahrenfrage.
 * Grün ist keine Entwarnung, der Text dazu sagt das (LEVELS.green).
 */
export function assess(state: State): Assessment {
  const subject = state.subject ?? "self";
  const asked = state.done.map(getArea);
  let score = 0;
  const warnings: Statement[] = [];
  let unsureWarning = false;

  for (const area of asked) {
    for (const statement of area.statements) {
      const answer = state.answers[statement.id];
      if (answer === "yes") {
        score += statement.weight;
        if (statement.warning) warnings.push(statement);
      } else if (answer === "unsure" && statement.warning) {
        unsureWarning = true;
      }
    }
  }

  let level: Level = score >= THRESHOLDS.red ? "red" : score >= THRESHOLDS.yellow ? "yellow" : "green";
  if (unsureWarning || state.danger === "unsure") level = atLeast(level, "yellow");
  if (warnings.length > 0 || state.danger === "yes") level = "red";

  // Hilfe aus den Bereichen, in denen etwas zutraf oder unsicher war
  const concerned = asked.filter((area) =>
    area.statements.some((statement) => {
      const answer = state.answers[statement.id];
      return answer === "yes" || answer === "unsure";
    }),
  );
  const help = [
    ...(level === "red" ? [EMERGENCY_HELP] : []),
    ...concerned.flatMap((area) => area.help),
    ...ALWAYS_HELP[subject],
  ].filter((link, index, all) => all.findIndex((other) => other.href === link.href) === index);

  return { level, score, warnings, help, uncertainOnly: level === "yellow" && score < THRESHOLDS.yellow };
}
