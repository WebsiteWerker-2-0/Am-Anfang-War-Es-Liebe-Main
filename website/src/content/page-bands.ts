// Broschüren-Bänder für den Seitenkopf. Die Fläche neben der Illustration nimmt den im JPG
// gemessenen Grund auf, sonst entsteht eine sichtbare Kante. Nach Z-06 neu abgleichen.
import type { StaticImageData } from "next/image";
import type { BandKey } from "./band-keys";
import courses from "@/assets/illustrations/band-p06.jpg";
import help from "@/assets/illustrations/band-p12.jpg";
import info from "@/assets/illustrations/band-p07.jpg";
import workingGroup from "@/assets/illustrations/band-p13.jpg";
import news from "@/assets/illustrations/band-p15.jpg";

export type PageBand = {
  image: StaticImageData;
  /** Ton für den Balken unter der Überschrift */
  tone: "orange" | "magenta" | "sand";
  /** Gemessener Grund im JPG */
  field: string;
  /** Bildausschnitt, damit die Figuren nicht angeschnitten werden */
  position: string;
};

export const pageBands = {
  help: { image: help, tone: "magenta", field: "#ff038a", position: "75% bottom" },
  courses: { image: courses, tone: "sand", field: "#f5ddb9", position: "50% bottom" },
  info: { image: info, tone: "orange", field: "#ff7f00", position: "right bottom" },
  workingGroup: { image: workingGroup, tone: "orange", field: "#ff7d01", position: "right bottom" },
  news: { image: news, tone: "magenta", field: "#ff038a", position: "right bottom" },
} satisfies Record<BandKey, PageBand>;
