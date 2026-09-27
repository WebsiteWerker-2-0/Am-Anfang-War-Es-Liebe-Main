"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Panel = { image: StaticImageData; title: string };

// Tafeln der Wanderausstellung als Slider ohne Autoplay und ohne Bibliothek:
// CSS scroll-snap plus Vor/Zurück-Buttons und Positionsanzeige (Abschnitt 6.6)
export function ExhibitionSlider({ panels }: { panels: Panel[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  const showPanel = useCallback((index: number) => {
    const list = track.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (!list || !item) return;
    list.scrollTo({ left: item.offsetLeft - list.offsetLeft });
  }, []);

  // Positionsanzeige folgt auch dem Wischen, nicht nur den Buttons
  useEffect(() => {
    const list = track.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setCurrent(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: list, threshold: [0.6] },
    );
    Array.from(list.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      showPanel(Math.min(current + 1, panels.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPanel(Math.max(current - 1, 0));
    }
  }

  return (
    <div className="exhibition" role="region" aria-roledescription="Bildergalerie" aria-label="Tafeln der Wanderausstellung">
      <ul className="exhibition__track" ref={track} tabIndex={0} onKeyDown={onKeyDown}>
        {panels.map((panel, index) => (
          <li key={panel.title} data-index={index}>
            <figure className="exhibition__panel">
              <Image
                src={panel.image}
                alt={`Tafel ${index + 1} der Wanderausstellung: ${panel.title}`}
                sizes="(min-width: 64em) 20rem, 78vw"
              />
              <figcaption>
                <span className="muted">Tafel {index + 1} · </span>
                {panel.title}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="exhibition__controls">
        <button type="button" onClick={() => showPanel(current - 1)} disabled={current === 0}>
          Zurück
        </button>
        <button type="button" onClick={() => showPanel(current + 1)} disabled={current >= panels.length - 1}>
          Weiter
        </button>
        <p aria-live="polite" className="muted">
          Bild {current + 1} von {panels.length}
        </p>
      </div>
    </div>
  );
}
