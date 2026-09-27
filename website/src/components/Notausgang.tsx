"use client";

import { useEffect } from "react";
import { EXIT_URL } from "@/content/navigation";

// Verhalten des Notausgangs (Abschnitt 6.2): Klick auf [data-exit] oder
// zweimal Esc innerhalb einer Sekunde. Ohne JavaScript funktioniert der
// Link trotzdem, weil er ein normaler Link auf EXIT_URL ist.
export function NotausgangVerhalten() {
  useEffect(() => {
    function leave() {
      document.body.hidden = true;
      window.location.replace(EXIT_URL);
    }

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest("[data-exit]")) {
        e.preventDefault();
        leave();
      }
    }

    let last = 0;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - last < 1000) leave();
      last = now;
    }

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

export function NotausgangLink({
  label = "Seite verlassen",
  fixed = false,
  lang,
}: {
  label?: string;
  fixed?: boolean;
  lang?: string;
}) {
  return (
    <a
      href={EXIT_URL}
      rel="noreferrer"
      data-exit
      lang={lang}
      className={fixed ? "exit exit--fixed" : "exit"}
    >
      {label}
    </a>
  );
}
