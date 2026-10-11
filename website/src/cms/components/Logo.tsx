// Anmeldeseite und Kopf des Backends: Name der Website statt des Payload-Logos
export function Logo() {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.3 }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 600 }}>Am Anfang war es Liebe …</div>
      <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Redaktion der Website</div>
    </div>
  );
}

export function Icon() {
  return (
    <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.1rem" }} aria-hidden="true">
      A
    </span>
  );
}
