import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Реєстрація | SleepCheck AI — Ехокор",
  description:
    "Створіть акаунт SleepCheck AI щоб зберігати результати діагностики сну та відстежувати динаміку.",
  robots: "noindex, nofollow",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
