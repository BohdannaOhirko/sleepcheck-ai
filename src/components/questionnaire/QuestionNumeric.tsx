"use client";

import { useState } from "react";
import { NumericQuestion } from "@/types/questionnaire";

interface QuestionNumericProps {
  question: NumericQuestion;
  value: number;
  onChange: (value: number) => void;
}

function NumberPicker({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState("");

  const handleClick = () => {
    setEditing(true);
    setInputVal(String(value));
  };

  const handleBlur = () => {
    setEditing(false);
    const num = parseInt(inputVal);
    if (!isNaN(num)) {
      onChange(Math.min(Math.max(num, min), max));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => onChange(Math.min(value + 1, max))}
        className="w-12 h-12 rounded-xl border-2 border-border hover:border-[var(--logo-green)] hover:bg-accent transition-all flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {editing ? (
        <input
          autoFocus
          type="number"
          min={min}
          max={max}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-20 h-16 text-center text-3xl font-bold bg-card border-2 border-[var(--logo-green)] rounded-xl focus:outline-none"
        />
      ) : (
        <button
          onClick={handleClick}
          className="w-20 h-16 text-center text-3xl font-bold bg-card border-2 border-border rounded-xl hover:border-[var(--logo-green)] transition-all"
          title="Натисніть щоб ввести вручну"
        >
          {String(value).padStart(2, "0")}
        </button>
      )}

      <button
        onClick={() => onChange(Math.max(value - 1, min))}
        className="w-12 h-12 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function QuestionNumeric({
  question,
  value,
  onChange,
}: QuestionNumericProps) {
  const isTime = question.unit === "година";

  const hours = isTime
    ? Math.floor((value || 2300) / 100)
    : (value ?? question.default ?? question.min);
  const minutes = isTime ? (value || 2300) % 100 : 0;

  const handleHours = (h: number) => onChange(h * 100 + minutes);
  const handleMinutes = (m: number) => onChange(hours * 100 + m);

  const handleIncrement = () =>
    onChange(
      Math.min((value ?? question.default ?? question.min) + 1, question.max),
    );
  const handleDecrement = () =>
    onChange(
      Math.max((value ?? question.default ?? question.min) - 1, question.min),
    );

  if (isTime) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <NumberPicker
            value={hours}
            min={0}
            max={23}
            onChange={handleHours}
            label="год"
          />
          <span className="text-4xl font-bold text-muted-foreground mb-4">
            :
          </span>
          <NumberPicker
            value={minutes}
            min={0}
            max={59}
            onChange={handleMinutes}
            label="хв"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          💡 Натисніть на число щоб ввести вручну
        </p>
        <div className="text-center text-sm text-muted-foreground">
          Час відходу до сну
        </div>
      </div>
    );
  }

  const numValue = value ?? question.default ?? question.min;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          className="w-14 h-14 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all flex items-center justify-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <div className="relative">
          <div className="w-32 h-20 text-center text-4xl font-bold bg-card border-2 border-border rounded-xl flex items-center justify-center">
            {numValue}
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap">
            {question.unit}
          </div>
        </div>
        <button
          onClick={handleIncrement}
          className="w-14 h-14 rounded-xl border-2 border-border hover:border-[var(--logo-green)] hover:bg-accent transition-all flex items-center justify-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      <div className="text-center text-sm text-muted-foreground mt-8">
        від {question.min} до {question.max} {question.unit}
      </div>
    </div>
  );
}
