import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LevelYourDraw — Generador de briefs contra el bloqueo creativo",
  description: "Generador web de briefs de 4 datos (rol, profesión, mood interno/externo). Bilingüe ES/EN, offline, sin cuentas ni nube.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
