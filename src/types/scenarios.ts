export interface CriticalSymptom {
  id: string;
  name: string;
  severity: 'critical' | 'high' | 'moderate';
  description: string;
}

export interface PossibleCondition {
  name: string;
  probability: 'висока' | 'помірна' | 'можлива';
  description: string;
  icon: string;
}

export interface Examination {
  name: string;
  description: string;
  urgency: string;
}

export interface Scenario {
  timeline: string;
  changes: string[];
  risks?: string[];
  benefits?: string[];
}

export interface UrgencyLevel {
  level: 'critical' | 'high' | 'moderate' | 'low';
  title: string;
  timeframe: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  actions: string[];
  specialists: string[];
  examinations: Examination[];
}

export interface ScenariosData {
  withTreatment: Scenario;
  withoutChanges: Scenario;
  worstCase: Scenario;
}

export interface AnalysisResult {
  urgency: UrgencyLevel;
  criticalSymptoms: CriticalSymptom[];
  possibleConditions: PossibleCondition[];
  scenarios: ScenariosData;
  personalizedAdvice: string[];
}

export type ScenarioType = 'withTreatment' | 'withoutChanges' | 'worstCase';