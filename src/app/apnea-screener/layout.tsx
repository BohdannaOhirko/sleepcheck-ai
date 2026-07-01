import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Скринінг апное сну онлайн — Тест STOP-BANG | SleepCheck AI",
  description:
    "Безкоштовний онлайн-скринінг апное сну за шкалою STOP-BANG. 5 питань, результат за 2 хвилини. Від медичного центру Ехокор.",
};

export default function ApneaScreenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
