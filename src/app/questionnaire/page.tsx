'use client';

import Link from 'next/link';

export default function QuestionnairePage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Головний контейнер */}
      <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-12">
        
        {/* Іконка */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Glow ефект */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-aqua)] rounded-full blur-xl opacity-30"></div>
            {/* Іконка */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-[var(--logo-green)] to-[var(--logo-aqua)] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-aqua)] bg-clip-text text-transparent">
            Перевірте свій сон
          </span>
        </h1>

        <p className="text-lg text-center text-muted-foreground mb-8">
          Пройдіть швидку анкету та дізнайтесь про ризики розладів сну
        </p>

        {/* Переваги */}
        <div className="space-y-4 mb-8">
          {/* Перевага 1 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--logo-green)]/10 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-[var(--logo-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Займає 2-5 хвилин</h3>
              <p className="text-sm text-muted-foreground">30 простих питань про ваш сон та самопочуття</p>
            </div>
          </div>

          {/* Перевага 2 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--logo-aqua)]/10 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-[var(--logo-aqua)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Повністю конфіденційно</h3>
              <p className="text-sm text-muted-foreground">Без реєстрації, дані зберігаються локально</p>
            </div>
          </div>

          {/* Перевага 3 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--logo-lime)]/10 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-[var(--logo-lime)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">AI-аналіз результатів</h3>
              <p className="text-sm text-muted-foreground">Персоналізовані рекомендації від асистента-сомнолога</p>
            </div>
          </div>
        </div>

        {/* Важлива інформація */}
        <div className="bg-accent/50 border border-border rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[var(--logo-default)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Важливо знати:</p>
              <p>Ця анкета не замінює медичну консультацію. Результати допоможуть оцінити ризики, але остаточний діагноз встановлює тільки лікар.</p>
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="space-y-3">
          {/* Кнопка "Почати анкету" */}
          <Link 
            href="/questionnaire/1"
            className="group relative block w-full"
          >
            {/* Glow ефект */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] rounded-xl blur opacity-25 group-hover:opacity-40 transition"></div>
            {/* Кнопка */}
            <button className="relative w-full px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
              <span className="flex items-center justify-center gap-2">
                Почати анкету
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>

          {/* Кнопка "Повернутись назад" */}
          <Link 
            href="/"
            className="block w-full px-8 py-4 rounded-xl font-semibold text-lg border-2 border-border bg-card hover:border-[var(--logo-aqua)] hover:bg-accent transition-all duration-300 text-center"
          >
            Повернутись назад
          </Link>
        </div>
            </div>
            </div>
  );
}


