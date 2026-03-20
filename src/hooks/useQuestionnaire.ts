import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questionnaireData from '@/data/questionnaire.json';
import { Question, Section, getQuestionDefault } from '@/types/questionnaire';

const QUESTIONS_PER_PAGE = 5;

export function useQuestionnaire(step: number) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isClient, setIsClient] = useState(false);

  // Визначаємо що ми на клієнті
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getAllQuestions = (): Array<{ question: Question; section: Section }> => {
    const allQuestions: Array<{ question: Question; section: Section }> = [];
    for (const section of questionnaireData.sections) {
      for (const question of section.questions) {
        allQuestions.push({
          question: question as Question,
          section: section as Section,
        });
      }
    }
    return allQuestions;
  };

  const getQuestionsForPage = (pageNumber: number) => {
    const allQuestions = getAllQuestions();
    const startIndex = (pageNumber - 1) * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return allQuestions.slice(startIndex, endIndex);
  };

  const allQuestions = getAllQuestions();
  const totalQuestions = allQuestions.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const questionsData = getQuestionsForPage(step);

  const firstQuestionNumber = (step - 1) * QUESTIONS_PER_PAGE + 1;
  const lastQuestionNumber = Math.min(step * QUESTIONS_PER_PAGE, totalQuestions);

  useEffect(() => {
    if (step > totalPages || step < 1) {
      router.push('/questionnaire/results');
    }
  }, [step, totalPages, router]);

  // Завантажити збережені відповіді — тільки на клієнті
  useEffect(() => {
    if (!isClient) return;
    try {
      const saved = localStorage.getItem('questionnaireAnswers');
      const currentAnswers: Record<string, any> = saved ? JSON.parse(saved) : {};

      questionsData.forEach(({ question }) => {
        if (currentAnswers[question.id] === undefined || currentAnswers[question.id] === null) {
          currentAnswers[question.id] = getQuestionDefault(question);
        }
      });

      setAnswers(currentAnswers);
    } catch (error) {
      console.error('Error loading answers:', error);
      setAnswers({});
    }
  }, [isClient]);

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Підрахунок прогресу — безпечно для SSR
  const calculateProgress = () => {
    if (!isClient) return { count: 0, percentage: 0 };
    try {
      const saved = localStorage.getItem('questionnaireAnswers');
      if (!saved) return { count: 0, percentage: 0 };

      const savedAnswers = JSON.parse(saved);
      const validCount = Object.values(savedAnswers).filter(v =>
        v !== null && v !== undefined && v !== '' &&
        !(Array.isArray(v) && (v as any[]).length === 0)
      ).length;

      return {
        count: validCount,
        percentage: (validCount / totalQuestions) * 100,
      };
    } catch {
      return { count: 0, percentage: 0 };
    }
  };

  const handleNext = () => {
    const saved = localStorage.getItem('questionnaireAnswers') || '{}';
    const allAnswers = JSON.parse(saved);

    Object.keys(answers).forEach(questionId => {
      allAnswers[questionId] = answers[questionId];
    });

    localStorage.setItem('questionnaireAnswers', JSON.stringify(allAnswers));
    window.dispatchEvent(new Event('questionnaire-updated'));

    if (step < totalPages) {
      router.push(`/questionnaire/${step + 1}`);
    } else {
      router.push('/results/user123');
    }
  };

  const handleBack = () => {
    const saved = localStorage.getItem('questionnaireAnswers') || '{}';
    const allAnswers = JSON.parse(saved);
    Object.keys(answers).forEach(questionId => {
      allAnswers[questionId] = answers[questionId];
    });
    localStorage.setItem('questionnaireAnswers', JSON.stringify(allAnswers));
    window.dispatchEvent(new Event('questionnaire-updated'));

    if (step > 1) {
      router.push(`/questionnaire/${step - 1}`);
    } else {
      router.push('/questionnaire');
    }
  };

  const canProceed = () => {
    return questionsData.every(({ question }) => {
      const answer = answers[question.id];
      if (answer === null || answer === undefined) return false;
      if (Array.isArray(answer) && answer.length === 0) return false;
      if (answer === '') return false;
      return true;
    });
  };

  return {
    questionsData,
    totalQuestions,
    totalPages,
    currentPage: step,
    firstQuestionNumber,
    lastQuestionNumber,
    answers,
    updateAnswer,
    handleNext,
    handleBack,
    canProceed,
    calculateProgress,
  };
}