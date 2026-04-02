"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import screenerData from "@/data/apnea-screener.json";

const riskColors = {
  low: {
    bg: "from-emerald-500 to-green-600",
    text: "text-emerald-700",
    border: "border-emerald-300",
    light: "bg-emerald-50",
  },
  medium: {
    bg: "from-amber-400 to-orange-500",
    text: "text-amber-700",
    border: "border-amber-300",
    light: "bg-amber-50",
  },
  high: {
    bg: "from-red-500 to-rose-600",
    text: "text-red-700",
    border: "border-red-300",
    light: "bg-red-50",
  },
};

function ResultContent() {
  const params = useSearchParams();
  const score = Number(params.get("score") ?? 0);
  const risk = (params.get("risk") ?? "low") as "low" | "medium" | "high";

  const { scoring } = screenerData;
  const scoringData =
    risk === "low"
      ? scoring.low
      : risk === "medium"
        ? scoring.medium
        : scoring.high;
  const colors = riskColors[risk];

  return (
    <div className="max-w-lg w-full">
      <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
        <div
          className={`bg-gradient-to-r ${colors.bg} p-8 text-white text-center`}
        >
          <div className="text-5xl mb-3">
            {risk === "low" ? "😴" : risk === "medium" ? "⚠️" : "🚨"}
          </div>
          <h2 className="text-2xl font-bold mb-1">{scoringData.label}</h2>
          <p className="text-white/80 text-sm">
            Ваш результат: {score} з {screenerData.questions.length + 3} балів
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div
            className={`${colors.light} ${colors.border} border-2 rounded-2xl p-5`}
          >
            <p className={`${colors.text} font-medium leading-relaxed`}>
              {scoringData.description}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Що робити далі:</h3>
            {risk === "low" && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> Слідкуйте за
                  режимом сну
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> Пройдіть повну
                  анкету для детальної оцінки
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> За появи нових
                  симптомів — зверніться до лікаря
                </li>
              </ul>
            )}
            {risk === "medium" && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-amber-500">→</span> Пройдіть повну
                  анкету (30 питань)
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">→</span> Зверніться на
                  консультацію до сомнолога
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500">→</span> Розгляньте домашній
                  моніторинг сну
                </li>
              </ul>
            )}
            {risk === "high" && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-red-500">!</span> Необхідна консультація
                  сомнолога
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">!</span> Рекомендована
                  полісомнографія
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">!</span> Не відкладайте — апное
                  небезпечне для здоров&apos;я
                </li>
              </ul>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/services"
              className={`block w-full px-6 py-4 rounded-xl font-semibold text-center text-white bg-gradient-to-r ${colors.bg} hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg`}
            >
              Записатися на консультацію →
            </Link>
            <Link
              href="/questionnaire"
              className="block w-full px-6 py-4 rounded-xl font-semibold text-center border-2 border-border hover:border-[var(--logo-green)] hover:bg-accent transition-all"
            >
              Пройти повну анкету (30 питань)
            </Link>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-4 rounded-xl font-semibold text-center border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all"
            >
              Переглянути в кабінеті →
            </Link>
            <Link
              href="/apnea-screener"
              className="block w-full px-6 py-4 rounded-xl text-sm text-muted-foreground text-center hover:text-foreground transition-colors"
            >
              Пройти скринінг знову
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApneaScreenerResultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary flex items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </div>
  );
}
