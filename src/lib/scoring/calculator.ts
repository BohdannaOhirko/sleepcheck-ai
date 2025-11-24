// lib/scoring/calculator.ts
// Розрахунок балів на основі відповідей користувача
// Базується на questionnaire.json

/**
 * Розраховує загальний бал на основі відповідей анкети
 * Максимальний можливий бал: ~100
 */
export function calculateTotalScore(answers: Record<string, any>): number {
  let score = 0;
  
  // ================================
  // РОЗДІЛ 1: Режим сну (sleep-patterns)
  // ================================
  
  // sleep-quality (scale 0-10, weight: 2, reverse scoring)
  if (answers['sleep-quality'] !== undefined) {
    const quality = Number(answers['sleep-quality']);
    // Погана якість (0) = більше балів, відмінна (10) = менше балів
    score += (10 - quality) * 2; // Макс 20 балів
  }
  
  // sleep-duration (numeric, weight: 2)
  if (answers['sleep-duration'] !== undefined) {
    const hours = Number(answers['sleep-duration']);
    // Оптимально 7-8 годин
    if (hours < 6 || hours > 9) {
      score += Math.abs(7.5 - hours) * 2; // Відхилення від норми
    }
  }
  
  // sleep-onset (numeric, weight: 1.5)
  if (answers['sleep-onset'] !== undefined) {
    const minutes = Number(answers['sleep-onset']);
    // Більше 30 хвилин - проблема
    if (minutes > 30) {
      score += Math.min((minutes - 30) / 10, 5) * 1.5; // Макс 7.5 балів
    }
  }
  
  // night-awakenings (numeric, weight: 2)
  if (answers['night-awakenings'] !== undefined) {
    const awakenings = Number(answers['night-awakenings']);
    score += Math.min(awakenings * 2, 20); // Макс 20 балів
  }
  
  // morning-freshness (scale 0-10, weight: 1.5, reverse)
  if (answers['morning-freshness'] !== undefined) {
    const freshness = Number(answers['morning-freshness']);
    score += (10 - freshness) * 1.5; // Макс 15 балів
  }
  
  // ================================
  // РОЗДІЛ 2: Хропіння та дихання (snoring-breathing)
  // ================================
  
  // snoring (yesno, weight: 3, CRITICAL)
  if (answers['snoring'] === true || answers['snoring'] === 'yes') {
    score += 15; // Критичний симптом!
  }
  
  // snoring-loudness (scale 0-10, weight: 2)
  if (answers['snoring-loudness'] !== undefined) {
    const loudness = Number(answers['snoring-loudness']);
    score += loudness * 2; // Макс 20 балів
  }
  
  // breathing-pauses (yesno, weight: 5, CRITICAL)
  if (answers['breathing-pauses'] === true || answers['breathing-pauses'] === 'yes') {
    score += 25; // ДУЖЕ КРИТИЧНИЙ СИМПТОМ!
  }
  
  // gasping (yesno, weight: 4, CRITICAL)
  if (answers['gasping'] === true || answers['gasping'] === 'yes') {
    score += 20; // Критичний симптом
  }
  
  // mouth-breathing (yesno, weight: 1)
  if (answers['mouth-breathing'] === true || answers['mouth-breathing'] === 'yes') {
    score += 5;
  }
  
  // ================================
  // РОЗДІЛ 3: Денні симптоми (daytime-symptoms)
  // ================================
  
  // daytime-sleepiness (scale 0-10, weight: 3, CRITICAL)
  if (answers['daytime-sleepiness'] !== undefined) {
    const sleepiness = Number(answers['daytime-sleepiness']);
    score += sleepiness * 3; // Макс 30 балів
  }
  
  // falling-asleep-sitting (scale 0-10, weight: 3)
  if (answers['falling-asleep-sitting'] !== undefined) {
    const falling = Number(answers['falling-asleep-sitting']);
    score += falling * 3; // Макс 30 балів
  }
  
  // concentration (scale 0-10, weight: 2, REVERSE)
  if (answers['concentration'] !== undefined) {
    const concentration = Number(answers['concentration']);
    score += (10 - concentration) * 2; // Макс 20 балів
  }
  
  // memory-issues (yesno, weight: 2)
  if (answers['memory-issues'] === true || answers['memory-issues'] === 'yes') {
    score += 10;
  }
  
  // mood-changes (multiple, weight: 2)
  if (Array.isArray(answers['mood-changes'])) {
    const moodChanges = answers['mood-changes'];
    // Підраховуємо ваги кожного обраного варіанту
    let moodScore = 0;
    if (moodChanges.includes('irritability')) moodScore += 1.5;
    if (moodChanges.includes('anxiety')) moodScore += 2;
    if (moodChanges.includes('depression')) moodScore += 2.5;
    if (moodChanges.includes('mood-swings')) moodScore += 1.5;
    score += moodScore * 2; // Помножуємо на загальну вагу питання
  }
  
  // morning-headaches (yesno, weight: 2)
  if (answers['morning-headaches'] === true || answers['morning-headaches'] === 'yes') {
    score += 10;
  }
  
  // ================================
  // РОЗДІЛ 4: Здоров'я та спосіб життя (health-lifestyle)
  // ================================
  
  // bmi (calculated, weight: 3, CRITICAL)
  if (answers['bmi']) {
    const bmiData = answers['bmi'];
    let bmiValue: number;
    
    if (typeof bmiData === 'object' && bmiData.weight && bmiData.height) {
      // Розраховуємо BMI
      const weight = Number(bmiData.weight);
      const heightM = Number(bmiData.height) / 100; // см -> м
      bmiValue = weight / (heightM * heightM);
    } else {
      bmiValue = Number(bmiData);
    }
    
    // BMI шкала ризику
    if (bmiValue >= 40) score += 15; // Ожиріння III ступеня
    else if (bmiValue >= 35) score += 12; // Ожиріння II ступеня
    else if (bmiValue >= 30) score += 9;  // Ожиріння I ступеня
    else if (bmiValue >= 25) score += 5;  // Надмірна вага
    // BMI 18.5-25 = норма, 0 балів
  }
  
  // age (numeric, weight: 2)
  if (answers['age'] !== undefined) {
    const age = Number(answers['age']);
    if (age >= 65) score += 8;
    else if (age >= 50) score += 6;
    else if (age >= 40) score += 4;
    else if (age >= 30) score += 2;
  }
  
  // neck-circumference (numeric, weight: 2.5, CRITICAL)
  if (answers['neck-circumference'] !== undefined) {
    const neck = Number(answers['neck-circumference']);
    // Чоловіки: > 43 см, Жінки: > 41 см (використаємо 42 як середнє)
    if (neck > 43) score += 12.5;
    else if (neck > 41) score += 7.5;
  }
  
  // hypertension (yesno, weight: 2)
  if (answers['hypertension'] === true || answers['hypertension'] === 'yes') {
    score += 10;
  }
  
  // heart-disease (yesno, weight: 2.5, CRITICAL)
  if (answers['heart-disease'] === true || answers['heart-disease'] === 'yes') {
    score += 12.5;
  }
  
  // diabetes (yesno, weight: 2)
  if (answers['diabetes'] === true || answers['diabetes'] === 'yes') {
    score += 10;
  }
  
  // smoking (yesno, weight: 1.5)
  if (answers['smoking'] === true || answers['smoking'] === 'yes') {
    score += 7.5;
  }
  
  // alcohol (scale 0-10, weight: 1.5)
  if (answers['alcohol'] !== undefined) {
    const alcohol = Number(answers['alcohol']);
    score += alcohol * 1.5; // Макс 15 балів
  }
  
  // physical-activity (scale 0-10, weight: 1, REVERSE)
  if (answers['physical-activity'] !== undefined) {
    const activity = Number(answers['physical-activity']);
    score += (10 - activity) * 1; // Макс 10 балів
  }
  
  // ================================
  // РОЗДІЛ 5: Спостереження партнера (partner-observations)
  // ================================
  
  // partner-complaints (multiple, weight: 3)
  if (Array.isArray(answers['partner-complaints'])) {
    const complaints = answers['partner-complaints'];
    let partnerScore = 0;
    
    if (complaints.includes('loud-snoring')) partnerScore += 2;
    if (complaints.includes('breathing-stops')) partnerScore += 5; // КРИТИЧНО!
    if (complaints.includes('restless')) partnerScore += 1.5;
    if (complaints.includes('kicks')) partnerScore += 1;
    if (complaints.includes('talks')) partnerScore += 0.5;
    
    score += partnerScore * 3; // Помножуємо на загальну вагу
  }
  
  // partner-sleep-disruption (scale 0-10, weight: 2)
  if (answers['partner-sleep-disruption'] !== undefined) {
    const disruption = Number(answers['partner-sleep-disruption']);
    score += disruption * 2; // Макс 20 балів
  }
  
  // final-concern (scale 0-10, weight: 1.5)
  if (answers['final-concern'] !== undefined) {
    const concern = Number(answers['final-concern']);
    score += concern * 1.5; // Макс 15 балів
  }
  
  return Math.round(score);
}

