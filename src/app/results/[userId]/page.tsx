'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Тип для результату користувача
interface UserResult {
  userId: string;
  userName: string;
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  completedAt: string;
  answers: Record<string, any>;
  recommendations?: string[];
}

export default function UserResultPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  
  const [result, setResult] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, [userId]);

  const loadResult = () => {
  try {
    // Отримати відповіді з анкети
    const answersData = localStorage.getItem('questionnaireAnswers');
    if (!answersData) {
      setResult(null);
      setLoading(false);
      return;
    }

    const answers = JSON.parse(answersData);

    // Імпортуйте на початку файлу:
    // import { calculateTotalScore } from '@/lib/scoring/calculator';
    // import { determineRiskLevel, getRiskInfo as getInfo } from '@/lib/scoring/risk-levels';

    // Розрахувати бали
    const { calculateTotalScore } = require('@/lib/scoring/calculator');
    const { determineRiskLevel } = require('@/lib/scoring/risk-levels');
    
    const score = calculateTotalScore(answers);
    const risk = determineRiskLevel(score);

    // Створити результат
    const userResult: UserResult = {
      userId: userId,
      userName: 'Користувач',
      totalScore: score,
      riskLevel: risk === 'critical' ? 'high' : risk === 'moderate' ? 'medium' : 'low',
      completedAt: new Date().toISOString(),
      answers: answers,
      recommendations: [] // Додамо пізніше
    };

    setResult(userResult);
  } catch (error) {
    console.error('Помилка:', error);
    setResult(null);
  } finally {
    setLoading(false);
  }
};

  const getRiskInfo = (level: string) => {
    switch (level) {
      case 'low':
        return {
          color: 'bg-green-100 border-green-500 text-green-800',
          icon: '✅',
          title: 'Низький ризик апное',
          description: 'Ваші відповіді вказують на низьку ймовірність апное сну. Продовжуйте дотримуватися здорових звичок сну.'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 border-yellow-500 text-yellow-800',
          icon: '⚠️',
          title: 'Середній ризик апное',
          description: 'Деякі ознаки вказують на можливі проблеми зі сном. Рекомендуємо проконсультуватися з лікарем.'
        };
      case 'high':
        return {
          color: 'bg-red-100 border-red-500 text-red-800',
          icon: '🚨',
          title: 'Високий ризик апное',
          description: 'Ваші відповіді вказують на високу ймовірність апное сну. Настійно рекомендуємо звернутися до спеціаліста.'
        };
      default:
        return {
          color: 'bg-gray-100 border-gray-500 text-gray-800',
          icon: '❓',
          title: 'Невизначено',
          description: 'Не вдалося визначити рівень ризику.'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Результат не знайдено
            </h2>
            <p className="text-gray-600 mb-6">
              Не вдалося знайти результати для цього користувача
            </p>
            <button
              onClick={() => router.push('/results')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Повернутися до результатів
            </button>
          </div>
        </div>
      </div>
    );
  }

  const riskInfo = getRiskInfo(result.riskLevel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/results')}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
          >
            ← Повернутися до всіх результатів
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Персональні результати
          </h1>
          <p className="text-gray-600">
            {result.userName || 'Анонімний користувач'} • {new Date(result.completedAt).toLocaleDateString('uk-UA')}
          </p>
        </div>

        {/* Основний результат */}
        <div className={`${riskInfo.color} border-l-4 rounded-lg p-6 mb-6`}>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{riskInfo.icon}</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{riskInfo.title}</h2>
              <p className="text-lg mb-4">{riskInfo.description}</p>
              <div className="mt-4">
                <span className="text-3xl font-bold">{result.totalScore}</span>
                <span className="text-lg ml-2">балів</span>
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендації */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📋 Рекомендації
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Відповіді користувача */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📝 Ваші відповіді
          </h3>
          <div className="space-y-4">
            {Object.entries(result.answers).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="font-medium text-gray-700 mb-2">
                  Питання: {key}
                </div>
                <div className="text-gray-900 bg-gray-50 p-3 rounded">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопки дій */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            🖨️ Роздрукувати
          </button>
          <button
            onClick={() => router.push('/questionnaire/1')}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            🔄 Пройти знову
          </button>
        </div>
      </div>
    </div>
  );
}