import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import questionnaireData from '@/data/questionnaire.json';
import { Question, Section, getQuestionDefault } from '@/types/questionnaire';

export function useQuestionnaire(step: number) {
  const router = useRouter();
  const [answer, setAnswer] = useState<any>(null);

  const getQuestionByStep = (stepNumber: number): { question: Question; section: Section } | null => {
    let currentStep = 0;

    for (const section of questionnaireData.sections) {
      for (const question of section.questions) {
        currentStep++;
        if (currentStep === stepNumber) {
          return {
            question: question as Question,
            section: section as Section,
          };
        }
      }
    }
    return null;
  };

  const questionData = getQuestionByStep(step);
  const totalQuestions = questionnaireData.metadata.totalQuestions;

  useEffect(() => {
    if (!questionData) {
      router.push('/questionnaire/results');
    }
  }, [questionData, router]);

  useEffect(() => {
    if (questionData && answer === null) {
      const defaultValue = getQuestionDefault(questionData.question);
      setAnswer(defaultValue);
    }
  }, [questionData, answer]);

  const handleNext = () => {
    if (!questionData) return;

    const saved = localStorage.getItem('questionnaireAnswers') || '{}';
    const allAnswers = JSON.parse(saved);

    allAnswers[questionData.question.id] = answer;

    localStorage.setItem('questionnaireAnswers', JSON.stringify(allAnswers));

    if (step < totalQuestions) {
      router.push(`/questionnaire/${step + 1}`);
    } else {
      router.push('/results/user123');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      router.push(`/questionnaire/${step - 1}`);
    } else {
      router.push('/questionnaire');
    }
  };

  const canProceed = () => {
    if (answer === null || answer === undefined) return false;
    if (Array.isArray(answer) && answer.length === 0) return false;
    if (answer === '') return false;
    return true;
  };

  return {
    questionData,
    totalQuestions,
    answer,
    setAnswer,
    handleNext,
    handleBack,
    canProceed,
  };
}