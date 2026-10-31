import config from "@payload-config";
import "@payloadcms/next/css";
import "./custom.css";
import type { ServerFunctionClient } from "payload";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { Epilogue } from "next/font/google";
import type { ReactNode } from "react";
import { importMap } from "./backend/importMap";

type Args = { children: ReactNode };

// Dieselbe Schrift wie auf der Website, für den Texteditor (custom.css). Liefert der eigene Server aus (ADR-0002).
const epilogue = Epilogue({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

// Eigenes Root-Layout für das Backend, damit die Website (Gruppe „site“) unverändert bleibt
export default function PayloadLayout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      htmlProps={{ className: epilogue.variable }}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
