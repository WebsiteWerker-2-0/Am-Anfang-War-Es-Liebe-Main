"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Tafel = { bild: StaticImageData; titel: string };

// Slider ohne Autoplay und ohne Bibliothek: CSS scroll-snap plus
// Vor/Zurück-Buttons und Positionsanzeige (Abschnitt 6.6)
export function Ausstellung({ tafeln }: { tafeln: Tafel[] }) {
  const spur = useRef<HTMLUListElement>(null);
  const [aktiv, setAktiv] = useState(0);

  const zeige = useCallback((i: number) => {
    const el = spur.current?.children[i] as HTMLElement | undefined;
    if (!el || !spur.current) return;
    spur.current.scrollTo({ left: el.offsetLeft - spur.current.offsetLeft });
  }, []);

  useEffect(() => {
    const el = spur.current;
    if (!el) return;
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            setAktiv(Number((e.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: el, threshold: [0.6] },
    );
    Array.from(el.children).forEach((c) => beobachter.observe(c));
    return () => beobachter.disconnect();
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      zeige(Math.min(aktiv + 1, tafeln.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      zeige(Math.max(aktiv - 1, 0));
    }
  }

  return (
    <div className="ausstellung" role="region" aria-roledescription="Bildergalerie" aria-label="Tafeln der Ausstellung">
      <ul className="ausstellung__spur" ref={spur} tabIndex={0} onKeyDown={onKey}>
        {tafeln.map((t, i) => (
          <li key={t.titel} data-index={i}>
            <figure className="ausstellung__tafel">
              <Image
                src={t.bild}
                alt={`Ausstellungstafel ${i + 1}: ${t.titel}`}
                sizes="(min-width: 64em) 20rem, 78vw"
              />
              <figcaption>
                <span className="muted">Tafel {i + 1} · </span>
                {t.titel}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="ausstellung__steuerung">
        <button type="button" onClick={() => zeige(aktiv - 1)} disabled={aktiv === 0}>
          Zurück
        </button>
        <button type="button" onClick={() => zeige(aktiv + 1)} disabled={aktiv >= tafeln.length - 1}>
          Weiter
        </button>
        <p aria-live="polite" className="muted">
          Bild {aktiv + 1} von {tafeln.length}
        </p>
      </div>
    </div>
  );
}
