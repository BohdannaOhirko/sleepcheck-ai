"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuestionnairePage() {
  const router = useRouter();

  const handleStart = () => {
    localStorage.removeItem("questionnaireAnswers");
    router.push("/questionnaire/1");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pt-6">
      <div className="text-center mb-2">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-aqua)] bg-clip-text text-transparent">
            Оберіть тест
          </span>
        </h1>
        <p className="text-muted-foreground">
          Виберіть формат діагностики під вашу ситуацію
        </p>
      </div>

      {/* Card 1 — Apnea Screener */}
      <div className="bg-card rounded-3xl shadow-xl border-2 border-border hover:border-blue-300 transition-all duration-300 p-6 sm:p-8 group">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
            🫁
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">
                Скринінг апное
              </h2>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                ~2 хв
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              5 питань за шкалою STOP-BANG. Швидко визначає ймовірність апное
              сну — для тих, хто хоче дізнатися конкретно про цей розлад.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-muted-foreground">
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">5</div>
                <div>питань</div>
              </div>
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">2 хв</div>
                <div>часу</div>
              </div>
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">
                  STOP-BANG
                </div>
                <div>шкала</div>
              </div>
            </div>
            <Link
              href="/apnea-screener"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg"
            >
              Пройти скринінг апное
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm">або</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Card 2 — Full Questionnaire */}
      <div className="bg-card rounded-3xl shadow-xl border-2 border-border hover:border-[var(--logo-green)] transition-all duration-300 p-6 sm:p-8 group">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[var(--logo-green)] to-[var(--logo-aqua)] rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">
                Повна анкета сну
              </h2>
              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                ~5 хв
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              30 питань про всі аспекти сну. AI-аналіз виявляє апное, інсомнію,
              синдром неспокійних ніг та інші розлади — з персональними
              рекомендаціями.
            </p>
            <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-muted-foreground">
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">30</div>
                <div>питань</div>
              </div>
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">5 хв</div>
                <div>часу</div>
              </div>
              <div className="text-center p-2 bg-accent/40 rounded-xl">
                <div className="font-bold text-foreground text-base">AI</div>
                <div>аналіз</div>
              </div>
            </div>
            <div className="bg-accent/50 border border-border rounded-xl p-3 mb-4 text-xs text-muted-foreground flex gap-2">
              <span className="flex-shrink-0">ℹ️</span>
              <span>
                Ця анкета не замінює медичну консультацію. Результати допоможуть
                оцінити ризики.
              </span>
            </div>
            <div className="group relative block w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
              <button
                onClick={handleStart}
                className="relative w-full px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                Почати повну анкету
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="block w-full px-8 py-4 rounded-xl font-medium text-muted-foreground border border-border text-center hover:border-[var(--logo-aqua)] hover:text-foreground hover:bg-accent transition-all"
      >
        Повернутись на головну
      </Link>
    </div>
  );
}
