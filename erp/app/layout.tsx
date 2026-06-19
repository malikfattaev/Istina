import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Истина · Админ-панель",
    template: "%s · Истина ERP",
  },
  description:
    "Панель управления порталом «Истина»: статьи, рубрики и администраторы.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
