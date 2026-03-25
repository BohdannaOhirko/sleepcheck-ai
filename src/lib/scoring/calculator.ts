// lib/scoring/calculator.ts
// Розрахунок балів на основі відповідей користувача

import {
  MAX_SCORE,
  BREATHING_WEIGHTS,
  DAYTIME_WEIGHTS,
  MOOD_WEIGHTS,
  HEALTH_WEIGHTS,
  PARTNER_WEIGHTS,
  CONCERN_WEIGHT,
} from './scoring-weights';

/**
 * Розраховує загальний бал (0-100) на основі відповідей анкети
 */
export function calculateTotalScore(answers: Record<string, unknown>): number {
  let score = 0;
  

  // ================================
  // РОЗДІЛ 1: Режим сну
  // ================================

  if (answers['sleep-quality'] !== undefined) {
    const quality = Number(answers['sleep-quality']);
    score += (10 - quality) * 2;
  }

  if (answers['sleep-duration'] !== undefined) {
    const hours = Number(answers['sleep-duration']);
    if (hours < 6 || hours > 9) {
      score += Math.abs(7.5 - hours) * 2;
    }
  }

  if (answers['sleep-onset'] !== undefined) {
    const minutes = Number(answers['sleep-onset']);
    if (minutes > 30) {
      score += Math.min((minutes - 30) / 10, 5) * 1.5;
    }
  }

  if (answers['night-awakenings'] !== undefined) {
    const awakenings = Number(answers['night-awakenings']);
    score += Math.min(awakenings * 2, 20);
  }

  if (answers['morning-freshness'] !== undefined) {
    const freshness = Number(answers['morning-freshness']);
    score += (10 - freshness) * 1.5;
  }

  // ================================
  // РОЗДІЛ 2: Хропіння та дихання
  // ================================

  if (answers['snoring'] === true || answers['snoring'] === 'yes') {
    score += BREATHING_WEIGHTS.snoring;
  }

  // Рахуємо тільки якщо є хропіння
  if (
    (answers['snoring'] === true || answers['snoring'] === 'yes') &&
    answers['snoring-loudness'] !== undefined
  ) {
    score += Number(answers['snoring-loudness']) * BREATHING_WEIGHTS.snoringLoudness;
  }

  if (answers['breathing-pauses'] === true || answers['breathing-pauses'] === 'yes') {
    score += BREATHING_WEIGHTS.breathingPauses;
  }

  if (answers['gasping'] === true || answers['gasping'] === 'yes') {
    score += BREATHING_WEIGHTS.gasping;
  }

  if (answers['mouth-breathing'] === true || answers['mouth-breathing'] === 'yes') {
    score += BREATHING_WEIGHTS.mouthBreathing;
  }

  // ================================
  // РОЗДІЛ 3: Денні симптоми
  // ================================

  if (answers['daytime-sleepiness'] !== undefined) {
    score += Number(answers['daytime-sleepiness']) * DAYTIME_WEIGHTS.sleepiness;
  }

  if (answers['falling-asleep-sitting'] !== undefined) {
    score += Number(answers['falling-asleep-sitting']) * DAYTIME_WEIGHTS.fallingAsleep;
  }

  if (answers['concentration'] !== undefined) {
    score += (10 - Number(answers['concentration'])) * DAYTIME_WEIGHTS.concentration;
  }

  if (answers['memory-issues'] === true || answers['memory-issues'] === 'yes') {
    score += DAYTIME_WEIGHTS.memoryIssues;
  }

  if (Array.isArray(answers['mood-changes'])) {
    const moods = answers['mood-changes'];
    let moodScore = 0;
    if (moods.includes('irritability')) moodScore += MOOD_WEIGHTS.irritability;
    if (moods.includes('anxiety'))      moodScore += MOOD_WEIGHTS.anxiety;
    if (moods.includes('depression'))   moodScore += MOOD_WEIGHTS.depression;
    if (moods.includes('mood-swings'))  moodScore += MOOD_WEIGHTS.moodSwings;
    score += moodScore * MOOD_WEIGHTS.multiplier;
  }

  if (answers['morning-headaches'] === true || answers['morning-headaches'] === 'yes') {
    score += DAYTIME_WEIGHTS.morningHeadaches;
  }

  // ================================
  // РОЗДІЛ 4: Здоров'я та спосіб життя
  // ================================

  if (answers['bmi']) {
    const bmiData = answers['bmi'];
    let bmi: number;
    if (typeof bmiData === 'object' && bmiData.weight && bmiData.height) {
      const heightM = Number(bmiData.height) / 100;
      bmi = Number(bmiData.weight) / (heightM * heightM);
    } else {
      bmi = Number(bmiData);
    }

    if      (bmi >= 40) score += HEALTH_WEIGHTS.bmi.obesity3;
    else if (bmi >= 35) score += HEALTH_WEIGHTS.bmi.obesity2;
    else if (bmi >= 30) score += HEALTH_WEIGHTS.bmi.obesity1;
    else if (bmi >= 25) score += HEALTH_WEIGHTS.bmi.overweight;
  }

  if (answers['age'] !== undefined) {
    const age = Number(answers['age']);
    if      (age >= 65) score += HEALTH_WEIGHTS.age.over65;
    else if (age >= 50) score += HEALTH_WEIGHTS.age.over50;
    else if (age >= 40) score += HEALTH_WEIGHTS.age.over40;
    else if (age >= 30) score += HEALTH_WEIGHTS.age.over30;
  }

  if (answers['neck-circumference'] !== undefined) {
    const neck = Number(answers['neck-circumference']);
    if      (neck > 43) score += HEALTH_WEIGHTS.neck.highRisk;
    else if (neck > 41) score += HEALTH_WEIGHTS.neck.moderateRisk;
  }

  if (answers['hypertension'] === true || answers['hypertension'] === 'yes') {
    score += HEALTH_WEIGHTS.hypertension;
  }

  if (answers['heart-disease'] === true || answers['heart-disease'] === 'yes') {
    score += HEALTH_WEIGHTS.heartDisease;
  }

  if (answers['diabetes'] === true || answers['diabetes'] === 'yes') {
    score += HEALTH_WEIGHTS.diabetes;
  }

  if (answers['smoking'] === true || answers['smoking'] === 'yes') {
    score += HEALTH_WEIGHTS.smoking;
  }

  if (answers['alcohol'] !== undefined) {
    score += Number(answers['alcohol']) * HEALTH_WEIGHTS.alcohol;
  }

  if (answers['physical-activity'] !== undefined) {
    score += (10 - Number(answers['physical-activity'])) * HEALTH_WEIGHTS.activity;
  }

  // ================================
  // РОЗДІЛ 5: Спостереження партнера
  // ================================

  // Рахуємо тільки якщо є партнер
  if (answers['has-partner'] === true || answers['has-partner'] === 'yes') {
    if (Array.isArray(answers['partner-complaints'])) {
      const complaints = answers['partner-complaints'];
      let partnerScore = 0;
      if (complaints.includes('loud-snoring'))    partnerScore += PARTNER_WEIGHTS.loudSnoring;
      if (complaints.includes('breathing-stops')) partnerScore += PARTNER_WEIGHTS.breathingStops;
      if (complaints.includes('restless'))        partnerScore += PARTNER_WEIGHTS.restless;
      if (complaints.includes('kicks'))           partnerScore += PARTNER_WEIGHTS.kicks;
      if (complaints.includes('talks'))           partnerScore += PARTNER_WEIGHTS.talks;
      score += partnerScore * PARTNER_WEIGHTS.multiplier;
    }

    if (answers['partner-sleep-disruption'] !== undefined) {
      score += Number(answers['partner-sleep-disruption']) * PARTNER_WEIGHTS.disruption;
    }
  }

  if (answers['final-concern'] !== undefined) {
    score += Number(answers['final-concern']) * CONCERN_WEIGHT;
  }

  // Нормалізуємо до 0-100
// Нормалізуємо до 0-100
  const normalized = Math.min(Math.round((score / MAX_SCORE) * 100), 100);
  console.log('raw score:', score, 'normalized:', normalized);
  return normalized;

  
}

