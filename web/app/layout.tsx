import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { getDailyVerse } from "@/lib/daily-verse";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://istina.uz"),
  title: {
    default: "Истина | Главная",
    template: "Истина | %s",
  },
  description:
    "Православный портал Узбекистана: новости приходов, богословие, жития святых, расписание богослужений.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Истина",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dailyVerse = await getDailyVerse();

  return (
    <html lang="ru" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <AppShell dailyVerse={dailyVerse}>{children}</AppShell>
      </body>
    </html>
  );
}
