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
      // Gehaltene Taste (Auto-Repeat) zählt nicht als zweiter Druck
      if (e.key !== "Escape" || e.repeat) return;
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
      <svg
        className="quick-exit__icon"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M10 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" />
        <path d="M15 8l4 4-4 4M19 12H9" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
