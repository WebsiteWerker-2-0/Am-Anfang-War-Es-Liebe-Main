"use client";

import { useRowLabel } from "@payloadcms/ui";

// Beschriftung eines Blocks in der Seitenansicht: Überschrift des Abschnitts statt „Ohne Titel“
export function BlockLabel() {
  const { data } = useRowLabel<{ heading?: string; title?: string; legend?: string; lead?: string; text?: string; label?: string }>();
  const text = data?.heading || data?.title || data?.legend || data?.lead || data?.label || data?.text;
  const short = text && text.length > 70 ? `${text.slice(0, 70)} …` : text;
  return <span>{short || "Ohne Titel"}</span>;
}