/**
 * Розраховує бали за окремими категоріями
 */
export function calculateCategoryScores(answers: Record<string, any>) {
  let sleep = 0;
  let symptoms = 0;
  let daytime = 0;
  let health = 0;
  
  // Категорія: Режим сну
  if (answers['sleep-quality'] !== undefined) {
    sleep += (10 - Number(answers['sleep-quality'])) / 2;
  }
  if (answers['night-awakenings'] !== undefined) {
    sleep += Math.min(Number(answers['night-awakenings']), 5);
  }
  if (answers['morning-freshness'] !== undefined) {
    sleep += (10 - Number(answers['morning-freshness'])) / 2;
  }
  
  // Категорія: Симптоми
  if (answers['snoring'] === true) symptoms += 3;
  if (answers['breathing-pauses'] === true) symptoms += 5;
  if (answers['gasping'] === true) symptoms += 4;
  if (answers['snoring-loudness']) {
    symptoms += Number(answers['snoring-loudness']) / 5;
  }
  
  // Категорія: Денні симптоми
  if (answers['daytime-sleepiness'] !== undefined) {
    daytime += Number(answers['daytime-sleepiness']) / 2;
  }
  if (answers['falling-asleep-sitting'] !== undefined) {
    daytime += Number(answers['falling-asleep-sitting']) / 2;
  }
  if (answers['concentration'] !== undefined) {
    daytime += (10 - Number(answers['concentration'])) / 4;
  }
  
  // Категорія: Здоров'я
  if (answers['bmi']) {
    const bmiData = answers['bmi'];
    let bmiValue: number;
    if (typeof bmiData === 'object' && bmiData.weight && bmiData.height) {
      const weight = Number(bmiData.weight);
      const heightM = Number(bmiData.height) / 100;
      bmiValue = weight / (heightM * heightM);
    } else {
      bmiValue = Number(bmiData);
    }
    if (bmiValue >= 30) health += 3;
    else if (bmiValue >= 25) health += 1;
  }
  if (answers['heart-disease'] === true) health += 3;
  if (answers['hypertension'] === true) health += 2;
  if (answers['diabetes'] === true) health += 2;
  
  return {
    sleepQuality: Math.min(Math.round(sleep), 10),
    symptoms: Math.min(Math.round(symptoms), 10),
    daytimeFunctioning: Math.min(Math.round(daytime), 10),
    healthFactors: Math.min(Math.round(health), 10),
  };
}

/**
 * Розраховує відсоток для gauge chart (0-100)
 */
export function calculateGaugeValue(totalScore: number): number {
  // Максимальний теоретичний бал ~350-400, але практично рідко > 100
  return Math.min(Math.round(totalScore), 100);
}

/**
 * Перевіряє чи відповідь валідна
 */
export function isValidAnswer(answer: any): boolean {
  return answer !== null && answer !== undefined && answer !== '';
}

/**
 * Підраховує кількість відповідей на питання
 */
export function countAnsweredQuestions(answers: Record<string, any>): number {
  return Object.values(answers).filter(isValidAnswer).length;
}

/**
 * Розраховує BMI
 */
export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
}