// lib/scoring/risk-levels.ts
// Визначення рівнів ризику на основі metadata з questionnaire.json

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

/**
 * Визначає рівень ризику на основі загального балу
 * Базується на scoringSystem з questionnaire.json
 */
export function determineRiskLevel(totalScore: number): RiskLevel {
  // Відповідно до metadata.scoringSystem:
  // low: 0-30
  // moderate: 31-50
  // high: 51-70
  // critical: 71-100
  
  if (totalScore <= 30) {
    return 'low';
  } else if (totalScore <= 50) {
    return 'moderate';
  } else if (totalScore <= 70) {
    return 'high';
  } else {
    return 'critical';
  }
}

/**
 * Отримує інформацію про рівень ризику для UI
 */
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
      range: '0-30 балів'
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
      range: '31-50 балів'
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
      range: '51-70 балів'
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
      range: '71-100 балів'
    }
  };
  
  return riskInfoMap[riskLevel];
}

/**
 * Перевіряє чи потрібна термінова консультація
 */
export function requiresUrgentConsultation(
  totalScore: number, 
  answers: Record<string, any>
): boolean {
  // Критичний бал
  if (totalScore > 70) return true;
  
  // Критичні симптоми
  if (answers['breathing-pauses'] === true) return true;
  if (answers['gasping'] === true && answers['daytime-sleepiness'] >= 7) return true;
  
  // Серцеві захворювання + високий бал
  if (answers['heart-disease'] === true && totalScore > 50) return true;
  
  // Дуже висока денна сонливість
  if (answers['daytime-sleepiness'] >= 9) return true;
  
  // Спостереження партнера про зупинки дихання
  if (Array.isArray(answers['partner-complaints']) && 
      answers['partner-complaints'].includes('breathing-stops')) {
    return true;
  }
  
  return false;
}

/**
 * Визначає рівень ризику за категорією
 */
export function getCategoryRiskLevel(score: number): RiskLevel {
  if (score <= 3) return 'low';
  if (score <= 5) return 'moderate';
  if (score <= 7) return 'high';
  return 'critical';
}

/**
 * Отримує колір для відображення балу
 */
export function getScoreColor(score: number): string {
  if (score <= 30) return 'text-green-600';
  if (score <= 50) return 'text-yellow-600';
  if (score <= 70) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Отримує колір для progress bar
 */
export function getProgressBarColor(score: number): string {
  if (score <= 30) return 'bg-green-500';
  if (score <= 50) return 'bg-yellow-500';
  if (score <= 70) return 'bg-orange-500';
  return 'bg-red-500';
}

/**
 * Форматує рівень ризику для відображення
 */
export function formatRiskLevel(riskLevel: RiskLevel): string {
  const labels = {
    low: 'Низький ризик',
    moderate: 'Помірний ризик',
    high: 'Високий ризик',
    critical: 'Критичний ризик'
  };
  
  return labels[riskLevel];
}

/**
 * Перевіряє наявність критичних симптомів
 */
export function hasCriticalSymptoms(answers: Record<string, any>): boolean {
  const criticalSymptoms = [
    answers['breathing-pauses'] === true,
    answers['gasping'] === true && answers['daytime-sleepiness'] >= 8,
    answers['heart-disease'] === true,
    Array.isArray(answers['partner-complaints']) && 
      answers['partner-complaints'].includes('breathing-stops')
  ];
  
  return criticalSymptoms.some(symptom => symptom);
}