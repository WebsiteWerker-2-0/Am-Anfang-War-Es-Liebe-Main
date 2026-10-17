"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ADULT_AREAS, AREAS, LEGENDS, LEVELS, TEXTS, UNCERTAIN_TEXT, type Level } from "@/content/self-check-tree";
import {
  answerDanger,
  answerStatement,
  assess,
  chooseArea,
  chooseSubject,
  continueAfterDanger,
  getArea,
  remainingAreas,
  showResult,
  start,
  statementText,
  type Answer,
  type State,
} from "@/lib/self-check";
import { PhoneLink } from "./PhoneLink";
import { SelfCheckForm } from "./SelfCheckForm";

// Selbstcheck als Entscheidungsbaum mit Ampel (DESIGN-UND-ENTWICKLUNG.md 6.3). Ohne JavaScript
// bleibt die Checkliste aus dem CMS stehen, mit JavaScript ersetzt der Baum sie.
const noSubscription = () => () => {};

export function SelfCheck({ legend, statements }: { legend: string; statements: string[] }) {
  const enhanced = useSyncExternalStore(noSubscription, () => true, () => false);
  return enhanced ? <SelfCheckTree /> : <SelfCheckForm legend={legend} statements={statements} />;
}

const adultStatementCount = AREAS.filter((area) => ADULT_AREAS.includes(area.id)).reduce(
  (sum, area) => sum + area.statements.length,
  0,
);

