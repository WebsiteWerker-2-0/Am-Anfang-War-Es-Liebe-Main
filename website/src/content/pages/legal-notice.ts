import type { PageData } from "../model";
import { tel } from "./helpers";

// OFFEN: Impressum nach DDG mit dem AG abstimmen. Angaben von der Altseite.
export const legalNotice: PageData = {
  slug: "impressum",
  title: "Impressum",
  layout: "measure-stack",
  blocks: [
    {
      blockType: "section",
      variant: "plain",
      items: [
        {
          blockType: "rich",
          content: `<p>Arbeitskreis „Gegen Gewalt an Frauen und Kindern im Kreis Höxter“<br>c/o Gleichstellungsbeauftragte des Kreises Höxter<br>Moltkestraße 12<br>37671 Höxter</p>
<p>Telefon ${tel("05271 9659904")}<br>E-Mail <a href="mailto:gleichstellung@kreis-hoexter.de">gleichstellung@kreis-hoexter.de</a></p>`,
        },
      ],
    },
  ],
};
