"use client";

import { useState, useEffect } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";

interface ConsequencesBlockProps {
  riskLevel: "low" | "medium" | "high";
}

const stages = [
  {
    number: 1,
    period: "Найближчі місяці",
    emoji: "😔",
    gradient: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-200",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    dot: "bg-emerald-400",
    items: [
      "Постійна втома та сонливість протягом дня",
      "Зниження концентрації уваги та продуктивності",
      "Підвищена дратівливість та перепади настрою",
      "Головні болі, особливо після пробудження",
    ],
  },
  {
    number: 2,
    period: "Через 1–3 роки",
    emoji: "⚠️",
    gradient: "from-amber-400 to-orange-400",
    glow: "shadow-amber-200",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
    dot: "bg-amber-400",
    items: [
      "Розвиток або погіршення артеріальної гіпертензії",
      "Підвищений ризик цукрового діабету 2 типу",
      "Метаболічні порушення та набір зайвої ваги",
      "Зниження якості життя та працездатності",
    ],
  },
  {
    number: 3,
    period: "Через 5+ років",
    emoji: "🚨",
    gradient: "from-red-400 to-rose-500",
    glow: "shadow-red-200",
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-900",
    dot: "bg-red-400",
    items: [
      "Серцево-судинні захворювання (аритмія, серцева недостатність)",
      "Підвищений ризик інфаркту та інсульту у 3–4 рази",
      "Когнітивні порушення, погіршення пам'яті",
      "Скорочення очікуваної тривалості життя на 10–15 років",
    ],
  },
];

function StageCard({
  stage,
  index,
  active,
  onClick,
}: {
  stage: (typeof stages)[0];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <button
        onClick={onClick}
        className={`w-full text-left rounded-2xl border-2 overflow-hidden transition-all duration-300 print:border-gray-200 ${
          active
            ? `${stage.border} ${stage.bg} shadow-lg ${stage.glow}`
            : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md"
        }`}
      >
        {/* Градієнтна смужка зверху */}
        <div
          className={`h-1 w-full bg-gradient-to-r ${stage.gradient} transition-all duration-300 ${active ? "opacity-100" : "opacity-30"} print:opacity-100`}
        />

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.gradient} flex items-center justify-center shadow-md transition-all duration-300`}
              >
                <span className="text-lg">{stage.emoji}</span>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium">
                  Етап {stage.number}
                </div>
                <div
                  className={`font-bold text-sm ${active ? stage.text : "text-gray-700"} transition-colors duration-300`}
                >
                  {stage.period}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 print:hidden ${active ? "rotate-180" : ""}`}
            />
          </div>

          {/* Індикатори пунктів */}
          <div className="flex gap-1.5 mt-3 print:hidden">
            {stage.items.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${active ? stage.dot : "bg-gray-100"}`}
                style={{ transitionDelay: active ? `${i * 80}ms` : "0ms" }}
              />
            ))}
          </div>
        </div>

        {/* Розгорнутий контент */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out print:max-h-full print:overflow-visible ${active ? "max-h-96" : "max-h-0"}`}
        >
          <div className="px-5 pb-5">
            <div className="h-px bg-gray-100 mb-4" />
            <ul className="space-y-2.5">
              {stage.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600"
                  style={{ transitionDelay: active ? `${i * 60}ms` : "0ms" }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stage.dot} flex-shrink-0 mt-1.5`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </div>
  );
}

export function ConsequencesBlock({ riskLevel }: ConsequencesBlockProps) {
  const [active, setActive] = useState<number | null>(null);

  if (riskLevel === "low") return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          Можливі наслідки без лікування
        </h3>
        <p className="text-sm text-gray-400 print:hidden">
          Натисніть на етап щоб побачити деталі
        </p>
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <StageCard
            key={stage.number}
            stage={stage}
            index={index}
            active={active === stage.number}
            onClick={() =>
              setActive(active === stage.number ? null : stage.number)
            }
          />
        ))}
      </div>

      <div className="mt-6 rounded-2xl p-5 bg-gradient-to-r from-[var(--logo-green)]/5 to-[var(--logo-aqua)]/5 border border-[var(--logo-green)]/15">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--logo-green)] to-[var(--logo-aqua)] flex items-center justify-center flex-shrink-0 shadow">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Важлива інформація
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Своєчасна діагностика та лікування дозволяють запобігти більшості
              ускладнень. Ефективність терапії найвища при ранньому зверненні до
              спеціаліста.
            </p>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          .max-h-0 {
            max-height: none !important;
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
}
