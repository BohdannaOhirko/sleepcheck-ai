'use client';

import { NumericQuestion } from '@/types/questionnaire';

interface QuestionNumericProps {
  question: NumericQuestion;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionNumeric({ question, value, onChange }: QuestionNumericProps) {
  const numValue = value ?? (question.default ?? question.min);

  const handleIncrement = () => {
    onChange(Math.min(numValue + 1, question.max));
  };

  const handleDecrement = () => {
    onChange(Math.max(numValue - 1, question.min));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
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
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-32 h-20 text-center text-4xl font-bold bg-card border-2 border-border rounded-xl focus:border-[var(--logo-green)] focus:outline-none"
          />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
            {question.unit}
          </div>
        </div>

        <button
          onClick={handleIncrement}
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