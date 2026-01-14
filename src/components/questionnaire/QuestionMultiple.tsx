'use client';

import { MultipleQuestion } from '@/types/questionnaire';

interface QuestionMultipleProps {
  question: MultipleQuestion;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function QuestionMultiple({ question, value, onChange }: QuestionMultipleProps) {
  const selectedIds = Array.isArray(value) ? value : [];
  const maxReached = !!(question.maxSelections && selectedIds.length >= question.maxSelections);

  const handleToggle = (optionId: string) => {
    if (selectedIds.includes(optionId)) {
      onChange(selectedIds.filter((id) => id !== optionId));
    } else if (!maxReached) {
      onChange([...selectedIds, optionId]);
    }
  };

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
              onClick={() => handleToggle(option.id)}
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