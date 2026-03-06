import { Oswald } from "next/font/google";
import "@/styles/globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "VULGUS",
  description: "Curateur streetwear",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={oswald.variable}>
      <body>{children}</body>
    </html>
  );
}