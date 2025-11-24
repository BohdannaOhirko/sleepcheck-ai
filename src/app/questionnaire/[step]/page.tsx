// app/questionnaire/[step]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import questionnaireData from '../../../data/questionnaire.json';
import { 
  Question, 
  Section,
  isScaleQuestion, 
  isYesNoQuestion, 
  isMultipleQuestion, 
  isNumericQuestion, 
  isBMIQuestion,
  getQuestionDefault
} from '../../../types/questionnaire';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const step = Number(params.step);
  const [answer, setAnswer] = useState<any>(null);

  // Знайти питання за номером кроку
  const getQuestionByStep = (stepNumber: number): { question: Question; section: Section } | null => {
    let currentStep = 0;
    
    for (const section of questionnaireData.sections) {
      for (const question of section.questions) {
        currentStep++;
        if (currentStep === stepNumber) {
          return { 
            question: question as Question, 
            section: section as Section 
          };
        }
      }
    }
    return null;
  };

  const questionData = getQuestionByStep(step);
  
  // Якщо питання не знайдено - редирект
  useEffect(() => {
    if (!questionData) {
      router.push('/questionnaire/results');
    }
  }, [questionData, router]);

  if (!questionData) {
    return null;
  }

  const { question, section } = questionData;
  const totalQuestions = questionnaireData.metadata.totalQuestions;

  // Ініціалізація дефолтного значення
  useEffect(() => {
    if (answer === null) {
      const defaultValue = getQuestionDefault(question);
      setAnswer(defaultValue);
    }
  }, [question, answer]);

 const handleNext = () => {
  // Отримати збережені відповіді
  const saved = localStorage.getItem('questionnaireAnswers') || '{}';
  const allAnswers = JSON.parse(saved);
  
  // Додати поточну відповідь
  allAnswers[question.id] = answer;
  
  // Зберегти
  localStorage.setItem('questionnaireAnswers', JSON.stringify(allAnswers));
  
  if (step < totalQuestions) {
    router.push(`/questionnaire/${step + 1}`);
  } else {
    router.push('/results/user123');
  }
};




  const handleBack = () => {
    if (step > 1) {
      router.push(`/questionnaire/${step - 1}`);
    } else {
      router.push('/questionnaire');
    }
  };

  // Перевірка чи можна йти далі
  const canProceed = () => {
    if (answer === null || answer === undefined) return false;
    if (isMultipleQuestion(question) && Array.isArray(answer) && answer.length === 0) return false;
    if (answer === '') return false;
    return true;
  };

  // Рендер питання BMI
  const renderBMI = () => {
    if (!isBMIQuestion(question)) return null;
    
    const weight = answer?.weight || 70;
    const height = answer?.height || 170;
    
    // Розрахунок ІМТ
    const bmi = weight / Math.pow(height / 100, 2);
    
    const getBMICategory = (bmiValue: number) => {
      if (bmiValue < 18.5) return { label: 'Недостатня вага', color: 'text-blue-500' };
      if (bmiValue < 25) return { label: 'Нормальна вага', color: 'text-[var(--logo-green)]' };
      if (bmiValue < 30) return { label: 'Надлишкова вага', color: 'text-yellow-500' };
      return { label: 'Ожиріння', color: 'text-orange-500' };
    };
    
    const category = getBMICategory(bmi);
    
    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Вага */}
          <div className="bg-card border-2 border-border rounded-xl p-6 hover:border-[var(--logo-green)] transition-all">
            <label className="text-sm text-muted-foreground mb-3 block">
              {question.fields.weight.label}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={question.fields.weight.min}
                max={question.fields.weight.max}
                value={weight}
                onChange={(e) => setAnswer({ ...answer, weight: Number(e.target.value) })}
                className="flex-1 text-3xl font-bold bg-transparent focus:outline-none"
              />
              <span className="text-lg text-muted-foreground">{question.fields.weight.unit}</span>
            </div>
            <input
              type="range"
              min={question.fields.weight.min}
              max={question.fields.weight.max}
              value={weight}
              onChange={(e) => setAnswer({ ...answer, weight: Number(e.target.value) })}
              className="w-full mt-4"
            />
          </div>

          {/* Зріст */}
          <div className="bg-card border-2 border-border rounded-xl p-6 hover:border-[var(--logo-aqua)] transition-all">
            <label className="text-sm text-muted-foreground mb-3 block">
              {question.fields.height.label}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={question.fields.height.min}
                max={question.fields.height.max}
                value={height}
                onChange={(e) => setAnswer({ ...answer, height: Number(e.target.value) })}
                className="flex-1 text-3xl font-bold bg-transparent focus:outline-none"
              />
              <span className="text-lg text-muted-foreground">{question.fields.height.unit}</span>
            </div>
            <input
              type="range"
              min={question.fields.height.min}
              max={question.fields.height.max}
              value={height}
              onChange={(e) => setAnswer({ ...answer, height: Number(e.target.value) })}
              className="w-full mt-4"
            />
          </div>
        </div>

        {/* Результат ІМТ */}
        {bmi > 0 && (
          <div className="bg-gradient-to-br from-accent to-accent/50 rounded-2xl p-6 border border-border">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Ваш індекс маси тіла (ІМТ)</div>
              <div className="text-5xl font-bold mb-3">
                <span className={category.color}>{bmi.toFixed(1)}</span>
              </div>
              <div className={`text-xl font-semibold mb-2 ${category.color}`}>
                {category.label}
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              💡 ІМТ ≥ 30 підвищує ризик апное сну
            </div>
          </div>
        )}
      </div>
    );
  };

  // Рендер питання в залежності від типу
  const renderQuestion = () => {
    // Scale Question
    if (isScaleQuestion(question)) {
      const currentValue = answer ?? (question.default ?? question.scale.min);
      const labelValue = currentValue.toString();
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-aqua)] bg-clip-text text-transparent">
              {currentValue}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {question.scale.labels?.[labelValue] || ''}
            </div>
          </div>
          <div className="relative">
            <input
              type="range"
              min={question.scale.min}
              max={question.scale.max}
              step={question.scale.step}
              value={currentValue}
              onChange={(e) => setAnswer(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[var(--logo-green)]"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>{question.scale.labels?.[question.scale.min.toString()] || question.scale.min}</span>
            <span>{question.scale.labels?.[question.scale.max.toString()] || question.scale.max}</span>
          </div>
        </div>
      );
    }

    // YesNo Question
    if (isYesNoQuestion(question)) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setAnswer('yes')}
            className={`p-8 rounded-2xl border-2 transition-all ${
              answer === 'yes'
                ? 'border-[var(--logo-green)] bg-[var(--logo-green)]/10 scale-105'
                : 'border-border hover:border-[var(--logo-green)] hover:bg-accent'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                answer === 'yes' ? 'bg-[var(--logo-green)] text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className={`text-2xl font-bold ${answer === 'yes' ? 'text-[var(--logo-green)]' : 'text-foreground'}`}>
                Так
              </div>
            </div>
          </button>
          <button
            onClick={() => setAnswer('no')}
            className={`p-8 rounded-2xl border-2 transition-all ${
              answer === 'no'
                ? 'border-[var(--logo-aqua)] bg-[var(--logo-aqua)]/10 scale-105'
                : 'border-border hover:border-[var(--logo-aqua)] hover:bg-accent'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                answer === 'no' ? 'bg-[var(--logo-aqua)] text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className={`text-2xl font-bold ${answer === 'no' ? 'text-[var(--logo-aqua)]' : 'text-foreground'}`}>
                Ні
              </div>
            </div>
          </button>
        </div>
      );
    }

    // Multiple Question
    if (isMultipleQuestion(question)) {
     const selectedIds = Array.isArray(answer) ? answer : [];
     const maxReached = !!(question.maxSelections && selectedIds.length >= question.maxSelections);
      
      return (
        <div className="space-y-4">
          {question.maxSelections && (
            <div className="text-sm text-muted-foreground text-center pb-2">
              Оберіть до {question.maxSelections} варіантів • Вибрано: {selectedIds.length}/{question.maxSelections}
            </div>
          )}
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedIds.includes(option.id);
              const isDisabled = !isSelected && maxReached;
              
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (isSelected) {
                      setAnswer(selectedIds.filter((id: string) => id !== option.id));
                    } else if (!isDisabled) {
                      setAnswer([...selectedIds, option.id]);
                    }
                  }}
                  disabled={isDisabled}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? option.positive
                        ? 'border-[var(--logo-green)] bg-[var(--logo-green)]/10 scale-[1.02]'
                        : 'border-[var(--logo-aqua)] bg-[var(--logo-aqua)]/10 scale-[1.02]'
                      : 'border-border hover:border-[var(--logo-light)] hover:bg-accent'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? option.positive
                          ? 'border-[var(--logo-green)] bg-[var(--logo-green)]'
                          : 'border-[var(--logo-aqua)] bg-[var(--logo-aqua)]'
                        : 'border-border'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {option.icon && <span className="text-2xl">{option.icon}</span>}
                    <div className="flex-1 font-medium">{option.label}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Numeric Question
    if (isNumericQuestion(question)) {
      const numValue = answer ?? (question.default ?? question.min);
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setAnswer(Math.max(numValue - 1, question.min))}
              className="w-14 h-14 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <div className="relative">
              <input
                type="number"
                min={question.min}
                max={question.max}
                value={numValue}
                onChange={(e) => setAnswer(Number(e.target.value))}
                className="w-32 h-20 text-center text-4xl font-bold bg-card border-2 border-border rounded-xl focus:border-[var(--logo-green)] focus:outline-none"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
                {question.unit}
              </div>
            </div>
            <button
              onClick={() => setAnswer(Math.min(numValue + 1, question.max))}
              className="w-14 h-14 rounded-xl border-2 border-border hover:border-[var(--logo-green)] hover:bg-accent transition-all flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-8">
            від {question.min} до {question.max} {question.unit}
          </div>
        </div>
      );
    }

    // BMI Question
    if (isBMIQuestion(question)) {
      return renderBMI();
    }

    return <div>Невідомий тип питання</div>;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Заголовок секції */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-3">
          <span className="text-lg">
            {section.icon === 'moon' && '🌙'}
            {section.icon === 'sun' && '☀️'}
            {section.icon === 'heart' && '❤️'}
            {section.icon === 'users' && '👥'}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{section.title}</span>
        </div>
        {section.subtitle && (
          <p className="text-sm text-muted-foreground">{section.subtitle}</p>
        )}
      </div>

      {/* Контейнер питання */}
      <div className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10">
        
        {/* Номер питання */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-[var(--logo-green)]">
            Питання {step} з {totalQuestions}
          </span>
          {question.critical && (
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold">
              Важливе
            </span>
          )}
        </div>

        {/* Текст питання */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {question.question}
          </h2>
          {question.subtitle && (
            <p className="text-base text-muted-foreground mb-2">
              {question.subtitle}
            </p>
          )}
          {question.hint && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/50 border border-border/50 mt-4">
              <svg className="w-5 h-5 text-[var(--logo-aqua)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-muted-foreground">{question.hint}</p>
            </div>
          )}
        </div>

        {/* Компонент питання */}
        <div className="mb-8">
          {renderQuestion()}
        </div>

        {/* Навігація */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Назад</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-aqua)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {step < totalQuestions ? 'Далі' : 'Завершити'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {!canProceed() && (
          <div className="mt-4 text-center text-sm text-muted-foreground animate-pulse">
            Оберіть відповідь, щоб продовжити
          </div>
        )}
      </div>
    </div>
  );
}