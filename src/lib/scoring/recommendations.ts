// lib/scoring/recommendations.ts
// Генерація персоналізованих рекомендацій на основі questionnaire.json

import { RiskLevel } from './risk-levels';

interface BMIValue {
  weight: number;
  height: number;
}

// ================================
// Хелпери
// ================================

function extractBMI(answers: Record<string, unknown>): number | null {
  if (!answers['bmi']) return null;
  const bmiData = answers['bmi'] as BMIValue | number;
  if (typeof bmiData === 'object' && bmiData.weight && bmiData.height) {
    const heightM = bmiData.height / 100;
    return bmiData.weight / (heightM * heightM);
  }
  return Number(bmiData);
}

// ================================
// Рекомендації за рівнем ризику
// ================================

const BASE_RECOMMENDATIONS: Record<RiskLevel, string[]> = {
  low: [
    '✅ Продовжуйте дотримуватися регулярного розкладу сну',
    '⏰ Лягайте і вставайте в один і той же час щодня',
    '☕ Уникайте кофеїну після 14:00',
    '🌡️ Підтримуйте комфортну температуру в спальні (18-20°C)',
    '📱 Обмежте використання гаджетів за годину до сну',
    '🏃 Займайтесь фізичною активністю регулярно, але не пізно ввечері',
  ],
  moderate: [
    '📞 Рекомендуємо проконсультуватися з лікарем-сомнологом',
    '📖 Ведіть щоденник сну протягом 2 тижнів',
    '⏰ Дотримуйтесь суворого розкладу сну',
    '🍷 Уникайте алкоголю за 3-4 години до сну',
    '💪 Зменшіть вагу при наявності зайвої ваги (навіть 5-10% допоможе)',
    '🛏️ Спіть на боці, а не на спині',
    '😴 Піднесіть голову ліжка на 10-15 см',
  ],
  high: [
    '⚠️ НАСТІЙНО рекомендуємо звернутися до спеціаліста-сомнолога',
    '📋 Необхідне проведення полісомнографії (дослідження сну)',
    '🚗 Будьте обережні при керуванні транспортом через денну сонливість',
    '👥 Попросіть партнера спостерігати за вашим диханням під час сну',
    '💊 Не приймайте снодійні препарати без консультації з лікарем',
    '🏥 Розгляньте можливість домашнього тестування сну',
    '⚖️ Зниження ваги є критично важливим',
  ],
  critical: [
    '🚨 ТЕРМІНОВО зверніться до спеціаліста-сомнолога!',
    '🏥 Необхідна негайна полісомнографія та консультація',
    '⚠️ НЕ керуйте транспортом при сильній денній сонливості',
    '💊 НЕ приймайте жодних препаратів без рецепта лікаря',
    '🛌 CPAP-терапія може бути життєво необхідною',
    '👨‍⚕️ Розгляньте можливість термінової госпіталізації для обстеження',
    '📞 Зателефонуйте в клініку сну найближчим часом',
  ],
};

// ================================
// Персоналізовані рекомендації
// ================================