function SelfCheckTree() {
  // Verlauf nur im Arbeitsspeicher: „Zurück“ nimmt den vorigen Zustand, die Adresse bleibt gleich.
  // `moved` merkt sich, ob die Besucherin schon geklickt hat: erst dann wandert der Fokus mit.
  const [{ history, moved }, setView] = useState({ history: [start()], moved: false });
  const state = history[history.length - 1];
  const headingId = useId();
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (moved) heading.current?.focus();
  }, [history, moved]);

  // Zurück aus dem Back-Forward-Cache: Antworten verwerfen (ADR-0003)
  useEffect(() => {
    function reset(event: PageTransitionEvent) {
      if (event.persisted) setView({ history: [start()], moved: false });
    }
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  function go(next: State) {
    setView((view) => ({ history: [...view.history, next], moved: true }));
  }
  function back() {
    setView((view) => ({ history: view.history.length > 1 ? view.history.slice(0, -1) : view.history, moved: true }));
  }
  function restart() {
    setView({ history: [start()], moved: true });
  }

  const { step } = state;
  const subject = state.subject ?? "self";

  let title: React.ReactNode;
  let body: React.ReactNode;
  // Über der Überschrift: Fortschritt im Bereich. Neben der Überschrift: die Ampel beim Ergebnis.
  let before: React.ReactNode = null;
  let aside: React.ReactNode = null;

  switch (step.kind) {
    case "danger":
      title = TEXTS.dangerQuestion;
      body = (
        <Answers
          options={[
            ["yes", TEXTS.answers.yes],
            ["no", TEXTS.answers.no],
            ["unsure", TEXTS.answers.unsure],
          ]}
          onAnswer={(answer) => go(answerDanger(state, answer))}
        />
      );
      break;

    case "dangerHelp":
      title = TEXTS.dangerHelp.heading;
      body = (
        <>
          <div className="emergency">
            <p>{TEXTS.dangerHelp.police}</p>
            <PhoneLink number="110" className="emergency__number" />
          </div>
          <p>
            {TEXTS.dangerHelp.helpline} <PhoneLink number="116 016" />
          </p>
          <p className="small">{TEXTS.dangerHelp.exit}</p>
          <p>
            <button type="button" className="button button--secondary" onClick={() => go(continueAfterDanger(state))}>
              {TEXTS.dangerHelp.continue}
            </button>
          </p>
        </>
      );
      break;

    case "subject":
      title = TEXTS.subjectQuestion;
      body = (
        <Choices
          options={(["self", "other", "child"] as const).map((value) => ({
            label: TEXTS.subjects[value],
            onChoose: () => go(chooseSubject(state, value)),
          }))}
        />
      );
      break;

    case "area":
    case "more": {
      const open = remainingAreas(state);
      title = step.kind === "area" ? TEXTS.areaQuestion : TEXTS.moreQuestion;
      const areaOptions = open.map((id) => {
        const area = getArea(id);
        return { label: area.label, description: area.description, onChoose: () => go(chooseArea(state, id)) };
      });
      body = (
        <Choices
          options={
            step.kind === "area"
              ? [
                  {
                    label: TEXTS.allAreas,
                    description: TEXTS.allAreasDescription(adultStatementCount),
                    onChoose: () => go(chooseArea(state, "all")),
                  },
                  ...areaOptions,
                ]
              : [{ label: TEXTS.toResult, onChoose: () => go(showResult(state)) }, ...areaOptions]
          }
        />
      );
      break;
    }

    case "statement": {
      const area = getArea(step.area);
      const statement = area.statements[step.index];
      before = (
        <p className="self-check-tree__progress">
          {area.label}
          <span className="self-check-tree__dots" aria-hidden="true">
            {area.statements.map((item, index) => (
              <span key={item.id} data-state={index < step.index ? "done" : index === step.index ? "current" : undefined} />
            ))}
          </span>
          <span className="visually-hidden">, {TEXTS.progress(step.index + 1, area.statements.length)}</span>
        </p>
      );
      title = (
        <>
          <span className="self-check-tree__legend">{LEGENDS[subject]}</span>
          {statementText(statement, subject)}
        </>
      );
      body = (
        <>
          <Answers
            options={[
              ["yes", TEXTS.answers.yes],
              ["no", TEXTS.answers.no],
              ["unsure", TEXTS.answers.unsure],
            ]}
            skip
            onAnswer={(answer) => go(answerStatement(state, answer))}
          />
        </>
      );
      break;
    }

    case "result": {
      const result = assess(state);
      const level = LEVELS[result.level];
      aside = <TrafficLight level={result.level} />;
      title = (
        <>
          <span className="visually-hidden">{TEXTS.resultPrefix}</span>
          {level.label}
        </>
      );
      body = (
        <>
          <p className="lead">{result.uncertainOnly ? UNCERTAIN_TEXT[subject] : level.text[subject]}</p>
          {result.warnings.length > 0 && (
            <div className="stack">
              <p>{TEXTS.warningsIntro}</p>
              <ul className="self-check-result__warnings">
                {result.warnings.map((statement) => (
                  <li key={statement.id}>… {statementText(statement, subject)}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="stack">
            <h3>{TEXTS.helpHeading}</h3>
            <ul className="service-list">
              {result.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="service-list__name">
                    {link.label}
                  </Link>
                  {link.phone && <PhoneLink number={link.phone} className="service-list__number" />}
                </li>
              ))}
            </ul>
          </div>
          <p className="small">{TEXTS.disclaimer}</p>
        </>
      );
      break;
    }
  }

  return (
    <section className="self-check-tree" aria-labelledby={headingId}>
      {before}
      <div className={aside ? "self-check-tree__head self-check-tree__head--result" : "self-check-tree__head"}>
        {aside}
        <h2 id={headingId} ref={heading} tabIndex={-1} className="self-check-tree__question">
          {title}
        </h2>
      </div>
      {body}
      {history.length > 1 && (
        <div className="self-check-tree__nav">
          <button type="button" className="link-button" onClick={back}>
            {TEXTS.back}
          </button>
          <button type="button" className="link-button" onClick={restart}>
            {TEXTS.restart}
          </button>
        </div>
      )}
    </section>
  );
}

function Answers({
  options,
  skip = false,
  onAnswer,
}: {
  options: [Answer, string][];
  skip?: boolean;
  onAnswer: (answer: Answer) => void;
}) {
  return (
    <div className="self-check-tree__answers">
      {options.map(([value, label]) => (
        <button key={value} type="button" className="button button--secondary" onClick={() => onAnswer(value)}>
          {label}
        </button>
      ))}
      {skip && (
        <button type="button" className="link-button" onClick={() => onAnswer("skip")}>
          {TEXTS.answers.skip}
        </button>
      )}
    </div>
  );
}

function Choices({ options }: { options: { label: string; description?: string; onChoose: () => void }[] }) {
  return (
    <ul className="self-check-tree__choices">
      {options.map((option) => (
        <li key={option.label}>
          <button type="button" className="choice" onClick={option.onChoose}>
            <span className="choice__label">{option.label}</span>
            {option.description && <span className="choice__description">{option.description}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Ampel mit drei Lichtern, von oben Rot, Gelb, Grün. Die Stufe steht daneben als Überschrift,
// die Grafik ist nur Bild (WCAG 1.4.1). Weißes Gehäuse, weil die Ampelfarben auf Cyan zu wenig Kontrast haben.
function TrafficLight({ level }: { level: Level }) {
  const lights: Level[] = ["red", "yellow", "green"];
  return (
    <svg className="traffic-light" viewBox="0 0 44 112" aria-hidden="true" focusable="false">
      <rect className="traffic-light__housing" x="1.5" y="1.5" width="41" height="109" rx="14" />
      {lights.map((light, index) => (
        <circle
          key={light}
          className={`traffic-light__lamp traffic-light__lamp--${light}`}
          data-on={light === level ? "" : undefined}
          cx="22"
          cy={22 + index * 34}
          r="12"
        />
      ))}
    </svg>
  );
}
