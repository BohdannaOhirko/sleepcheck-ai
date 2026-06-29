"use client";
import Link from "next/link";

interface HeroContentProps {
  isVisible: boolean;
  onOpenChat?: () => void;
}

const featureCards = [
  {
    icon: "✓",
    color: "var(--logo-green)",
    bg: "#e8f7ed",
    title: "Безкоштовно",
    sub: "Онлайн анкета та базовий аналіз",
  },
  {
    icon: "◷",
    color: "var(--logo-aqua)",
    bg: "#e8f4fd",
    title: "5 хвилин",
    sub: "Швидкий AI‑аналіз та результат",
  },
  {
    icon: "⊘",
    color: "var(--logo-default)",
    bg: "#edf3fd",
    title: "Без реєстрації",
    sub: "Анонімно та конфіденційно",
  },
];

const socialProofItems = [
  "Розроблено сомнологами",
  "Клінічні протоколи",
  "Захист персональних даних",
];

export default function HeroContent({
  isVisible,
  onOpenChat,
}: HeroContentProps) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Бейдж */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 shadow-sm mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-sm font-medium text-gray-600">
          Медичний центр &quot;Ехокор&quot;
        </span>
      </div>

      {/* Заголовок */}
      <h1
        className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--logo-default), var(--logo-green))",
          }}
        >
          AI‑діагностика
        </span>
        <br />
        <span className="text-gray-900">розладів сну</span>
        <br />
        <span className="relative text-gray-900">
          за 5 хвилин
          <svg
            className="absolute -bottom-2 left-0 w-full"
            height="8"
            viewBox="0 0 300 8"
            fill="none"
          >
            <path
              d="M0 6 Q75 1 150 6 Q225 11 300 6"
              stroke="url(#ul)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="ul" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--logo-green)" />
                <stop offset="100%" stopColor="var(--logo-aqua)" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </h1>

      {/* Підзаголовок */}
      <p
        className={`text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        Перевірте ризик апное сну та інших розладів сну{" "}
        <span className="font-semibold text-gray-900">безкоштовно</span>.
        Персоналізований аналіз від{" "}
        <span className="font-semibold" style={{ color: "var(--logo-green)" }}>
          AI‑асистента сомнолога
        </span>
        .
      </p>

      {/* CTA кнопки */}
      <div
        className={`flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-center gap-3 mb-14 px-4 sm:px-0 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <Link href="/questionnaire" className="w-full sm:w-auto">
          <button
            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-white text-base overflow-hidden shadow-lg hover:shadow-xl hover:shadow-green-200 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--logo-green), #1a7a4a)",
            }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              Пройти анкету безкоштовно
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
            </span>
          </button>
        </Link>

        <button
          onClick={onOpenChat}
          className="group w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-gray-700 text-base bg-white border border-gray-200 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Консультація AI‑асистента
          </span>
        </button>
      </div>

      {/* Картки переваг */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {featureCards.map(({ icon, color, bg, title, sub }) => (
          <div
            key={title}
            className="group p-5 rounded-2xl bg-white border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg font-bold transition-transform group-hover:scale-110"
              style={{ background: bg, color }}
            >
              {icon}
            </div>
            <p className="font-bold text-gray-900 mb-1">{title}</p>
            <p className="text-xs text-gray-400 leading-relaxed">{sub}</p>
          </div>
        ))}
      </div>

      {/* Блок що таке апное */}
      <div
        className={`mt-10 p-6 rounded-2xl bg-white border border-gray-100 text-left max-w-2xl mx-auto transition-all duration-700 delay-450 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <h2 className="text-base font-bold text-gray-900 mb-2">
          Що таке апное сну?
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Апное сну — це зупинки дихання під час сну, які можуть траплятися
          десятки разів за ніч. Людина прокидається втомленою, хропе, відчуває
          сонливість вдень. Без лікування апное підвищує ризик гіпертонії,
          інфаркту та інсульту. Наш AI-тест допомагає визначити ризик за 5
          хвилин.
        </p>
      </div>

      {/* Соціальний доказ */}
      <div
        className={`mt-10 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="flex -space-x-1.5">
            {["#86efac", "#6ee7b7", "#34d399", "#10b981"].map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ background: c }}
              />
            ))}
          </div>
          <span>
            <strong className="text-gray-700">500+</strong> користувачів
            застосунку
          </span>
        </div>
        <div className="w-px h-4 bg-gray-200 hidden sm:block" />
        {socialProofItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-1.5 text-sm text-gray-400"
          >
            <svg
              className="w-3.5 h-3.5"
              style={{ color: "var(--logo-green)" }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
