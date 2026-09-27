import Image, { type StaticImageData } from "next/image";

export function Seitenkopf({
  titel,
  einleitung,
  band,
  children,
}: {
  titel: string;
  einleitung?: React.ReactNode;
  band?: StaticImageData;
  children?: React.ReactNode;
}) {
  return (
    <>
      {band && <Image src={band} alt="" className="seitenband" priority sizes="100vw" />}
      <div className="seitenkopf wide">
        <div className="measure">
          <h1>{titel}</h1>
          {einleitung && <p className="lead">{einleitung}</p>}
          {children}
        </div>
      </div>
    </>
  );
}
