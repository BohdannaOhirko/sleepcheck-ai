'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTotalScore, calculateCategoryScores } from '@/lib/scoring/calculator';
import { determineRiskLevel, getRiskInfo } from '@/lib/scoring/risk-levels';
import { generateRecommendations } from '@/lib/scoring/recommendations';
import { supabase } from '@/lib/supabase/client';

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const saveToSupabase = async (answers: any, resultsData: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase
        .from('questionnaire_results')
        .insert({
          user_id: session.user.id,
          answers: answers,
          total_score: resultsData.score,
          risk_level: resultsData.riskLevel,
          recommendations: resultsData.recommendations,
          sleep_quality: resultsData.categories?.sleepQuality ?? null,
          fall_asleep_time: resultsData.categories?.fallAsleepTime ?? null,
          key_issues: [],
        });
    } catch (err) {
      console.error('Помилка збереження:', err);
    }
  };

  useEffect(() => {
    const answersData = localStorage.getItem('questionnaireAnswers');
    
    if (!answersData) {
      setLoading(false);
      return;
    }

    try {
      const answers = JSON.parse(answersData);
      const score = calculateTotalScore(answers);
      const riskLevel = determineRiskLevel(score);
      const riskInfo = getRiskInfo(riskLevel);
      const categories = calculateCategoryScores(answers);
      const recommendations = generateRecommendations(riskLevel, score, answers);

      const resultsData = {
        score,
        riskLevel,
        riskInfo,
        categories,
        recommendations,
      };

      setResults(resultsData);
      saveToSupabase(answers, resultsData);

    } catch (error) {
      console.error('Помилка:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl">Завантаження...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
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
    <div className="space-y-6 max-w-4xl mx-auto">
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Ваші результати</h1>
        <p className="text-gray-600">Аналіз ризику апное сну</p>
      </div>

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

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">💡 Рекомендації</h3>
        <div className="space-y-3">
          {recommendations.map((rec: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-600 text-xl">✓</span>
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => router.push('/scenarios')}
          className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          🔮 Сценарії майбутнього
        </button>
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
  );
}