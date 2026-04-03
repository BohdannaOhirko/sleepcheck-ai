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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ChatButton />
      </body>
    </html>
  );
}
