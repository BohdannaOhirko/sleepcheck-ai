// lib/scoring/scoring-weights.ts
// Константи та ваги для системи підрахунку балів

export const MAX_SCORE = 431;

// Пороги ризику (після нормалізації 0-100)
export const RISK_THRESHOLDS = {
  low:      { min: 0,  max: 25 },
  moderate: { min: 26, max: 50 },
  high:     { min: 51, max: 75 },
  critical: { min: 76, max: 100 },
};

// Ваги симптомів хропіння/дихання
export const BREATHING_WEIGHTS = {
  snoring:          15,
  snoringLoudness:  2,   // множник на значення 0-10
  breathingPauses:  25,
  gasping:          20,
  mouthBreathing:   5,
};

// Ваги денних симптомів
export const DAYTIME_WEIGHTS = {
  sleepiness:          3,  // множник на значення 0-10
  fallingAsleep:       3,  // множник на значення 0-10
  concentration:       2,  // reverse, множник на (10 - значення)
  memoryIssues:        10,
  morningHeadaches:    10,
};

// Ваги змін настрою
export const MOOD_WEIGHTS = {
  irritability: 1.5,
  anxiety:      1.5,
  depression:   1.5,
  moodSwings:   1.5,
  multiplier:   1.5, // загальна вага питання (знижено з 2)
};

// Ваги здоров'я
export const HEALTH_WEIGHTS = {
  bmi: {
    obesity3:  15,  // BMI >= 40
    obesity2:  12,  // BMI >= 35
    obesity1:  9,   // BMI >= 30
    overweight: 5,  // BMI >= 25
  },
  age: {
    over65: 8,
    over50: 6,
    over40: 4,
    over30: 2,
  },
  neck: {
    highRisk:     12.5, // > 43 см
    moderateRisk: 7.5,  // > 41 см
  },
  hypertension:  10,
  heartDisease:  12.5,
  diabetes:      10,
  smoking:       7.5,
  alcohol:       1.5,  // множник на значення 0-10
  activity:      1,    // reverse, множник на (10 - значення)
};

// Ваги спостережень партнера
export const PARTNER_WEIGHTS = {
  loudSnoring:     2,
  breathingStops:  5,
  restless:        1.5,
  kicks:           1,
  talks:           0.5,
  disruption:      2,   // множник на значення 0-10
  multiplier:      3,   // загальна вага блоку
};

// Вага загального занепокоєння
export const CONCERN_WEIGHT = 1.5;