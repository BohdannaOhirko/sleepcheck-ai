// lib/scoring/risk-levels.ts
// Визначення рівнів ризику на основі нормалізованого балу (0-100)

import { RISK_THRESHOLDS } from './scoring-weights';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export function determineRiskLevel(totalScore: number): RiskLevel {
  if (totalScore <= RISK_THRESHOLDS.low.max)      return 'low';
  if (totalScore <= RISK_THRESHOLDS.moderate.max) return 'moderate';
  if (totalScore <= RISK_THRESHOLDS.high.max)     return 'high';
  return 'critical';
}

export function getRiskInfo(riskLevel: RiskLevel) {
  const riskInfoMap = {
    low: {
      color: 'bg-green-100 border-green-500 text-green-800',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-500',
      icon: '✅',
      emoji: '😊',
      title: 'Низький ризик апное',
      description: 'Ваші відповіді вказують на низьку ймовірність апное сну. Продовжуйте дотримуватися здорових звичок сну.',
      urgency: 'low',
      actionRequired: 'Профілактика',
      range: '0-25 балів'
    },
    moderate: {
      color: 'bg-yellow-100 border-yellow-500 text-yellow-800',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-500',
      icon: '⚠️',
      emoji: '😐',
      title: 'Помірний ризик апное',
      description: 'Виявлено декілька ознак, що можуть вказувати на апное сну. Рекомендуємо проконсультуватися з лікарем.',
      urgency: 'medium',
      actionRequired: 'Консультація рекомендована',
      range: '26-50 балів'
    },
    high: {
      color: 'bg-orange-100 border-orange-500 text-orange-800',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-500',
      icon: '⚠️',
      emoji: '😟',
      title: 'Високий ризик апное',
      description: 'Ваші відповіді вказують на високу ймовірність апное сну. Настійно рекомендуємо звернутися до спеціаліста.',
      urgency: 'high',
      actionRequired: 'Консультація необхідна',
      range: '51-75 балів'
    },
    critical: {
      color: 'bg-red-100 border-red-500 text-red-800',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-500',
      icon: '🚨',
      emoji: '😰',
      title: 'Критичний ризик апное',
      description: 'УВАГА! Виявлено критичні ознаки апное сну. ТЕРМІНОВО зверніться до спеціаліста-сомнолога!',
      urgency: 'critical',
      actionRequired: 'ТЕРМІНОВА консультація',
      range: '76-100 балів'
    }
  };

  return riskInfoMap[riskLevel];
}

export function requiresUrgentConsultation(
  totalScore: number,
  answers: Record<string, unknown>
): boolean {
  if (totalScore > 75) return true;
  if (answers['breathing-pauses'] === true) return true;
  if (answers['gasping'] === true && answers['daytime-sleepiness'] >= 7) return true;
  if (answers['heart-disease'] === true && totalScore > 50) return true;
  if (answers['daytime-sleepiness'] >= 9) return true;
  if (
    Array.isArray(answers['partner-complaints']) &&
    answers['partner-complaints'].includes('breathing-stops')
  ) return true;

  return false;
}

export function getCategoryRiskLevel(score: number): RiskLevel {
  if (score <= 3) return 'low';
  if (score <= 5) return 'moderate';
  if (score <= 7) return 'high';
  return 'critical';
}

export function getScoreColor(score: number): string {
  if (score <= 25) return 'text-green-600';
  if (score <= 50) return 'text-yellow-600';
  if (score <= 75) return 'text-orange-600';
  return 'text-red-600';
}

export function getProgressBarColor(score: number): string {
  if (score <= 25) return 'bg-green-500';
  if (score <= 50) return 'bg-yellow-500';
  if (score <= 75) return 'bg-orange-500';
  return 'bg-red-500';
}

export function formatRiskLevel(riskLevel: RiskLevel): string {
  const labels = {
    low:      'Низький ризик',
    moderate: 'Помірний ризик',
    high:     'Високий ризик',
    critical: 'Критичний ризик'
  };
  return labels[riskLevel];
}

export function hasCriticalSymptoms(answers: Record<string, unknown>): boolean {
  return [
    answers['breathing-pauses'] === true,
    answers['gasping'] === true && answers['daytime-sleepiness'] >= 8,
    answers['heart-disease'] === true,
    Array.isArray(answers['partner-complaints']) &&
      answers['partner-complaints'].includes('breathing-stops')
  ].some(Boolean);
}