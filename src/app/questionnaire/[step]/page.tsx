'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';
import {
  QuestionScale,
  QuestionYesNo,
  QuestionMultiple,
  QuestionNumeric,
  QuestionBMI,
  NavigationButtons,
} from '@/components/questionnaire';
import AirwayModal from '@/components/questionnaire/AirwayModal';
import {
  isScaleQuestion,
  isYesNoQuestion,
  isMultipleQuestion,
  isNumericQuestion,
  isBMIQuestion,
  Question,
} from '@/types/questionnaire';
import { getIcon } from '@/lib/icons';

type AnswerValue = string | number | boolean | string[] | null;

export default function QuestionPage() {
  const params = useParams();
  const step = Number(params.step);
  const [showAirwayModal, setShowAirwayModal] = useState(false);

  const {
    questionsData,
    totalQuestions,
    totalPages,
    firstQuestionNumber,
    lastQuestionNumber,
    answers,
    updateAnswer,
    handleNext,
    handleBack,
    canProceed,
  } = useQuestionnaire(step);

  const calculateProgress = () => {
    try {
      const saved = localStorage.getItem('questionnaireAnswers');
      if (!saved) return { count: 0, percentage: 0 };
      
      const savedAnswers: Record<string, AnswerValue> = JSON.parse(saved);
      const validCount = Object.values(savedAnswers).filter(v => 
        v !== null && v !== undefined && v !== '' && 
        !(Array.isArray(v) && v.length === 0)
      ).length;
      
      return { 
        count: validCount, 
        percentage: (validCount / totalQuestions) * 100 
      };
    } catch {
      return { count: 0, percentage: 0 };
    }
  };

  const progress = calculateProgress();

  if (!questionsData || questionsData.length === 0) {
    return null;
  }

  const renderQuestion = (question: Question, answer: AnswerValue) => {
    if (isScaleQuestion(question)) {
      return (
        <QuestionScale 
          question={question} 
          value={answer} 
          onChange={(value) => updateAnswer(question.id, value)} 
        />
      );
    }

    if (isYesNoQuestion(question)) {
      return (
        <QuestionYesNo 
          question={question} 
          value={answer} 
          onChange={(value) => updateAnswer(question.id, value)} 
        />
      );
    }

    if (isMultipleQuestion(question)) {
      return (
        <QuestionMultiple 
          question={question} 
          value={answer} 
          onChange={(value) => updateAnswer(question.id, value)} 
        />
      );
    }

    if (isNumericQuestion(question)) {
      return (
        <QuestionNumeric 
          question={question} 
          value={answer} 
          onChange={(value) => updateAnswer(question.id, value)} 
        />
      );
    }

    if (isBMIQuestion(question)) {
      return (
        <QuestionBMI 
          question={question} 
          value={answer} 
          onChange={(value) => updateAnswer(question.id, value)} 
        />
      );
    }

    return <div>Невідомий тип питання</div>;
  };

  const hasBreathingPausesQuestion = questionsData.some(
    ({ question }) => question.id === 'breathing-pauses'
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getIcon(questionsData[0].section.icon || 'activity', 'w-6 h-6 text-blue-600')}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {questionsData[0].section.title}
            </h1>
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            Питання {firstQuestionNumber}-{lastQuestionNumber} з {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-2">
          Прогрес проходження: {progress.count}/{totalQuestions} ({Math.round(progress.percentage)}%)
        </p>
      </div>

      <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10">
        {hasBreathingPausesQuestion && (
          <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🫁</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-2">
                  Що таке зупинки дихання?
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Подивіться інтерактивну 3D візуалізацію обструктивного апное сну.
                </p>
                <button
                  onClick={() => setShowAirwayModal(true)}
                  className="group relative inline-flex items-center gap-2"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition"></div>
                  <span className="relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md flex items-center gap-2">
                    🔍 Показати 3D модель
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {questionsData.map(({ question }, index) => {
            const questionNumber = firstQuestionNumber + index;
            
            return (
              <div key={question.id} className="pb-8 border-b border-border last:border-b-0 last:pb-0">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                      {questionNumber}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Питання {questionNumber} з {totalQuestions}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {question.question}
                  </h2>
                  
                  {question.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">{question.subtitle}</p>
                  )}
                  
                  {question.hint && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      <span>ℹ️</span>
                      <span>{question.hint}</span>
                    </div>
                  )}
                </div>
                
                {renderQuestion(question, answers[question.id])}
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            canProceed={canProceed()}
            isFirstStep={step === 1}
            isLastStep={step === totalPages}
          />
        </div>
      </div>

      <AirwayModal isOpen={showAirwayModal} onClose={() => setShowAirwayModal(false)} />
    </div>
  );
}
