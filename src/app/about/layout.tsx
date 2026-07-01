import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про нас — Медичний центр Ехокор | Діагностика сну з 2008 року",
  description:
    "Ехокор — спеціалізований центр діагностики розладів сну у Львові. Сомнологія, полісомнографія, ЕЕГ. Працюємо з 2008 року.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
