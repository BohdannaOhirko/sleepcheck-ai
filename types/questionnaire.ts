// ============================================
// БАЗОВІ ТИПИ
// ============================================

export type QuestionType = 'scale' | 'yesno' | 'multiple' | 'numeric' | 'bmi';

export type RiskCategory = 
  | 'respiratory' 
  | 'sleep_quality' 
  | 'daytime_fatigue' 
  | 'risk_factors' 
  | 'lifestyle' 
  | 'symptoms'
  | 'quality_of_life';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

// ============================================
// СТРУКТУРА ПИТАНЬ (для questionnaire.json)
// ============================================

export interface QuestionOption {
  id: string;
  label: string;
  value?: string | number;
  weight?: number;
}

export interface ScaleLabels {
  [key: number]: string;
}

export interface Scale {
  min: number;
  max: number;
  step?: number;
  labels?: ScaleLabels;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  subtitle?: string;
  hint?: string;
  description?: string;
  weight?: number;
  category?: RiskCategory;
  critical?: boolean;
  reverse?: boolean;
  required?: boolean;
  
  // Для scale питань
  scale?: Scale;
  
  // Для multiple питань
  options?: QuestionOption[];
  maxSelections?: number;
  
  // Для numeric/bmi питань
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  questions: Question[];
}

export interface QuestionnaireData {
  version?: string;
  title?: string;
  description?: string;
  sections: Section[];
}

// ============================================
// ВІДПОВІДІ ТА РЕЗУЛЬТАТИ
// ============================================

export interface QuestionnaireAnswers {
  [questionId: string]: string | number | boolean | string[] | { weight: number; height: number };
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  percentage: number;
}

export interface QuestionnaireResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  riskLevel: RiskLevel;
  categoryScores: {
    [category in RiskCategory]?: CategoryScore;
  };
  criticalFlags: string[];
  keySymptoms: string[];
  bmi?: number;
}

// ============================================
// LEGACY ALIASES (для сумісності зі старим кодом)
// ============================================

export type QuestionnaireSection = Section;
export type Questionnaire = QuestionnaireData;