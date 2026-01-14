'use client';

import { BMIQuestion } from '@/types/questionnaire';

interface QuestionBMIProps {
  question: BMIQuestion;
  value: { weight: number; height: number };
  onChange: (value: { weight: number; height: number }) => void;
}

export default function QuestionBMI({ question, value, onChange }: QuestionBMIProps) {
  const weight = value?.weight || 70;
  const height = value?.height || 170;

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
              onChange={(e) => onChange({ ...value, weight: Number(e.target.value) })}
              className="flex-1 text-3xl font-bold bg-transparent focus:outline-none"
            />
            <span className="text-lg text-muted-foreground">{question.fields.weight.unit}</span>
          </div>
          <input
            type="range"
            min={question.fields.weight.min}
            max={question.fields.weight.max}
            value={weight}
            onChange={(e) => onChange({ ...value, weight: Number(e.target.value) })}
            className="w-full mt-4"
          />
        </div>

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
              onChange={(e) => onChange({ ...value, height: Number(e.target.value) })}
              className="flex-1 text-3xl font-bold bg-transparent focus:outline-none"
            />
            <span className="text-lg text-muted-foreground">{question.fields.height.unit}</span>
          </div>
          <input
            type="range"
            min={question.fields.height.min}
            max={question.fields.height.max}
            value={height}
            onChange={(e) => onChange({ ...value, height: Number(e.target.value) })}
            className="w-full mt-4"
          />
        </div>
      </div>

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
}