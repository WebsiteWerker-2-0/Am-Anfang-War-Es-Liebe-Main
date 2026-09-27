import Image, { type StaticImageData } from "next/image";

export function PageHeader({
  title,
  intro,
  band,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  /** Illustrationsband aus der Broschüre über der Überschrift */
  band?: StaticImageData;
  children?: React.ReactNode;
}) {
  return (
    <>
      {band && <Image src={band} alt="" className="page-band" priority sizes="100vw" />}
      <div className="page-header wide">
        <div className="measure">
          <h1>{title}</h1>
          {intro && <p className="lead">{intro}</p>}
          {children}
        </div>
      </div>
    </>
  );
}
