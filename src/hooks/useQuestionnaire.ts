import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questionnaireData from '@/data/questionnaire.json';
import { Question, Section, getQuestionDefault } from '@/types/questionnaire';

const QUESTIONS_PER_PAGE = 5;

export function useQuestionnaire(step: number) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // Отримати всі питання як плоский масив
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

  // Отримати питання для поточної сторінки
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
  
  // Розрахунок номерів питань на поточній сторінці
  const firstQuestionNumber = (step - 1) * QUESTIONS_PER_PAGE + 1;
  const lastQuestionNumber = Math.min(step * QUESTIONS_PER_PAGE, totalQuestions);

  // Перевірка чи сторінка існує
  useEffect(() => {
    if (step > totalPages || step < 1) {
      router.push('/questionnaire/results');
    }
  }, [step, totalPages, router]);

  // Завантажити збережені відповіді - ОНОВЛЕНО
 // Завантажити збережені відповіді
useEffect(() => {
  try {
    const saved = localStorage.getItem('questionnaireAnswers');
    const currentAnswers: Record<string, any> = saved ? JSON.parse(saved) : {};
    
    // Ініціалізувати поточні питання дефолтними значеннями якщо їх немає
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
}, []);

  // Оновити відповідь для конкретного питання - ОНОВЛЕНО
 const updateAnswer = (questionId: string, value: any) => {
  setAnswers(prev => ({
    ...prev,
    [questionId]: value
  }));
};

  const handleNext = () => {
    // Зберегти всі відповіді
    const saved = localStorage.getItem('questionnaireAnswers') || '{}';
    const allAnswers = JSON.parse(saved);

    // Зберегти відповіді з поточної сторінки
    Object.keys(answers).forEach(questionId => {
      allAnswers[questionId] = answers[questionId];
    });

    localStorage.setItem('questionnaireAnswers', JSON.stringify(allAnswers));
    window.dispatchEvent(new Event('questionnaire-updated'));

    // Перейти на наступну сторінку або результати
    if (step < totalPages) {
      router.push(`/questionnaire/${step + 1}`);
    } else {
      router.push('/results/user123');
    }
  };

  const handleBack = () => {
    // Зберегти поточні відповіді перед поверненням
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
    // Перевірити чи всі питання на сторінці мають відповіді
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
  };
}