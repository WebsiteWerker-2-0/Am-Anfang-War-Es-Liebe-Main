import { telHref } from "@/content/anlaufstellen";

// Telefonnummer mit schmalem geschütztem Leerzeichen (Abschnitt 4.3)
export function Telefon({ nummer, className = "tel" }: { nummer: string; className?: string }) {
  return (
    <a href={telHref(nummer)} className={className}>
      {nummer.replace(/ /g, " ")}
    </a>
  );
}
