import { Question } from '@/types/questionnaire';

interface QuestionOption {
  id: string;
  label: string;
}

interface ScaleQuestion extends Question {
  scale?: {
    max: number;
    labels?: Record<string, string>;
  };
}

interface BMIValue {
  weight: number;
  height: number;
}

export interface FormattedAnswer {
  question: Question;
  section: { id: string; title: string; icon?: string };
  value: unknown;
}

export function formatAnswerValue(answer: FormattedAnswer): string {
  const { question, value } = answer;

  if (question.type === 'yesno') {
    return value === true || value === 'yes' ? 'Так' : 'Ні';
  }

  if (question.type === 'scale') {
    const scaleQ = question as ScaleQuestion;
    if (scaleQ.scale) {
      const label = scaleQ.scale.labels?.[String(value)] || '';
      return `${value} / ${scaleQ.scale.max}${label ? ` (${label})` : ''}`;
    }
  }

  if (question.type === 'numeric') {
    return `${value} ${question.unit || ''}`;
  }

  if (question.type === 'bmi' && typeof value === 'object' && value !== null) {
    const bmiVal = value as BMIValue;
    const bmi = (bmiVal.weight / ((bmiVal.height / 100) ** 2)).toFixed(1);
    return `Вага: ${bmiVal.weight} кг, Зріст: ${bmiVal.height} см (ІМТ: ${bmi})`;
  }

  if (question.type === 'multiple' && Array.isArray(value)) {
    if (value.length === 0) return 'Нічого не обрано';
    
    const selectedOptions = (question.options as QuestionOption[] | undefined)
      ?.filter((opt) => value.includes(opt.id))
      .map((opt) => opt.label)
      .join(', ');
    
    return selectedOptions || value.join(', ');
  }

  return String(value);
}

export function getFormattedAnswers(
  answers: Record<string, unknown>,
  sections: Array<{ id: string; title: string; icon?: string; questions: Array<{ id: string }> }>
): FormattedAnswer[] {
  const formatted: FormattedAnswer[] = [];

  sections.forEach((section) => {
    section.questions.forEach((question) => {
      const value = answers[question.id];
      if (value !== undefined) {
        formatted.push({
          question: question as Question,
          section: section,
          value: value
        });
      }
    });
  });

  return formatted;
}
