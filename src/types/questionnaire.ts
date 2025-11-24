// types/questionnaire.ts

export type QuestionType = 'scale' | 'yesno' | 'multiple' | 'numeric' | 'bmi';

export type TriggerLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface ScaleLabels {
  [key: string]: string;
}

export interface Scale {
  min: number;
  max: number;
  step: number;
  labels?: ScaleLabels;
}

export interface Option {
  id: string;
  label: string;
  icon?: string;
  weight: number;
  positive?: boolean;
  trigger?: TriggerLevel;
}

export interface BMIFields {
  weight: {
    label: string;
    min: number;
    max: number;
    unit: string;
  };
  height: {
    label: string;
    min: number;
    max: number;
    unit: string;
  };
}

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  subtitle?: string;
  hint?: string;
  weight: number;
  category: string;
  critical?: boolean;
  trigger?: TriggerLevel;
  finalQuestion?: boolean;
}

export interface ScaleQuestion extends BaseQuestion {
  type: 'scale';
  scale: Scale;
  default?: number;
  reverse?: boolean;
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yesno';
  default?: boolean;
}

export interface MultipleQuestion extends BaseQuestion {
  type: 'multiple';
  options: Option[];
  maxSelections?: number;
  default?: string[];
}

export interface NumericQuestion extends BaseQuestion {
  type: 'numeric';
  min: number;
  max: number;
  default?: number;
  unit: string;
}

export interface BMIQuestion extends BaseQuestion {
  type: 'bmi';
  fields: BMIFields;
  default?: { weight: number; height: number };
}

export type Question = 
  | ScaleQuestion 
  | YesNoQuestion 
  | MultipleQuestion 
  | NumericQuestion 
  | BMIQuestion;

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  questions: Question[];
}

export interface ScoreRange {
  range: [number, number];
  label: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
}

export interface ScoringSystem {
  low: ScoreRange;
  moderate: ScoreRange;
  high: ScoreRange;
  critical: ScoreRange;
}

export interface QuestionnaireMetadata {
  version: string;
  totalQuestions: number;
  estimatedTime: string;
  scoringSystem: ScoringSystem;
}

export interface Questionnaire {
  sections: Section[];
  metadata: QuestionnaireMetadata;
}

// Типи для відповідей користувача
export interface Answer {
  questionId: string;
  value: string | number | string[] | boolean | { weight: number; height: number };
  timestamp: Date;
}

export interface UserProgress {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  score: number;
  startedAt: Date;
  completedAt?: Date;
}

export interface QuestionnaireResult {
  score: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  categories: {
    [key: string]: number;
  };
  criticalFlags: string[];
  recommendations: string[];
}

// ============================================
// Type Guards для безпечної роботи з типами
// ============================================

/**
 * Перевіряє, чи є питання типом Scale
 */
export function isScaleQuestion(question: Question): question is ScaleQuestion {
  return question.type === 'scale';
}

/**
 * Перевіряє, чи є питання типом YesNo
 */
export function isYesNoQuestion(question: Question): question is YesNoQuestion {
  return question.type === 'yesno';
}

/**
 * Перевіряє, чи є питання типом Multiple
 */
export function isMultipleQuestion(question: Question): question is MultipleQuestion {
  return question.type === 'multiple';
}

/**
 * Перевіряє, чи є питання типом Numeric
 */
export function isNumericQuestion(question: Question): question is NumericQuestion {
  return question.type === 'numeric';
}

/**
 * Перевіряє, чи є питання типом BMI
 */
export function isBMIQuestion(question: Question): question is BMIQuestion {
  return question.type === 'bmi';
}

// ============================================
// Утилітні функції
// ============================================

/**
 * Отримує значення за замовчуванням для будь-якого типу питання
 */
export function getQuestionDefault(question: Question): Answer['value'] | undefined {
  if (isScaleQuestion(question)) {
    return question.default ?? question.scale.min;
  }
  if (isYesNoQuestion(question)) {
    return question.default ?? false;
  }
  if (isMultipleQuestion(question)) {
    return question.default ?? [];
  }
  if (isNumericQuestion(question)) {
    return question.default ?? question.min;
  }
  if (isBMIQuestion(question)) {
    return question.default ?? { weight: 70, height: 170 };
  }
  return undefined;
}

/**
 * Перевіряє, чи є відповідь валідною для даного питання
 */
