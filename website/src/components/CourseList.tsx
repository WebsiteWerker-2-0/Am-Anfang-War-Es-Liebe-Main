"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { CourseState, PublicCourse } from "@/lib/courses";

// Kurse mit freien Plätzen und Anmeldeformular. Die Seite wird zwischengespeichert, deshalb fragt
// dieser Teil den aktuellen Stand regelmäßig beim Server ab, solange die Seite offen ist.

const date = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Berlin",
});
const time = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });

function when(course: PublicCourse) {
  const start = new Date(course.startsAt);
  const end = course.endsAt ? new Date(course.endsAt) : null;
  const sameDay = end && date.format(end) === date.format(start);
  const clock = `${time.format(start)} Uhr${end && sameDay ? ` bis ${time.format(end)} Uhr` : ""}`;
  return end && !sameDay ? `${date.format(start)} bis ${date.format(end)}` : `${date.format(start)}, ${clock}`;
}

function Places({ course }: { course: PublicCourse }) {
  const text: Record<CourseState, string> = {
    open: course.free === 1 ? "Noch 1 Platz frei" : `Noch ${course.free} Plätze frei`,
    waitlist: "Ausgebucht, Anmeldung für die Warteliste möglich",
    full: "Ausgebucht",
    closed: "Anmeldung nicht möglich",
  };
  const filled = Math.min(100, Math.round((course.taken / course.capacity) * 100));
  return (
    <p className={`places places--${course.state}`} aria-live="polite">
      <span className="places__bar" aria-hidden="true">
        <span style={{ width: `${filled}%` }} />
      </span>
      {text[course.state]}{" "}
      <span className="muted">
        ({course.taken} von {course.capacity} belegt)
      </span>
    </p>
  );
}

type Feedback = { kind: "success" | "error"; text: string } | null;

function RegistrationForm({ course, onDone }: { course: PublicCourse; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // currentTarget gibt es nur während des Ereignisses, nach dem await ist es leer
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setBusy(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/kurse/anmeldung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
          website: form.get("website"),
          consent: form.get("consent") === "on",
        }),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string; status?: string };
      if (response.ok) {
        setFeedback({
          kind: "success",
          text:
            body.status === "waitlist"
              ? "Danke! Sie stehen auf der Warteliste. Wir melden uns, sobald ein Platz frei wird."
              : "Danke, Ihre Anmeldung ist eingegangen. Wir melden uns bei Ihnen.",
        });
        formElement.reset();
      } else {
        setFeedback({
          kind: "error",
          text: body.message ?? "Die Anmeldung hat nicht geklappt. Bitte versuchen Sie es später noch einmal.",
        });
      }
      onDone();
    } catch {
      setFeedback({
        kind: "error",
        text: "Der Server ist nicht erreichbar. Bitte versuchen Sie es später noch einmal.",
      });
    } finally {
      setBusy(false);
    }
  }

  const id = `kurs-${course.id}`;
  return (
    <form className="form" autoComplete="off" onSubmit={submit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>
          Name <span className="field__hint">(Pflichtfeld)</span>
        </label>
        <input id={`${id}-name`} name="name" type="text" required maxLength={100} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>
          E-Mail-Adresse <span className="field__hint">(Pflichtfeld, wir antworten Ihnen dort)</span>
        </label>
        <input id={`${id}-email`} name="email" type="email" required maxLength={200} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`}>
          Telefon <span className="field__hint">(freiwillig)</span>
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" maxLength={40} autoComplete="off" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-message`}>
          Nachricht <span className="field__hint">(freiwillig)</span>
        </label>
        <textarea id={`${id}-message`} name="message" maxLength={1000} />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Bitte leer lassen</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="radio">
        <input type="checkbox" name="consent" required />
        <span>
          Ich habe die <a href="/datenschutz">Datenschutzhinweise</a> gelesen. Meine Angaben werden für diese Anmeldung
          gespeichert und per E-Mail an den Arbeitskreis übermittelt.
        </span>
      </label>
      <div>
        <button type="submit" className="button" disabled={busy}>
          {busy
            ? "Wird gesendet …"
            : course.state === "waitlist"
              ? "Auf die Warteliste setzen"
              : "Verbindlich anmelden"}
        </button>
      </div>
      <div role="status" aria-live="polite">
        {feedback && (
          <p className={feedback.kind === "error" ? "notice" : "status"}>
            <strong>{feedback.kind === "error" ? "Das hat nicht geklappt. " : ""}</strong>
            {feedback.text}
          </p>
        )}
      </div>
    </form>
  );
}