function getPersonalizedRecommendations(answers: Record<string, unknown>): string[] {
  const recs: string[] = [];

  if (answers['snoring'] === true || answers['snoring'] === 'yes') {
    recs.push('😴 Спробуйте спати на боці замість спини — це зменшує хропіння');
    if (Number(answers['snoring-loudness']) >= 7) {
      recs.push('🔊 Дуже гучне хропіння вимагає обов\'язкової консультації лікаря');
    }
  }

  if (answers['breathing-pauses'] === true || answers['breathing-pauses'] === 'yes') {
    recs.push('🚨 КРИТИЧНО: Зупинки дихання — ознака обструктивного апное. Терміново до лікаря!');
  }

  if (answers['gasping'] === true || answers['gasping'] === 'yes') {
    recs.push('⚠️ Пробудження від задухи — серйозний симптом, потрібна консультація');
  }

  if (answers['mouth-breathing'] === true || answers['mouth-breathing'] === 'yes') {
    recs.push('👃 Перевірте носове дихання у ЛОРа — можлива назальна обструкція');
  }

  if (Number(answers['daytime-sleepiness']) >= 7) {
    recs.push('😴 При сильній денній сонливості уникайте керування транспортом');
    recs.push('☕ Короткий денний сон (15-20 хв) може допомогти, але не довше');
  }

  if (Number(answers['falling-asleep-sitting']) >= 7) {
    recs.push('⚠️ Засинання під час денної активності — ознака серйозного порушення сну');
  }

  if (Number(answers['concentration']) <= 3) {
    recs.push('🧠 Погана концентрація може покращитись після лікування апное');
  }

  if (answers['memory-issues'] === true || answers['memory-issues'] === 'yes') {
    recs.push('🧠 Проблеми з пам\'яттю часто пов\'язані з якістю сну');
  }

  if (Array.isArray(answers['mood-changes']) && answers['mood-changes'].length > 0) {
    if (answers['mood-changes'].includes('depression')) {
      recs.push('😔 Розгляньте консультацію з психотерапевтом паралельно з лікуванням сну');
    }
    if (answers['mood-changes'].includes('anxiety')) {
      recs.push('😰 Тривожність може як викликати, так і бути наслідком поганого сну');
    }
  }

  if (answers['morning-headaches'] === true || answers['morning-headaches'] === 'yes') {
    recs.push('🤕 Ранкові головні болі — типовий симптом апное сну');
  }

  const bmi = extractBMI(answers);
  if (bmi !== null) {
    if (bmi >= 30) {
      recs.push('💪 Ожиріння (ІМТ ≥ 30) — зниження ваги на 10% значно покращить симптоми');
      recs.push('🥗 Розгляньте консультацію з дієтологом для безпечного схуднення');
    } else if (bmi >= 25) {
      recs.push('⚖️ Зниження ваги навіть на 5-7% може покращити якість сну');
    }
  }

  if (Number(answers['age']) >= 50) {
    recs.push('👴 З віком ризик апное зростає — регулярні перевірки важливі');
  }

  if (Number(answers['neck-circumference']) > 43) {
    recs.push('📏 Великий обхват шиї (>43 см) — додатковий фактор ризику');
  }

  if (answers['hypertension'] === true || answers['hypertension'] === 'yes') {
    recs.push('💊 Лікування апное може допомогти контролювати артеріальний тиск');
  }

  if (answers['heart-disease'] === true || answers['heart-disease'] === 'yes') {
    recs.push('❤️ ВАЖЛИВО: При серцевих захворюваннях апное може бути небезпечним');
    recs.push('👨‍⚕️ Обов\'язково повідомте кардіолога про симптоми апное');
  }

  if (answers['diabetes'] === true || answers['diabetes'] === 'yes') {
    recs.push('💉 Апное може погіршувати контроль цукру в крові');
  }

  if (answers['smoking'] === true || answers['smoking'] === 'yes') {
    recs.push('🚭 Куріння збільшує ризик апное в 3 рази — розгляньте відмову');
  }

  if (Number(answers['alcohol']) >= 5) {
    recs.push('🍷 Алкоголь перед сном розслаблює м\'язи горла і погіршує апное');
    recs.push('⏰ Уникайте алкоголю мінімум за 3-4 години до сну');
  }

  if (Number(answers['physical-activity']) <= 3) {
    recs.push('🏃 Регулярна фізична активність покращує якість сну');
    recs.push('💪 Почніть з 30 хвилин помірної активності 5 днів на тиждень');
  }

  if (Array.isArray(answers['partner-complaints'])) {
    if (answers['partner-complaints'].includes('breathing-stops')) {
      recs.push('👥 КРИТИЧНО: Партнер помічає зупинки дихання — терміново до лікаря!');
    }
    if (answers['partner-complaints'].includes('loud-snoring')) {
      recs.push('🔊 Гучне хропіння заважає партнеру — це також потребує вирішення');
    }
  }

  if (Number(answers['partner-sleep-disruption']) >= 7) {
    recs.push('👥 Ваш сон сильно заважає партнеру — лікування покращить життя обох');
  }

  if (Number(answers['final-concern']) >= 7) {
    recs.push('😟 Ваше занепокоєння обґрунтоване — не відкладайте візит до лікаря');
  }

  return recs;
}

// ================================
// Публічні функції
// ================================

export function generateRecommendations(
  riskLevel: RiskLevel,
  answers: Record<string, unknown>
): string[] {
  return [
    ...BASE_RECOMMENDATIONS[riskLevel],
    ...getPersonalizedRecommendations(answers),
  ];
}