/**
 * Розраховує бали за окремими категоріями (0-10)
 */
export function calculateCategoryScores(answers: Record<string, unknown>) {
  let sleep = 0;
  let symptoms = 0;
  let daytime = 0;
  let health = 0;

  if (answers['sleep-quality'] !== undefined) {
    sleep += (10 - Number(answers['sleep-quality'])) / 2;
  }
  if (answers['night-awakenings'] !== undefined) {
    sleep += Math.min(Number(answers['night-awakenings']), 5);
  }
  if (answers['morning-freshness'] !== undefined) {
    sleep += (10 - Number(answers['morning-freshness'])) / 2;
  }

  if (answers['snoring'] === true)          symptoms += 3;
  if (answers['breathing-pauses'] === true) symptoms += 5;
  if (answers['gasping'] === true)          symptoms += 4;
  if (answers['snoring-loudness']) {
    symptoms += Number(answers['snoring-loudness']) / 5;
  }

  if (answers['daytime-sleepiness'] !== undefined) {
    daytime += Number(answers['daytime-sleepiness']) / 2;
  }
  if (answers['falling-asleep-sitting'] !== undefined) {
    daytime += Number(answers['falling-asleep-sitting']) / 2;
  }
  if (answers['concentration'] !== undefined) {
    daytime += (10 - Number(answers['concentration'])) / 4;
  }

  if (answers['bmi']) {
    const bmiData = answers['bmi'];
    let bmi: number;
    if (typeof bmiData === 'object' && bmiData.weight && bmiData.height) {
      const heightM = Number(bmiData.height) / 100;
      bmi = Number(bmiData.weight) / (heightM * heightM);
    } else {
      bmi = Number(bmiData);
    }
    if      (bmi >= 30) health += 3;
    else if (bmi >= 25) health += 1;
  }
  if (answers['heart-disease'] === true) health += 3;
  if (answers['hypertension'] === true)  health += 2;
  if (answers['diabetes'] === true)      health += 2;

  return {
    sleepQuality:        Math.min(Math.round(sleep), 10),
    symptoms:            Math.min(Math.round(symptoms), 10),
    daytimeFunctioning:  Math.min(Math.round(daytime), 10),
    healthFactors:       Math.min(Math.round(health), 10),
  };
}

export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}

export function calculateGaugeValue(totalScore: number): number {
  return Math.min(Math.round(totalScore), 100);
}

export function isValidAnswer(answer: unknown): boolean {
  return answer !== null && answer !== undefined && answer !== '';
}

export function countAnsweredQuestions(answers: Record<string, unknown>): number {
  return Object.values(answers).filter(isValidAnswer).length;
}