export function isValidAnswer(question: Question, answer: Answer['value']): boolean {
  if (answer === null || answer === undefined) {
    return false;
  }

  if (isScaleQuestion(question)) {
    return typeof answer === 'number' && 
           answer >= question.scale.min && 
           answer <= question.scale.max;
  }

  if (isYesNoQuestion(question)) {
    return answer === 'yes' || answer === 'no' || typeof answer === 'boolean';
  }

  if (isMultipleQuestion(question)) {
    if (!Array.isArray(answer)) return false;
    if (answer.length === 0) return false;
    if (question.maxSelections && answer.length > question.maxSelections) return false;
    return answer.every(id => question.options.some(opt => opt.id === id));
  }

  if (isNumericQuestion(question)) {
    return typeof answer === 'number' && 
           answer >= question.min && 
           answer <= question.max;
  }

  if (isBMIQuestion(question)) {
    if (typeof answer !== 'object' || answer === null) return false;
    const bmiAnswer = answer as { weight: number; height: number };
    return typeof bmiAnswer.weight === 'number' && 
           typeof bmiAnswer.height === 'number' &&
           bmiAnswer.weight >= question.fields.weight.min &&
           bmiAnswer.weight <= question.fields.weight.max &&
           bmiAnswer.height >= question.fields.height.min &&
           bmiAnswer.height <= question.fields.height.max;
  }

  return false;
}

/**
 * Розраховує БМІ з відповіді
 */
export function calculateBMI(answer: { weight: number; height: number }): number {
  return answer.weight / Math.pow(answer.height / 100, 2);
}

/**
 * Отримує категорію БМІ
 */
export function getBMICategory(bmi: number): {
  label: string;
  color: string;
  risk: 'low' | 'moderate' | 'high';
} {
  if (bmi < 18.5) {
    return { label: 'Недостатня вага', color: 'text-blue-500', risk: 'low' };
  }
  if (bmi < 25) {
    return { label: 'Нормальна вага', color: 'text-green-500', risk: 'low' };
  }
  if (bmi < 30) {
    return { label: 'Надлишкова вага', color: 'text-yellow-500', risk: 'moderate' };
  }
  return { label: 'Ожиріння', color: 'text-orange-500', risk: 'high' };
}

/**
 * Отримує label для значення scale питання
 */
export function getScaleLabel(question: ScaleQuestion, value: number): string {
  if (!question.scale.labels) return value.toString();
  return question.scale.labels[value.toString()] || value.toString();
}

/**
 * Конвертує yes/no відповідь у boolean
 */
export function yesNoToBoolean(answer: string | boolean): boolean {
  if (typeof answer === 'boolean') return answer;
  return answer === 'yes';
}

/**
 * Конвертує boolean у yes/no відповідь
 */
export function booleanToYesNo(value: boolean): 'yes' | 'no' {
  return value ? 'yes' : 'no';
}

/**
 * Підраховує загальну кількість питань у анкеті
 */
export function getTotalQuestions(questionnaire: Questionnaire): number {
  return questionnaire.sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
}

/**
 * Знаходить питання за його ID
 */
export function findQuestionById(
  questionnaire: Questionnaire,
  questionId: string
): { question: Question; section: Section } | null {
  for (const section of questionnaire.sections) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) {
      return { question, section };
    }
  }
  return null;
}

/**
 * Отримує питання за номером кроку (1-based index)
 */
export function getQuestionByStep(
  questionnaire: Questionnaire,
  step: number
): { question: Question; section: Section; stepInSection: number } | null {
  let currentStep = 0;
  
  for (const section of questionnaire.sections) {
    for (let i = 0; i < section.questions.length; i++) {
      currentStep++;
      if (currentStep === step) {
        return {
          question: section.questions[i],
          section,
          stepInSection: i + 1
        };
      }
    }
  }
  
  return null;
}

/**
 * Отримує прогрес у відсотках
 */
export function getProgressPercentage(
  currentStep: number,
  totalQuestions: number
): number {
  return Math.round((currentStep / totalQuestions) * 100);
}

/**
 * Перевіряє, чи є питання критичним
 */
export function isCriticalQuestion(question: Question): boolean {
  return question.critical === true || question.trigger === 'critical';
}

/**
 * Отримує всі критичні питання з анкети
 */
export function getCriticalQuestions(questionnaire: Questionnaire): Question[] {
  const criticalQuestions: Question[] = [];
  
  for (const section of questionnaire.sections) {
    for (const question of section.questions) {
      if (isCriticalQuestion(question)) {
        criticalQuestions.push(question);
      }
    }
  }
  
  return criticalQuestions;
}

/**
 * Визначає рівень ризику на основі балів
 */
export function getRiskLevel(
  score: number,
  scoringSystem: ScoringSystem
): 'low' | 'moderate' | 'high' | 'critical' {
  if (score >= scoringSystem.critical.range[0]) return 'critical';
  if (score >= scoringSystem.high.range[0]) return 'high';
  if (score >= scoringSystem.moderate.range[0]) return 'moderate';
  return 'low';
}