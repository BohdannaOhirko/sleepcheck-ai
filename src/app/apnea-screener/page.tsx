"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import screenerData from "@/data/apnea-screener.json";

export default function ApneaScreenerPage() {
  const router = useRouter();

  const handleStart = () => {
    localStorage.removeItem("apneaAnswers");
    router.push("/apnea-screener/questions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-xl opacity-20" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg text-3xl">
                🫁
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">
              Скринінг апное сну
            </span>
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {screenerData.description}
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                icon: "⚡",
                title: "Лише 5 питань",
                sub: "Результат за 2 хвилини",
              },
              {
                icon: "🎯",
                title: "Клінічна шкала STOP-BANG",
                sub: "Міжнародний стандарт скринінгу",
              },
              {
                icon: "🩺",
                title: "Чіткий результат",
                sub: "Рекомендації щодо наступних кроків",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-3 rounded-xl bg-accent/40"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={handleStart}
              className="w-full px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Розпочати скринінг →
            </button>
            <Link
              href="/questionnaire"
              className="block w-full px-8 py-4 rounded-xl font-semibold text-base border-2 border-border text-center hover:border-[var(--logo-aqua)] hover:bg-accent transition-all"
            >
              ← Повна анкета (30 питань)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
