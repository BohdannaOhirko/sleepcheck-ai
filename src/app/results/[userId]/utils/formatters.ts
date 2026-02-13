import { Question } from '@/types/questionnaire';

export interface FormattedAnswer {
  question: Question;
  section: any;
  value: any;
}

export function formatAnswerValue(answer: FormattedAnswer): string {
  const { question, value } = answer;

  if (question.type === 'yesno') {
    return value === true || value === 'yes' ? 'Так' : 'Ні';
  }

  if (question.type === 'scale' && question.scale) {
    const label = question.scale.labels?.[value] || '';
    return `${value} / ${question.scale.max}${label ? ` (${label})` : ''}`;
  }

  if (question.type === 'numeric') {
    return `${value} ${question.unit || ''}`;
  }

  if (question.type === 'bmi' && typeof value === 'object') {
    const bmi = (value.weight / ((value.height / 100) ** 2)).toFixed(1);
    return `Вага: ${value.weight} кг, Зріст: ${value.height} см (ІМТ: ${bmi})`;
  }

  if (question.type === 'multiple' && Array.isArray(value)) {
    if (value.length === 0) return 'Нічого не обрано';
    
    const selectedOptions = question.options
      ?.filter((opt: any) => value.includes(opt.id))
      .map((opt: any) => opt.label)
      .join(', ');
    
    return selectedOptions || value.join(', ');
  }

  return String(value);
}

export function getFormattedAnswers(answers: Record<string, any>, sections: any[]): FormattedAnswer[] {
  const formatted: FormattedAnswer[] = [];

  sections.forEach((section) => {
    section.questions.forEach((question: any) => {
      const value = answers[question.id];
      if (value !== undefined) {
        formatted.push({
          question: question,
          section: section,
          value: value
        });
      }
    });
  });

  return formatted;
}