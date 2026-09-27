"use client";

import { useEffect, useRef } from "react";

// Keine Speicherung, keine Requests, kein Web Storage (Abschnitt 0, Regel 4).
// Beim Zurücknavigieren (Back-Forward-Cache) wird alles zurückgesetzt.
export function Selbstcheck({ aussagen }: { aussagen: string[] }) {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function zuruecksetzen() {
      form.current?.reset();
    }
    window.addEventListener("pageshow", zuruecksetzen);
    return () => window.removeEventListener("pageshow", zuruecksetzen);
  }, []);

  return (
    <form
      id="selbstcheck"
      className="selbstcheck"
      ref={form}
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset>
        <legend>Ihr (Ex-)Partner, (Ex-)Ehemann oder eine andere Person …</legend>
        <ul className="selbstcheck__liste">
          {aussagen.map((a, i) => (
            <li key={a}>
              <label>
                <input type="checkbox" name={`aussage-${i}`} autoComplete="off" />
                <span>{a}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}
