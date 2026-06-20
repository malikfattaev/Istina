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
    default: "Молодёжный православный форум «Истина»",
    template: "%s | Истина",
  },
  description:
    "Молодёжный православный форум «Истина» при Свято-Успенском кафедральном соборе в Ташкенте: новости, события, выезды, благотворительность и добрые дела.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Молодёжный православный форум «Истина»",
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
