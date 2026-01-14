'use client';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function NavigationButtons({
  onBack,
  onNext,
  canProceed,
  isFirstStep,
  isLastStep,
}: NavigationButtonsProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl border-2 border-border hover:border-[var(--logo-aqua)] hover:bg-accent transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Назад</span>
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-aqua)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isLastStep ? 'Завершити' : 'Далі'}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {!canProceed && (
        <div className="text-center text-sm text-muted-foreground animate-pulse">
          Оберіть відповідь, щоб продовжити
        </div>
      )}
    </div>
  );
}