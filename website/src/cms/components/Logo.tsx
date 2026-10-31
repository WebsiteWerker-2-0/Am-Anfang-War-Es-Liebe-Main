// Anmeldeseite und Kopf des Backends: Name der Website statt des Payload-Logos
export function Logo() {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.3 }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 600 }}>Am Anfang war es Liebe …</div>
      <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>Redaktion der Website</div>
    </div>
  );
}

// Links oben im Backend: führt zur Startseite des Backends
export function Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}
