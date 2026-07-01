import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { SmoothScroll } from "@/components/smooth-scroll";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vnls.uz"),
  title: {
    default: "Православный молодёжный клуб во имя святых мучениц Веры, Надежды, Любови и матери их Софии",
    template: "%s | ПМК во имя святых мучениц Веры, Надежды, Любови и матери их Софии",
  },
  description:
    "Православный молодёжный клуб во имя святых мучениц Веры, Надежды, Любови и матери их Софии при Свято-Успенском кафедральном соборе в Ташкенте: новости, события, выезды, благотворительность и добрые дела.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПМК во имя святых мучениц Веры, Надежды, Любови и матери их Софии",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dailyVerse = await getDailyVerse();

  return (
    <html lang="ru" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll>
          <AppShell dailyVerse={dailyVerse}>{children}</AppShell>
        </SmoothScroll>
      </body>
    </html>
  );
}
