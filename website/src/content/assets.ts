import type { StaticImageData } from "next/image";
import img00 from "@/assets/campaigns/anonymous-evidence-collection-poster.jpg";
import img01 from "@/assets/exhibition/panel-01.jpg";
import img02 from "@/assets/exhibition/panel-02.jpg";
import img03 from "@/assets/exhibition/panel-03.jpg";
import img04 from "@/assets/exhibition/panel-04.jpg";
import img05 from "@/assets/exhibition/panel-05.jpg";
import img06 from "@/assets/exhibition/panel-06.jpg";
import img07 from "@/assets/exhibition/panel-07.jpg";
import img08 from "@/assets/exhibition/panel-08.jpg";
import img09 from "@/assets/exhibition/panel-09.jpg";
import img10 from "@/assets/exhibition/panel-10.jpg";
import img11 from "@/assets/exhibition/panel-11.jpg";
import img12 from "@/assets/exhibition/panel-12.jpg";
import img13 from "@/assets/illustrations/band-p06.jpg";
import img14 from "@/assets/illustrations/band-p07.jpg";
import img15 from "@/assets/illustrations/band-p12.jpg";
import img16 from "@/assets/illustrations/band-p13.jpg";
import img17 from "@/assets/illustrations/band-p15.jpg";
import img18 from "@/assets/illustrations/sun.jpg";
import img19 from "@/assets/illustrations/thoughts.jpg";
import img20 from "@/assets/logos/mkjfgfi-nrw.png";
import img21 from "@/assets/photos/working-group.jpg";
import img22 from "@/assets/infos/rad-der-gewalt.jpg";
import img23 from "@/assets/infos/gewaltspirale.jpg";

// Bilder der Website als Schlüssel für die Standardinhalte (`content/pages/`).
// Im CMS liegen dieselben Bilder als Dateien und werden dort ausgetauscht.
// Nur im Next.js-Laufzeitcode importieren: Die Bilder sind Webpack-/Turbopack-Importe.
export const staticImages: Record<string, StaticImageData> = {
  "campaigns/anonymous-evidence-collection-poster": img00,
  "infos/rad-der-gewalt": img22,
  "infos/gewaltspirale": img23,
  "exhibition/panel-01": img01,
  "exhibition/panel-02": img02,
  "exhibition/panel-03": img03,
  "exhibition/panel-04": img04,
  "exhibition/panel-05": img05,
  "exhibition/panel-06": img06,
  "exhibition/panel-07": img07,
  "exhibition/panel-08": img08,
  "exhibition/panel-09": img09,
  "exhibition/panel-10": img10,
  "exhibition/panel-11": img11,
  "exhibition/panel-12": img12,
  "illustrations/band-p06": img13,
  "illustrations/band-p07": img14,
  "illustrations/band-p12": img15,
  "illustrations/band-p13": img16,
  "illustrations/band-p15": img17,
  "illustrations/sun": img18,
  "illustrations/thoughts": img19,
  "logos/mkjfgfi-nrw": img20,
  "photos/working-group": img21,
};
