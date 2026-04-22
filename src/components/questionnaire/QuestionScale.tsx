"use client";

import { ScaleQuestion } from "@/types/questionnaire";

interface QuestionScaleProps {
  question: ScaleQuestion;
  value: number;
  onChange: (value: number) => void;
}

export default function QuestionScale({
  question,
  value,
  onChange,
}: QuestionScaleProps) {
  const currentValue = value ?? question.default ?? question.scale.min;
  const labelValue = currentValue.toString();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num)) {
      onChange(Math.min(Math.max(num, question.scale.min), question.scale.max));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() =>
              onChange(
                Math.max(
                  currentValue - question.scale.step,
                  question.scale.min,
                ),
              )
            }
            className="w-10 h-10 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all flex items-center justify-center text-lg font-bold"
          >
            −
          </button>

          <input
            type="number"
            min={question.scale.min}
            max={question.scale.max}
            value={currentValue}
            onChange={handleInputChange}
            className="w-20 h-16 text-center text-4xl font-bold text-[var(--logo-green)] border-2 border-border rounded-xl focus:outline-none focus:border-[var(--logo-green)] bg-card"
          />
          <button
            onClick={() =>
              onChange(
                Math.min(
                  currentValue + question.scale.step,
                  question.scale.max,
                ),
              )
            }
            className="w-10 h-10 rounded-xl border-2 border-border hover:border-[var(--logo-green)] hover:bg-accent transition-all flex items-center justify-center text-lg font-bold"
          >
            +
          </button>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {question.scale.labels?.[labelValue] || ""}
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
        <span>
          {question.scale.labels?.[question.scale.min.toString()] ||
            question.scale.min}
        </span>
        <span>
          {question.scale.labels?.[question.scale.max.toString()] ||
            question.scale.max}
        </span>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        💡 Рухайте повзунок або натисніть ± для зміни значення
      </p>
    </div>
  );
}
