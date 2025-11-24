'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTotalScore, calculateCategoryScores } from '@/lib/scoring/calculator';
import { determineRiskLevel, getRiskInfo } from '@/lib/scoring/risk-levels';
import { generateRecommendations } from '@/lib/scoring/recommendations';

// Типи для результатів
interface CategoryScores {
  sleepQuality: number;
  symptoms: number;
  daytimeFunctioning: number;
  healthFactors: number;
}

interface RiskInfo {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  range: string;
}

interface QuestionnaireResults {
  score: number;
  riskLevel: string;
  riskInfo: RiskInfo;
  categories: CategoryScores;
  recommendations: string[];
  answers: Record<string, number | string>;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuestionnaireResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    try {
      const answersData = localStorage.getItem('questionnaireAnswers');
      console.log('answersData:', answersData);

      if (!answersData) {
        console.log('Немає даних!');
        setLoading(false);
        return;
      }

      const answers = JSON.parse(answersData);
      const score = calculateTotalScore(answers);
      const riskLevel = determineRiskLevel(score);
      const riskInfo = getRiskInfo(riskLevel);
      const categories = calculateCategoryScores(answers);
      const recommendations = generateRecommendations(riskLevel, score, answers);

      setResults({
        score,
        riskLevel,
        riskInfo,
        categories,
        recommendations,
        answers
      });
    } catch (error) {
      console.error('Помилка:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🌙</div>
          <h2 className="text-2xl font-semibold mb-2">Немає результатів</h2>
          <p className="text-gray-600 mb-6">Спочатку пройдіть анкету</p>
          <button
            onClick={() => router.push('/questionnaire/1')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Пройти тест
          </button>
        </div>
      </div>
    );
  }

  const { score, riskInfo, categories, recommendations } = results;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Ваші результати</h1>
          <p className="text-gray-600">Аналіз ризику апное сну</p>
        </div>

        {/* Основний результат */}
        <div className={`${riskInfo.bgColor} border-l-4 ${riskInfo.borderColor} rounded-lg p-8`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{riskInfo.icon}</div>
            <div>
              <h2 className="text-3xl font-bold">{riskInfo.title}</h2>
              <p className="text-gray-700 mt-2">{riskInfo.range}</p>
            </div>
            <div className="ml-auto text-center">
              <div className="text-5xl font-bold">{score}</div>
              <div className="text-sm text-gray-600">балів</div>
            </div>
          </div>
          <p className="text-lg">{riskInfo.description}</p>
        </div>

        {/* Категорії */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">📊 Детальна розбивка</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🌙</div>
              <div className="text-sm text-gray-600">Якість сну</div>
              <div className="text-2xl font-bold">{categories.sleepQuality}/10</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">😴</div>
              <div className="text-sm text-gray-600">Симптоми</div>
              <div className="text-2xl font-bold">{categories.symptoms}/10</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">☀️</div>
              <div className="text-sm text-gray-600">Денне функціонування</div>
              <div className="text-2xl font-bold">{categories.daytimeFunctioning}/10</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">❤️</div>
              <div className="text-sm text-gray-600">Фактори здоров'я</div>
              <div className="text-2xl font-bold">{categories.healthFactors}/10</div>
            </div>
          </div>
        </div>

        {/* Рекомендації */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4">💡 Рекомендації</h3>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <span className="text-blue-600 text-xl">✓</span>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            📄 Роздрукувати
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('questionnaireAnswers');
              router.push('/questionnaire/1');
            }}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            🔄 Пройти знову
          </button>
        </div>

      </div>
    </div>
  );
}