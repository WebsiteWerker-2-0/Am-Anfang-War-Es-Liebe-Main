import { telHref } from "@/content/support-services";

// Telefonnummer mit schmalem geschütztem Leerzeichen (Abschnitt 4.3)
export function PhoneLink({ number, className = "tel" }: { number: string; className?: string }) {
  return (
    <a href={telHref(number)} className={className || undefined}>
      {number.replace(/ /g, " ")}
    </a>
  );
}