export function generateKeyTriggers(
  answers: Record<string, unknown>,
  totalScore: number
): string[] {
  const triggers: string[] = [];

  if (totalScore > 60) triggers.push('Високий загальний бал ризику');
  if (answers['snoring'] === true) triggers.push('Регулярне хропіння');
  if (answers['breathing-pauses'] === true) triggers.push('🚨 Зупинки дихання під час сну (КРИТИЧНО)');
  if (answers['gasping'] === true) triggers.push('Пробудження з відчуттям задухи');
  if (Number(answers['daytime-sleepiness']) >= 7) triggers.push('Висока денна сонливість');
  if (Number(answers['falling-asleep-sitting']) >= 7) triggers.push('Засинання під час денної активності');
  if (Number(answers['sleep-quality']) <= 3) triggers.push('Дуже погана якість сну');
  if (Number(answers['night-awakenings']) >= 4) triggers.push('Часті пробудження вночі');

  const bmi = extractBMI(answers);
  if (bmi !== null) {
    if (bmi >= 35) triggers.push('Ожиріння II-III ступеня (ІМТ ≥ 35)');
    else if (bmi >= 30) triggers.push('Ожиріння I ступеня (ІМТ ≥ 30)');
  }

  if (Number(answers['neck-circumference']) > 43) triggers.push('Великий обхват шиї (>43 см)');
  if (answers['heart-disease'] === true) triggers.push('Наявність серцево-судинних захворювань');
  if (answers['hypertension'] === true) triggers.push('Артеріальна гіпертензія');
  if (answers['morning-headaches'] === true) triggers.push('Ранкові головні болі');

  if (
    Array.isArray(answers['partner-complaints']) &&
    answers['partner-complaints'].includes('breathing-stops')
  ) {
    triggers.push('🚨 Партнер помічає зупинки дихання');
  }

  return triggers;
}

export function generateSummary(
  riskLevel: RiskLevel,
  totalScore: number,
  triggers: string[]
): string {
  const triggerText = (slice: number) =>
    triggers.length > 0
      ? `Виявлено ${triggers.length} тригерів, включаючи ${triggers.slice(0, slice).join(', ')}.`
      : '';

  const summaryTemplates: Record<RiskLevel, string> = {
    low: `На основі ваших відповідей (загальний бал: ${totalScore}) виявлено низьку ймовірність апное сну. Продовжуйте дотримуватися здорових звичок сну та регулярного розкладу.`,
    moderate: `Ваші відповіді (загальний бал: ${totalScore}) вказують на помірний ризик апное сну. ${triggerText(2)} Рекомендуємо проконсультуватися з лікарем-сомнологом.`,
    high: `УВАГА! Ваші відповіді (загальний бал: ${totalScore}) вказують на високий ризик апное сну. ${triggerText(3)} Настійно рекомендуємо звернутися до спеціаліста найближчим часом.`,
    critical: `🚨 КРИТИЧНО! Ваші відповіді (загальний бал: ${totalScore}) вказують на дуже високий ризик апное сну. ${triggerText(3)} ТЕРМІНОВО зверніться до спеціаліста-сомнолога!`,
  };

  return summaryTemplates[riskLevel];
}

export function generateNextSteps(riskLevel: RiskLevel): string[] {
  const nextStepsMap: Record<RiskLevel, string[]> = {
    low: [
      'Продовжуйте здоровий спосіб життя',
      'Підтримуйте регулярний розклад сну',
      'Займайтесь спортом регулярно',
      'Проходьте самоперевірку раз на рік',
      'Зверніться до лікаря при погіршенні симптомів',
    ],
    moderate: [
      'Запишіться на консультацію до сомнолога',
      'Ведіть щоденник сну протягом 2 тижнів',
      'Зробіть відео свого сну (якщо можливо)',
      'Підготуйте список всіх симптомів',
      'Розгляньте можливість домашнього тестування сну',
    ],
    high: [
      'ТЕРМІНОВО запишіться на консультацію до сомнолога',
      'Проведіть полісомнографію (дослідження сну)',
      'Обговоріть з лікарем варіанти лікування',
      'Почніть вести детальний щоденник сну',
      'Розпочніть зміни способу життя (дієта, спорт)',
    ],
    critical: [
      '🚨 НЕВІДКЛАДНО зателефонуйте в клініку сну',
      '🏥 Запишіться на термінову консультацію (протягом тижня)',
      '📋 Проведіть полісомнографію якнайшвидше',
      '💊 НЕ приймайте жодних снодійних без лікаря',
      '🚗 Обмежте керування транспортом',
      '👨‍⚕️ Повідомте про симптоми вашого сімейного лікаря',
    ],
  };

  return nextStepsMap[riskLevel];
}