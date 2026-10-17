import type { Metadata } from "next";
import "./zwei-faktor.css";

// Eigenes, schlichtes Grundgerüst für die Seite des zweiten Faktors (außerhalb von Payload und der Website)
export const metadata: Metadata = {
  title: "Anmeldung bestätigen – Redaktion Am Anfang war es Liebe",
  robots: { index: false, follow: false },
};

export default function TwoFactorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="tf">{children}</body>
    </html>
  );
}
