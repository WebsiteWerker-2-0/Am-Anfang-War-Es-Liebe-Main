"use client";

import { useEffect } from "react";
import { QUICK_EXIT_URL } from "@/content/navigation";

// Verhalten des Notausgangs (Abschnitt 6.2): Klick auf [data-quick-exit] oder
// zweimal Esc innerhalb einer Sekunde. Ohne JavaScript funktioniert der
// Link trotzdem, weil er ein normaler Link auf QUICK_EXIT_URL ist.
export function QuickExitBehavior() {
  useEffect(() => {
    function leave() {
      document.body.hidden = true;
      window.location.replace(QUICK_EXIT_URL);
    }

    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (target?.closest("[data-quick-exit]")) {
        e.preventDefault();
        leave();
      }
    }

    let lastEscape = 0;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const now = Date.now();
      if (now - lastEscape < 1000) leave();
      lastEscape = now;
    }

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}

export function QuickExitLink({
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
      href={QUICK_EXIT_URL}
      rel="noreferrer"
      data-quick-exit
      lang={lang}
      className={fixed ? "quick-exit quick-exit--fixed" : "quick-exit"}
    >
      {label}
    </a>
  );
}
