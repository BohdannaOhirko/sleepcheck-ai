'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import questionnaireData from '@/data/questionnaire.json';

interface QuestionItem {
  id: string;
}

interface SectionItem {
  questions: QuestionItem[];
}

const QUESTIONS_PER_PAGE = 5;
const TOTAL_QUESTIONS = 30;

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [questionRange, setQuestionRange] = useState('');

  const calculateAnsweredQuestions = () => {
    try {
      const saved = localStorage.getItem('questionnaireAnswers');
      if (!saved) return 0;
      
      const answers: Record<string, unknown> = JSON.parse(saved);
      
      const allQuestionIds: string[] = [];
      (questionnaireData.sections as SectionItem[]).forEach((section) => {
        section.questions.forEach((q) => {
          allQuestionIds.push(q.id);
        });
      });
      
      const validAnswers = Object.entries(answers).filter(([key, value]) => {
        if (!allQuestionIds.includes(key)) return false;
        if (value === null || value === undefined || value === '') return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      });
      
      return validAnswers.length;
    } catch {
      return 0;
    }
  };

  const updateProgress = useCallback(() => {
    const stepMatch = pathname.match(/\/questionnaire\/(\d+)/);
    if (stepMatch) {
      const page = parseInt(stepMatch[1]);
      
      const firstQuestion = (page - 1) * QUESTIONS_PER_PAGE + 1;
      const lastQuestion = Math.min(page * QUESTIONS_PER_PAGE, TOTAL_QUESTIONS);
      
      setQuestionRange(`${firstQuestion}-${lastQuestion}`);
      
      const answered = calculateAnsweredQuestions();
      setAnsweredCount(answered);
      setProgress((answered / TOTAL_QUESTIONS) * 100);
    } else if (pathname === '/questionnaire/results') {
      setAnsweredCount(TOTAL_QUESTIONS);
      setQuestionRange(`${TOTAL_QUESTIONS}`);
      setProgress(100);
    } else {
      setAnsweredCount(0);
      setQuestionRange('');
      setProgress(0);
    }
  }, [pathname]);

  useEffect(() => {
    updateProgress();

    const handleQuestionnaireUpdate = () => {
      updateProgress();
    };

    window.addEventListener('questionnaire-updated', handleQuestionnaireUpdate);

    return () => {
      window.removeEventListener('questionnaire-updated', handleQuestionnaireUpdate);
    };
  }, [updateProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-aqua)] flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Анкета сну</h2>
                <p className="text-xs text-muted-foreground">
                  {questionRange 
                    ? `Питання ${questionRange} з ${TOTAL_QUESTIONS}` 
                    : 'Почнемо перевірку'
                  }
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-accent"
              aria-label="Вийти"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Прогрес проходження</span>
            <span className="font-semibold text-[var(--logo-green)]">
              {answeredCount}/{TOTAL_QUESTIONS} ({Math.round(progress)}%)
            </span>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-8 lg:py-12">
        {children}
      </main>
      <footer className="py-8 border-t border-border mt-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center text-sm text-muted-foreground space-y-3">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-[var(--logo-green)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Ваші відповіді конфіденційні</span>
            </div>
            <p>© {new Date().getFullYear()} Медичний центр &quot;Ехокор&quot;</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
