import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вхід до кабінету | SleepCheck AI — Ехокор",
  description:
    "Увійдіть до особистого кабінету SleepCheck AI для перегляду результатів діагностики сну.",
  robots: "noindex, nofollow",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
