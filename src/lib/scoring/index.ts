// lib/scoring/index.ts
// Головний файл експорту для зручного використання

// Експорт з calculator
export {
  calculateTotalScore,
  calculateCategoryScores,
  calculateGaugeValue,
  isValidAnswer,
  countAnsweredQuestions,
  calculateBMI
} from './calculator';

// Експорт з risk-levels
export {
  determineRiskLevel,
  getRiskInfo,
  getCategoryRiskLevel,
  requiresUrgentConsultation,
  getScoreColor,
  getProgressBarColor,
  formatRiskLevel,
  hasCriticalSymptoms,
  type RiskLevel
} from './risk-levels';

// Експорт з recommendations
export {
  generateRecommendations,
  generateKeyTriggers,
  generateSummary,
  generateNextSteps
} from './recommendations';

/**
 * 🎯 ГОЛОВНА ФУНКЦІЯ - робить ВСЕ разом!
 * 
 * Використовуйте цю функцію для отримання ВСІХ результатів одразу
 */
export function calculateCompleteResults(answers: Record<string, unknown>) {
  // 1. Розраховуємо бали
  const totalScore = calculateTotalScore(answers);
  
  // 2. Визначаємо рівень ризику
  const riskLevel = determineRiskLevel(totalScore);
  
  // 3. Отримуємо інформацію про ризик
  const riskInfo = getRiskInfo(riskLevel);
  
  // 4. Розраховуємо бали за категоріями
  const categoryScores = calculateCategoryScores(answers);
  
  // 5. Генеруємо рекомендації
  const recommendations = generateRecommendations(riskLevel, answers);
  
  // 6. Генеруємо ключові тригери
  const keyTriggers = generateKeyTriggers(answers, totalScore);
  
  // 7. Генеруємо короткий висновок
  const summary = generateSummary(riskLevel, totalScore, keyTriggers);
  
  // 8. Генеруємо наступні кроки
  const nextSteps = generateNextSteps(riskLevel);
  
  // 9. Розраховуємо значення для gauge chart
  const gaugeValue = calculateGaugeValue(totalScore);
  
  // 10. Перевіряємо чи потрібна термінова консультація
  const requiresUrgent = requiresUrgentConsultation(totalScore, answers);
  
  // 11. Перевіряємо критичні симптоми
  const hasCritical = hasCriticalSymptoms(answers);
  
  // Повертаємо ВСЕ
  return {
    // Основні показники
    totalScore,
    riskLevel,
    riskInfo,
    
    // Детальна розбивка
    categoryScores,
    gaugeValue,
    
    // Рекомендації та аналіз
    recommendations,
    keyTriggers,
    summary,
    nextSteps,
    
    // Прапорці
    requiresUrgent,
    hasCritical,
    
    // Метадані
    answeredQuestions: countAnsweredQuestions(answers),
    totalQuestions: 35
  };
}

// Імпорти для типізації
import { calculateTotalScore, calculateCategoryScores, calculateGaugeValue, countAnsweredQuestions } from './calculator';
import { determineRiskLevel, getRiskInfo, requiresUrgentConsultation, hasCriticalSymptoms } from './risk-levels';
import { generateRecommendations, generateKeyTriggers, generateSummary, generateNextSteps } from './recommendations';