import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Послуги та ціни — Полісомнографія у Львові | Ехокор",
  description:
    "Полісомнографія, MSLT, консультація сомнолога у Львові. Актуальні ціни на діагностику розладів сну в медичному центрі Ехокор.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
