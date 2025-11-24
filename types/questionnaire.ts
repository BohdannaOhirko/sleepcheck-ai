// Типи питань
export type QuestionType = 'scale' | 'yesno' | 'multiple' | 'numeric'

// Категорії ризиків
export type RiskCategory = 
  | 'respiratory' 
  | 'sleep_quality' 
  | 'daytime_fatigue' 
  | 'risk_factors' 
  | 'lifestyle' 
  | 'symptoms'
  | 'quality_of_life'

// Рівні ризику
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical'

// Структура питання
export interface Question {
  id: string
  type: QuestionType
  question: string
  description?: string
  weight: number
  category: RiskCategory
  critical?: boolean
  reverse?: boolean // Для питань, де більше = краще
  
  // Для scale питань
  scale?: {
    min: number
    max: number
    step: number
  }
  
  // Для multiple питань
  options?: Array<{
    id: string
    label: string
    weight: number
  }>
  
  // Для numeric питань
  min?: number
  max?: number
  unit?: string
}

// Секція анкети
export interface QuestionnaireSection {
  id: string
  title: string
  description: string
  questions: Question[]
}

// Повна анкета
export interface Questionnaire {
  sections: QuestionnaireSection[]
}

// Відповіді користувача
export interface QuestionnaireAnswers {
  [questionId: string]: any
}

// Результати оцінювання
export interface QuestionnaireResults {
  totalScore: number
  maxScore: number
  percentage: number
  riskLevel: RiskLevel
  categoryScores: {
    [category in RiskCategory]?: {
      score: number
      maxScore: number
      percentage: number
    }
  }
  criticalFlags: string[]
  keySymptoms: string[]
  bmi?: number
}

