'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { analyzeAnswers } from '@/lib/scenarios';
import { AnalysisResult } from '@/types/scenarios';
import {
  UrgencyBlock,
  SymptomsList,
  ConditionsList,
  ScenarioCard,
  ExaminationsBlock,
  AdviceBlock,
  DisclaimerBlock
} from '@/components/scenarios';

export default function ScenariosPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const answersData = localStorage.getItem('questionnaireAnswers');
    
    if (!answersData) {
      setLoading(false);
      return;
    }
    
    try {
      const answers = JSON.parse(answersData);
      const result = analyzeAnswers(answers);
      setAnalysis(result);
    } catch (error) {
      console.error('Помилка аналізу:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Аналізуємо ваші відповіді...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold mb-2">Немає даних для аналізу</h2>
          <p className="text-gray-600 mb-6">Спочатку пройдіть анкету</p>
          <button
            onClick={() => router.push('/questionnaire')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Пройти тест
          </button>
        </div>
      </div>
    );
  }

  const { urgency, criticalSymptoms, possibleConditions, scenarios, personalizedAdvice } = analysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🔮 Медичний аналіз та прогноз</h1>
          <p className="text-gray-600">На основі ваших відповідей</p>
        </div>

        <UrgencyBlock urgency={urgency} />
        <SymptomsList symptoms={criticalSymptoms} />
        <ConditionsList conditions={possibleConditions} />
        <ScenarioCard scenarios={scenarios} />
        <ExaminationsBlock urgency={urgency} />
        <AdviceBlock advice={personalizedAdvice} />
        <DisclaimerBlock />

        <div className="flex gap-4">
          <Link 
            href="/results"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 text-center font-medium"
          >
            ← Назад до результатів
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            📄 Зберегти PDF
          </button>
        </div>

      </div>
    </div>
  );
}