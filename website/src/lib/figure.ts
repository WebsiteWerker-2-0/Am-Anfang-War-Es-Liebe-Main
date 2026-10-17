/** Bildposition im Text: mittig in voller Breite, links oder rechts halb so breit mit Text daneben (globals.css, .figure) */
export function figureClass(position: unknown) {
  return `figure figure--${position === "left" || position === "right" ? position : "center"}`;
}
