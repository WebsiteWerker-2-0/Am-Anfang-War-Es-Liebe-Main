"use client";

import { useEffect, useRef } from "react";

// Selbstcheck ohne Speicherung (ADR-0003): keine Requests, kein Web Storage,
// keine Cookies. Beim Zurücknavigieren (Back-Forward-Cache) wird alles geleert.
export function SelfCheckForm({ statements }: { statements: string[] }) {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function clear() {
      form.current?.reset();
    }
    window.addEventListener("pageshow", clear);
    return () => window.removeEventListener("pageshow", clear);
  }, []);

  return (
    <form id="self-check" className="self-check" ref={form} autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>Ihr (Ex-)Partner, (Ex-)Ehemann oder eine andere Person …</legend>
        <ul className="self-check__list">
          {statements.map((statement, index) => (
            <li key={statement}>
              <label>
                <input type="checkbox" name={`statement-${index}`} autoComplete="off" />
                <span>{statement}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}
