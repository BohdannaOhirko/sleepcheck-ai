"use client";

import Link from "next/link";

interface ResultDetailProps {
  result: Record<string, unknown>;
}

export default function ResultDetail({ result }: ResultDetailProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "Дуже високий":
      case "Високий":
        return "bg-red-100 text-red-800 border-red-200";
      case "Середній":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Низький":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const riskLevel = result.risk_level as string;
  const totalScore = result.total_score as number;
  const keyIssues = result.key_issues as string[] | undefined;
  const fallAsleepTime = result.fall_asleep_time as number | undefined;
  const sleepQuality = result.sleep_quality as number | undefined;
  const recommendations = result.recommendations as string[] | undefined;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
      {/* Рівень ризику */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Рівень ризику апное</h2>
        <div
          className={`inline-block px-6 py-3 rounded-xl border-2 font-semibold text-lg ${getRiskColor(riskLevel)}`}
        >
          {riskLevel}
        </div>
        <p className="text-gray-600 mt-4">Загальний бал: {totalScore}</p>
      </div>

      {/* Основні проблеми */}
      {keyIssues && keyIssues.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Виявлені проблеми</h2>
          <ul className="space-y-2">
            {keyIssues.map((issue, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Показники */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Показники сну</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fallAsleepTime && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Час засинання</p>
              <p className="text-2xl font-bold text-gray-900">
                {fallAsleepTime} хв
              </p>
            </div>
          )}
          {sleepQuality && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Якість сну</p>
              <p className="text-2xl font-bold text-gray-900">
                {sleepQuality}/10
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Рекомендації */}
      {recommendations && recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Рекомендації</h2>
          <ul className="space-y-3">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Дії */}
      <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-8 border border-green-100">
        <h2 className="text-xl font-semibold mb-4">Наступні кроки</h2>
        <p className="text-gray-700 mb-6">
          {riskLevel === "Високий" || riskLevel === "Дуже високий"
            ? "Рекомендуємо звернутися до лікаря-сомнолога для детальної консультації."
            : "Ви можете записатися на консультацію для додаткових рекомендацій."}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contacts"
            className="px-6 py-3 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Записатися на консультацію
          </Link>
          <Link
            href="/questionnaire"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
          >
            Пройти анкету знову
          </Link>
        </div>
      </div>
    </div>
  );
}
