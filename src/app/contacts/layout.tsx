import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти — Медичний центр Ехокор, Львів, вул. Угорська 17",
  description:
    "Адреса, телефон та графік роботи медичного центру Ехокор у Львові. Запис на консультацію сомнолога онлайн.",
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