export function CourseList({
  initial,
  heading,
  anchor,
  empty,
  preview = false,
}: {
  initial: PublicCourse[];
  heading: string;
  anchor?: string;
  /** Hinweis, solange es keinen veröffentlichten Kurs gibt (wird auf dem Server erzeugt) */
  empty: ReactNode;
  /** Vorschau im Backend: keine Abfrage beim Server, keine Anmeldung */
  preview?: boolean;
}) {
  const [courses, setCourses] = useState(initial);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/kurse", { cache: "no-store" });
      if (response.ok) setCourses(((await response.json()) as { courses: PublicCourse[] }).courses);
    } catch {
      // Die Anzeige bleibt beim letzten bekannten Stand
    }
  }, []);

  useEffect(() => {
    // Gleich nach dem Laden und danach alle 30 Sekunden, solange die Seite sichtbar ist
    if (preview) return;
    const first = setTimeout(refresh, 0);
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [refresh, preview]);

  // Die Seite ist zwischengespeichert: auch wenn sie ohne Kurse erzeugt wurde, erscheinen neue Kurse nach dem Laden
  if (courses.length === 0) return <>{empty}</>;

  return (
    <section className="stack" aria-labelledby={anchor}>
      <h2 id={anchor}>{heading}</h2>
      <div className="courses">
        {courses.map((course) => (
          <article className="course" key={course.id} aria-labelledby={`kurs-${course.id}-titel`}>
            <h3 id={`kurs-${course.id}-titel`}>{course.title}</h3>
            <dl className="course__meta">
              <div>
                <dt className="visually-hidden">Termin</dt>
                <dd>
                  <strong>{when(course)}</strong>
                </dd>
              </div>
              {course.location && (
                <div>
                  <dt className="visually-hidden">Ort</dt>
                  <dd>{course.location}</dd>
                </div>
              )}
              {course.audience && (
                <div>
                  <dt className="visually-hidden">Für wen</dt>
                  <dd>Für {course.audience}</dd>
                </div>
              )}
              {course.price && (
                <div>
                  <dt className="visually-hidden">Kosten</dt>
                  <dd>Kosten: {course.price}</dd>
                </div>
              )}
              {course.instructor && (
                <div>
                  <dt className="visually-hidden">Leitung</dt>
                  <dd>Leitung: {course.instructor}</dd>
                </div>
              )}
            </dl>
            {course.description &&
              course.description.split(/\n\s*\n/).map((paragraph, index) => (
                <p className="measure" key={index}>
                  {paragraph}
                </p>
              ))}
            {course.detailsHtml && <div className="prose" dangerouslySetInnerHTML={{ __html: course.detailsHtml }} />}
            <Places course={course} />
            {preview && <p className="small muted">Vorschau: Hier erscheint das Anmeldeformular.</p>}
            {!preview && (course.state === "open" || course.state === "waitlist") && (
              <details className="course__form">
                <summary>
                  {course.state === "waitlist" ? "Auf die Warteliste setzen" : "Hier anmelden"}
                </summary>
                <RegistrationForm course={course} onDone={refresh} />
              </details>
            )}
            <noscript>
              <p className="small muted">
                Für die Anmeldung wird JavaScript benötigt. Bitte nutzen Sie sonst die Seite „Kontakt“.
              </p>
            </noscript>
          </article>
        ))}
      </div>
    </section>
  );
}
