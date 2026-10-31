"use client";

import { useEffect } from "react";

// Sprunglink auf einen zugeklappten Abschnitt (etwa /hilfe#stalking aus dem Selbstcheck): aufklappen und hinscrollen.
// Ohne JavaScript bleiben die Abschnitte zu öffnen, der Link führt dann nur zur Überschrift.
export function OpenDetailsOnHash() {
  useEffect(() => {
    function open() {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      const details = target?.closest("details");
      if (!target || !details) return;
      details.open = true;
      target.scrollIntoView();
    }
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
