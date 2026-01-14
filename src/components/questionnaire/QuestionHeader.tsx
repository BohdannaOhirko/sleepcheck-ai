'use client';

import { Question, Section } from '@/types/questionnaire';

interface QuestionHeaderProps {
  section: Section;
  question: Question;
  currentStep: number;
  totalSteps: number;
}

export default function QuestionHeader({ section, question, currentStep, totalSteps }: QuestionHeaderProps) {
  const getSectionIcon = (icon?: string) => {
    if (!icon) return '📋';
    
    const icons: Record<string, string> = {
      moon: '🌙',
      sun: '☀️',
      heart: '❤️',
      users: '👥',
    };
    return icons[icon] ?? '📋';
  };

  return (
    <div className="mb-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-3">
        <span className="text-lg">{getSectionIcon(section.icon)}</span>
        <span className="text-sm font-medium text-muted-foreground">{section.title}</span>
      </div>
      {section.subtitle && (
        <p className="text-sm text-muted-foreground">{section.subtitle}</p>
      )}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--logo-green)]">
          Питання {currentStep} з {totalSteps}
        </span>
        {question.critical && (
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold">
            Важливе
          </span>
        )}
      </div>

      <div className="mt-6">
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
    </div>
  );
}