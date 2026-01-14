'use client';

import { ScaleQuestion } from '@/types/questionnaire';

interface QuestionScaleProps {
  question: ScaleQuestion;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionScale({ question, value, onChange }: QuestionScaleProps) {
  const currentValue = value ?? (question.default ?? question.scale.min);
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
          onChange={(e) => onChange(Number(e.target.value))}
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