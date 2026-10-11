import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wide measure stack" style={{ paddingBlock: "var(--space-8)" }}>
      <h1>Diese Seite gibt es nicht</h1>
      <p className="lead">Vielleicht hat sich die Adresse geändert. Hier finden Sie weiter:</p>
      <ul className="list-bullets">
        <li>
          <Link href="/hilfe">Hilfe im Kreis Höxter</Link>
        </li>
        <li>
          <Link href="/selbstcheck">Selbstcheck</Link>
        </li>
        <li>
          <Link href="/">Startseite</Link>
        </li>
      </ul>
    </div>
  );
}
