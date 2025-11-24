import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import VideoIntro from "@/components/VideoIntro"   // ← ДОДАЛИ

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "SleepCheck AI - Діагностика розладів сну",
  description: "Безкоштовний AI-аналіз ризиків апное та розладів сну. Пройдіть тест за 5 хвилин.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <VideoIntro>                   {/* ← Початок інтрo */}
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </VideoIntro>                 {/* ← Кінець інтрo */}
      </body>
    </html>
  )
}