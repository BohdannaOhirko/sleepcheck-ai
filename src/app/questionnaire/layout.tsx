import type { Metadata } from "next";
import QuestionnaireShell from "@/components/questionnaire/QuestionnaireShell";

export const metadata: Metadata = {
  title: "AI-діагностика розладів сну — Анкета | SleepCheck AI",
  description:
    "Повна AI-діагностика розладів сну: апное, інсомнія, синдром неспокійних ніг. 30 питань, персональні рекомендації від сомнолога.",
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuestionnaireShell>{children}</QuestionnaireShell>;
}
