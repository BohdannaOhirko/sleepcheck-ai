import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatButton from "@/components/chatbot/ChatButton";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SleepCheck AI - Діагностика розладів сну",
  description:
    "Безкоштовний AI-аналіз ризиків апное та розладів сну. Пройдіть тест за 5 хвилин.",
  metadataBase: new URL("https://sleepcheck-ai.ehokor.com.ua"),
  openGraph: {
    title: "SleepCheck AI — Діагностика розладів сну",
    description:
      "Безкоштовний AI-аналіз ризиків апное та розладів сну. Пройдіть тест за 5 хвилин.",
    url: "https://sleepcheck-ai.ehokor.com.ua",
    siteName: "SleepCheck AI — Ехокор",
    locale: "uk_UA",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Медичний центр Ехокор",
  alternateName: "SleepCheck AI",
  description:
    "Спеціалізований центр діагностики та лікування розладів сну у Львові. Полісомнографія, сомнологія, ЕЕГ.",
  url: "https://sleepcheck-ai.ehokor.com.ua",
  telephone: "+380988814499",
  email: "info@ehokor.com.ua",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Угорська, 17",
    addressLocality: "Львів",
    addressCountry: "UA",
    postalCode: "79000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.8115,
    longitude: 24.0407,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
  medicalSpecialty: "Sleep Medicine",
  foundingDate: "2008",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
