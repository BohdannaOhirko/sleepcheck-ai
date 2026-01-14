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
  QuestionHeader,
  NavigationButtons,
} from '@/components/questionnaire';
import AirwayModal from '@/components/questionnaire/AirwayModal';
import {
  isScaleQuestion,
  isYesNoQuestion,
  isMultipleQuestion,
  isNumericQuestion,
  isBMIQuestion,
} from '@/types/questionnaire';

export default function QuestionPage() {
  const params = useParams();
  const step = Number(params.step);
  const [showAirwayModal, setShowAirwayModal] = useState(false);

  const {
    questionData,
    totalQuestions,
    answer,
    setAnswer,
    handleNext,
    handleBack,
    canProceed,
  } = useQuestionnaire(step);

  if (!questionData) {
    return null;
  }

  const { question, section } = questionData;

  // Показувати 3D візуалізацію на питанні про зупинки дихання (крок 9)
  const shouldShow3DButton = question.id === 'breathing-pauses';

  const renderQuestion = () => {
    if (isScaleQuestion(question)) {
      return <QuestionScale question={question} value={answer} onChange={setAnswer} />;
    }

    if (isYesNoQuestion(question)) {
      return <QuestionYesNo question={question} value={answer} onChange={setAnswer} />;
    }

    if (isMultipleQuestion(question)) {
      return <QuestionMultiple question={question} value={answer} onChange={setAnswer} />;
    }

    if (isNumericQuestion(question)) {
      return <QuestionNumeric question={question} value={answer} onChange={setAnswer} />;
    }

    if (isBMIQuestion(question)) {
      return <QuestionBMI question={question} value={answer} onChange={setAnswer} />;
    }

    return <div>Невідомий тип питання</div>;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <QuestionHeader
        section={section}
        question={question}
        currentStep={step}
        totalSteps={totalQuestions}
      />

      <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10">
        
        {/* Кнопка для 3D візуалізації */}
        {shouldShow3DButton && (
          <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  {/* Glow ефект */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
                  {/* Іконка */}
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
                  Ви побачите як дихальні шляхи блокуються під час сну.
                </p>
                <button
                  onClick={() => setShowAirwayModal(true)}
                  className="group relative inline-flex items-center gap-2"
                >
                  {/* Glow ефект кнопки */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition"></div>
                  {/* Кнопка */}
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

        <div className="mb-8">{renderQuestion()}</div>

        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          canProceed={canProceed()}
          isFirstStep={step === 1}
          isLastStep={step === totalQuestions}
        />
      </div>

      {/* Модальне вікно з 3D */}
      <AirwayModal 
        isOpen={showAirwayModal} 
        onClose={() => setShowAirwayModal(false)} 
      />
    </div>
  );
}