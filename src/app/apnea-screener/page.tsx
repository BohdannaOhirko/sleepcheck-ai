"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import screenerData from "@/data/apnea-screener.json";
import { calculateScore, saveScreenerResult } from "@/lib/apnea-screener";
import type { Answer } from "@/lib/apnea-screener";

export default function ApneaScreenerPage() {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | number>("intro");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const questions = screenerData.questions;
  const currentQ = typeof step === "number" ? questions[step - 1] : null;

  const handleYesNo = (value: boolean) => {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
  };

  const handleMultiple = (optId: string) => {
    if (!currentQ) return;
    const current = (answers[currentQ.id] as string[]) || [];
    const opt = currentQ.options?.find((o) => o.id === optId);

    if (opt?.exclusive) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: [optId] }));
      return;
    }

    let updated = current.filter((id) => {
      const o = currentQ.options?.find((x) => x.id === id);
      return !o?.exclusive;
    });

    if (updated.includes(optId)) {
      updated = updated.filter((id) => id !== optId);
    } else {
      updated = [...updated, optId];
    }
    setAnswers((prev) => ({ ...prev, [currentQ.id]: updated }));
  };

  const canProceed = () => {
    if (!currentQ) return false;
    const ans = answers[currentQ.id];
    if (currentQ.type === "yesno") return ans !== null && ans !== undefined;
    if (currentQ.type === "multiple")
      return Array.isArray(ans) && ans.length > 0;
    return false;
  };

  const goNext = async () => {
    if (typeof step === "number") {
      if (step < questions.length) {
        setStep(step + 1);
      } else {
        const result = calculateScore(answers);
        await saveScreenerResult(answers, result);
        const params = new URLSearchParams({
          score: String(result.score),
          risk: result.risk,
        });
        router.push(`/apnea-screener/results?${params.toString()}`);
      }
    }
  };

  const goBack = () => {
    if (typeof step === "number" && step > 1) setStep(step - 1);
    else setStep("intro");
  };

  if (step === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-red-400 to-rose-500 rounded-full blur-xl opacity-20" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg text-3xl">
                  🫁
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">
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
                onClick={() => setStep(1)}
                className="w-full px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
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

  if (!currentQ) return null;
  const progress = (((step as number) - 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center text-white text-lg shadow">
                🫁
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-sm">
                  Скринінг апное
                </h2>
                <p className="text-xs text-muted-foreground">
                  Питання {step as number} з {questions.length}
                </p>
              </div>
            </div>
            <Link
              href="/questionnaire"
              className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-accent transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Прогрес</span>
            <span className="text-red-500 font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="bg-card rounded-3xl shadow-xl border border-border p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold flex items-center justify-center">
              {step as number}
            </span>
            <span className="text-sm text-muted-foreground">
              з {questions.length} питань
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
            {currentQ.question}
          </h2>
          {currentQ.subtitle && (
            <p className="text-muted-foreground mb-1 text-sm">
              {currentQ.subtitle}
            </p>
          )}
          {currentQ.hint && (
            <div className="flex gap-2 items-start bg-accent/50 rounded-xl p-3 mb-6 text-sm text-muted-foreground">
              <span>ℹ️</span>
              <span>{currentQ.hint}</span>
            </div>
          )}

          {currentQ.type === "yesno" && (
            <div className="space-y-3">
              {[
                {
                  value: true,
                  label: "Так",
                  icon: "✓",
                  active:
                    "bg-emerald-600 text-white border-emerald-600 shadow-lg",
                },
                {
                  value: false,
                  label: "Ні",
                  icon: "✕",
                  active: "bg-red-500 text-white border-red-500 shadow-lg",
                },
                ...(currentQ.unknownOption
                  ? [
                      {
                        value: null as unknown as boolean,
                        label: "Не знаю",
                        icon: "?",
                        active:
                          "bg-gray-500 text-white border-gray-500 shadow-lg",
                      },
                    ]
                  : []),
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => handleYesNo(opt.value as boolean)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:scale-[1.01] font-medium text-base ${
                    answers[currentQ.id] === opt.value
                      ? opt.active
                      : "border-border hover:border-gray-300 bg-background hover:bg-accent"
                  }`}
                >
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {opt.icon}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {currentQ.type === "multiple" && (
            <div className="space-y-2">
              {currentQ.options?.map((opt) => {
                const selected = (
                  (answers[currentQ.id] as string[]) || []
                ).includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleMultiple(opt.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all text-sm ${
                      selected
                        ? "border-[var(--logo-green)] bg-[var(--logo-green)]/10 text-foreground"
                        : "border-border hover:border-gray-300 bg-background hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 ${selected ? "bg-[var(--logo-green)] border-[var(--logo-green)]" : "border-gray-300"}`}
                    >
                      {selected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button
              onClick={goBack}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-border font-semibold text-muted-foreground hover:border-[var(--logo-aqua)] hover:text-foreground hover:bg-accent transition-all"
            >
              ← Назад
            </button>
            <button
              onClick={goNext}
              disabled={!canProceed()}
              className="flex-[2] px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg"
            >
              {(step as number) === questions.length
                ? "Дізнатися результат →"
                : "Далі →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
