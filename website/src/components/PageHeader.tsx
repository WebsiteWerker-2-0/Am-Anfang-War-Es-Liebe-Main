import Image from "next/image";
import type { PageBand } from "@/content/page-bands";

export function PageHeader({
  title,
  intro,
  band,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  /** Illustrationsband aus der Broschüre neben der Überschrift */
  band?: PageBand;
  children?: React.ReactNode;
}) {
  if (!band) {
    return (
      <div className="page-header wide">
        <div className="measure">
          <h1>{title}</h1>
          {intro && <p className="lead">{intro}</p>}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`page-hero page-hero--${band.tone}`} style={{ "--hero-field": band.field } as React.CSSProperties}>
      <div className="page-hero__field">
        {/* Gewellte Kante zum Text hin: auf dem Handy unten, ab Desktop an der Seite */}
        <svg className="page-hero__edge page-hero__edge--bottom" aria-hidden="true" viewBox="0 0 390 24" preserveAspectRatio="none">
          <path d="M0 0 L390 0 L390 10 C 330 26, 270 4, 200 14 C 130 24, 70 6, 0 16 Z" />
        </svg>
        <svg className="page-hero__edge page-hero__edge--side" aria-hidden="true" viewBox="0 0 50 390" preserveAspectRatio="none">
          <path d="M50 0 L24 0 C 8 60, 36 112, 18 172 C 4 222, 32 282, 14 334 C 6 362, 20 380, 20 390 L50 390 Z" />
        </svg>
        <Image
          src={band.image}
          alt=""
          priority
          sizes="(min-width: 64em) 52vw, 100vw"
          className="page-hero__image"
          style={{ objectPosition: band.position }}
        />
      </div>
      <div className="page-hero__text wide">
        <div className="page-hero__copy">
          <h1>{title}</h1>
          {intro && <p className="lead">{intro}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
