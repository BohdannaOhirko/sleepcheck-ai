// lib/scoring/recommendations.ts
// Генерація персоналізованих рекомендацій на основі questionnaire.json

import { RiskLevel } from './risk-levels';

/**
 * Генерує персоналізовані рекомендації на основі результатів
 */
export function generateRecommendations(
  riskLevel: RiskLevel,
  totalScore: number,
  answers: Record<string, any>
): string[] {
  const recommendations: string[] = [];
  
  // ================================
  // Базові рекомендації за рівнем ризику
  // ================================
  
  switch (riskLevel) {
    case 'low':
      recommendations.push(
        '✅ Продовжуйте дотримуватися регулярного розкладу сну',
        '⏰ Лягайте і вставайте в один і той же час щодня',
        '☕ Уникайте кофеїну після 14:00',
        '🌡️ Підтримуйте комфортну температуру в спальні (18-20°C)',
        '📱 Обмежте використання гаджетів за годину до сну',
        '🏃 Займайтесь фізичною активністю регулярно, але не пізно ввечері'
      );
      break;
      
    case 'moderate':
      recommendations.push(
        '📞 Рекомендуємо проконсультуватися з лікарем-сомнологом',
        '📖 Ведіть щоденник сну протягом 2 тижнів',
        '⏰ Дотримуйтесь суворого розкладу сну',
        '🍷 Уникайте алкоголю за 3-4 години до сну',
        '💪 Зменшіть вагу при наявності зайвої ваги (навіть 5-10% допоможе)',
        '🛏️ Спіть на боці, а не на спині',
        '😴 Піднесіть голову ліжка на 10-15 см'
      );
      break;
      
    case 'high':
      recommendations.push(
        '⚠️ НАСТІЙНО рекомендуємо звернутися до спеціаліста-сомнолога',
        '📋 Необхідне проведення полісомнографії (дослідження сну)',
        '🚗 Будьте обережні при керуванні транспортом через денну сонливість',
        '👥 Попросіть партнера спостерігати за вашим диханням під час сну',
        '💊 Не приймайте снодійні препарати без консультації з лікарем',
        '🏥 Розгляньте можливість домашнього тестування сну',
        '⚖️ Зниження ваги є критично важливим'
      );
      break;
      
    case 'critical':
      recommendations.push(
        '🚨 ТЕРМІНОВО зверніться до спеціаліста-сомнолога!',
        '🏥 Необхідна негайна полісомнографія та консультація',
        '⚠️ НЕ керуйте транспортом при сильній денній сонливості',
        '💊 НЕ приймайте жодних препаратів без рецепта лікаря',
        '🛌 CPAP-терапія може бути життєво необхідною',
        '👨‍⚕️ Розгляньте можливість термінової госпіталізації для обстеження',
        '📞 Зателефонуйте в клініку сну найближчим часом'
      );
      break;
  }
  
  // ================================
  // Додаткові рекомендації на основі конкретних відповідей
  // ================================
  
  // Хропіння (snoring)
  if (answers['snoring'] === true || answers['snoring'] === 'yes') {
    recommendations.push('😴 Спробуйте спати на боці замість спини - це зменшує хропіння');
    
    // Гучне хропіння (snoring-loudness)
    if (answers['snoring-loudness'] && Number(answers['snoring-loudness']) >= 7) {
      recommendations.push('🔊 Дуже гучне хропіння вимагає обов\'язкової консультації лікаря');
    }
  }
  
  // Зупинки дихання (breathing-pauses) - КРИТИЧНО!
  if (answers['breathing-pauses'] === true || answers['breathing-pauses'] === 'yes') {
    recommendations.push('🚨 КРИТИЧНО: Зупинки дихання - це ознака обструктивного апное. Терміново до лікаря!');
  }
  
  // Пробудження від задухи (gasping)
  if (answers['gasping'] === true || answers['gasping'] === 'yes') {
    recommendations.push('⚠️ Пробудження від задухи - серйозний симптом, потрібна консультація');
  }
  
  // Дихання ротом (mouth-breathing)
  if (answers['mouth-breathing'] === true || answers['mouth-breathing'] === 'yes') {
    recommendations.push('👃 Перевірте носове дихання у ЛОРа - можлива назальна обструкція');
  }
  
  // Висока денна сонливість (daytime-sleepiness)
  if (answers['daytime-sleepiness'] && Number(answers['daytime-sleepiness']) >= 7) {
    recommendations.push('😴 При сильній денній сонливості уникайте керування транспортом');
    recommendations.push('☕ Короткий денний сон (15-20 хв) може допомогти, але не довше');
  }
  
  // Засинання під час діяльності (falling-asleep-sitting)
  if (answers['falling-asleep-sitting'] && Number(answers['falling-asleep-sitting']) >= 7) {
    recommendations.push('⚠️ Засинання під час денної активності - ознака серйозного порушення сну');
  }
  
  // Погана концентрація (concentration)
  if (answers['concentration'] && Number(answers['concentration']) <= 3) {
    recommendations.push('🧠 Погана концентрація може покращитись після лікування апное');
  }
  
  // Проблеми з пам\'яттю (memory-issues)
  if (answers['memory-issues'] === true || answers['memory-issues'] === 'yes') {
    recommendations.push('🧠 Проблеми з пам\'яттю часто пов\'язані з якістю сну');
  }
  
  // Зміни настрою (mood-changes)
  if (Array.isArray(answers['mood-changes']) && answers['mood-changes'].length > 0) {
    if (answers['mood-changes'].includes('depression')) {
      recommendations.push('😔 Розгляньте консультацію з психотерапевтом паралельно з лікуванням сну');
    }
    if (answers['mood-changes'].includes('anxiety')) {
      recommendations.push('😰 Тривожність може як викликати, так і бути наслідком поганого сну');
    }
  }
  
  // Ранкові головні болі (morning-headaches)
  if (answers['morning-headaches'] === true || answers['morning-headaches'] === 'yes') {
    recommendations.push('🤕 Ранкові головні болі - типовий симптом апное сну');
  }
  
  // BMI (надмірна вага/ожиріння)
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
    
    if (bmiValue >= 30) {
      recommendations.push('💪 Ожиріння (ІМТ ≥ 30) - зниження ваги на 10% значно покращить симптоми');
      recommendations.push('🥗 Розгляньте консультацію з дієтологом для безпечного схуднення');
    } else if (bmiValue >= 25) {
      recommendations.push('⚖️ Зниження ваги навіть на 5-7% може покращити якість сну');
    }
  }
  
  // Вік (age)
  if (answers['age'] && Number(answers['age']) >= 50) {
    recommendations.push('👴 З віком ризик апное зростає - регулярні перевірки важливі');
  }
  
  // Обхват шиї (neck-circumference)
  if (answers['neck-circumference'] && Number(answers['neck-circumference']) > 43) {
    recommendations.push('📏 Великий обхват шиї (>43 см) - додатковий фактор ризику');
  }
  
  // Гіпертонія (hypertension)
  if (answers['hypertension'] === true || answers['hypertension'] === 'yes') {
    recommendations.push('💊 Лікування апное може допомогти контролювати артеріальний тиск');
  }
  
  // Серцеві захворювання (heart-disease)
  if (answers['heart-disease'] === true || answers['heart-disease'] === 'yes') {
    recommendations.push('❤️ ВАЖЛИВО: При серцевих захворюваннях апное може бути небезпечним');
    recommendations.push('👨‍⚕️ Обов\'язково повідомте кардіолога про симптоми апное');
  }
  
  // Діабет (diabetes)
  if (answers['diabetes'] === true || answers['diabetes'] === 'yes') {
    recommendations.push('💉 Апное може погіршувати контроль цукру в крові');
  }
  
  // Куріння (smoking)
  if (answers['smoking'] === true || answers['smoking'] === 'yes') {
    recommendations.push('🚭 Куріння збільшує ризик апное в 3 рази - розгляньте відмову');
  }
  
  // Алкоголь перед сном (alcohol)
  if (answers['alcohol'] && Number(answers['alcohol']) >= 5) {
    recommendations.push('🍷 Алкоголь перед сном розслаблює м\'язи горла і погіршує апное');
    recommendations.push('⏰ Уникайте алкоголю мінімум за 3-4 години до сну');
  }
  
  // Низька фізична активність (physical-activity)
  if (answers['physical-activity'] && Number(answers['physical-activity']) <= 3) {
    recommendations.push('🏃 Регулярна фізична активність покращує якість сну');
    recommendations.push('💪 Почніть з 30 хвилин помірної активності 5 днів на тиждень');
  }
  
  // Скарги партнера (partner-complaints)
  if (Array.isArray(answers['partner-complaints'])) {
    if (answers['partner-complaints'].includes('breathing-stops')) {
      recommendations.push('👥 КРИТИЧНО: Партнер помічає зупинки дихання - терміново до лікаря!');
    }
    if (answers['partner-complaints'].includes('loud-snoring')) {
      recommendations.push('🔊 Гучне хропіння заважає партнеру - це також потребує вирішення');
    }
  }
  
  // Порушення сну партнера (partner-sleep-disruption)
  if (answers['partner-sleep-disruption'] && Number(answers['partner-sleep-disruption']) >= 7) {
    recommendations.push('👥 Ваш сон сильно заважає партнеру - лікування покращить життя обох');
  }
  
  // Стурбованість (final-concern)
  if (answers['final-concern'] && Number(answers['final-concern']) >= 7) {
    recommendations.push('😟 Ваше занепокоєння обґрунтоване - не відкладайте візит до лікаря');
  }
  
  return recommendations;
}

/**
 * Генерує ключові тригери (симптоми що викликають занепокоєння)
 */
export function generateKeyTriggers(
  answers: Record<string, any>,
  totalScore: number
): string[] {
  const triggers: string[] = [];
  
  // Високий загальний бал
  if (totalScore > 60) {
    triggers.push('Високий загальний бал ризику');
  }
  
  // Критичні симптоми з JSON (critical: true)
  if (answers['snoring'] === true) {
    triggers.push('Регулярне хропіння');
  }
  
  if (answers['breathing-pauses'] === true) {
    triggers.push('🚨 Зупинки дихання під час сну (КРИТИЧНО)');
  }
  
  if (answers['gasping'] === true) {
    triggers.push('Пробудження з відчуттям задухи');
  }
  
  // Денна сонливість
  if (answers['daytime-sleepiness'] && Number(answers['daytime-sleepiness']) >= 7) {
    triggers.push('Висока денна сонливість');
  }
  
  // Засинання під час діяльності
  if (answers['falling-asleep-sitting'] && Number(answers['falling-asleep-sitting']) >= 7) {
    triggers.push('Засинання під час денної активності');
  }
  
  // Погана якість сну
  if (answers['sleep-quality'] && Number(answers['sleep-quality']) <= 3) {
    triggers.push('Дуже погана якість сну');
  }
  
  // Часті нічні пробудження
  if (answers['night-awakenings'] && Number(answers['night-awakenings']) >= 4) {
    triggers.push('Часті пробудження вночі');
  }
  
  // Ожиріння (BMI)
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
    
    if (bmiValue >= 35) {
      triggers.push('Ожиріння II-III ступеня (ІМТ ≥ 35)');
    } else if (bmiValue >= 30) {
      triggers.push('Ожиріння I ступеня (ІМТ ≥ 30)');
    }
  }
  
  // Великий обхват шиї
  if (answers['neck-circumference'] && Number(answers['neck-circumference']) > 43) {
    triggers.push('Великий обхват шиї (>43 см)');
  }
  
  // Серцеві захворювання
  if (answers['heart-disease'] === true) {
    triggers.push('Наявність серцево-судинних захворювань');
  }
  
  // Гіпертонія
  if (answers['hypertension'] === true) {
    triggers.push('Артеріальна гіпертензія');
  }
  
  // Ранкові головні болі
  if (answers['morning-headaches'] === true) {
    triggers.push('Ранкові головні болі');
  }
  
  // Спостереження партнера
  if (Array.isArray(answers['partner-complaints'])) {
    if (answers['partner-complaints'].includes('breathing-stops')) {
      triggers.push('🚨 Партнер помічає зупинки дихання');
    }
  }
  
  return triggers;
}

/**
 * Генерує короткий висновок (summary)
 */
export function generateSummary(
  riskLevel: RiskLevel,
  totalScore: number,
  triggers: string[]
): string {
  const summaryTemplates = {
    low: `На основі ваших відповідей (загальний бал: ${totalScore}) виявлено низьку ймовірність апное сну. Продовжуйте дотримуватися здорових звичок сну та регулярного розкладу.`,
    
    moderate: `Ваші відповіді (загальний бал: ${totalScore}) вказують на помірний ризик апное сну. ${
      triggers.length > 0 
        ? `Виявлено ${triggers.length} потенційних тригерів, включаючи ${triggers.slice(0, 2).join(', ')}.` 
        : ''
    } Рекомендуємо проконсультуватися з лікарем-сомнологом для детального обстеження.`,
    
    high: `УВАГА! Ваші відповіді (загальний бал: ${totalScore}) вказують на високий ризик апное сну. ${
      triggers.length > 0 
        ? `Виявлено ${triggers.length} серйозних тригерів, включаючи ${triggers.slice(0, 3).join(', ')}.` 
        : ''
    } Настійно рекомендуємо звернутися до спеціаліста найближчим часом.`,
    
    critical: `🚨 КРИТИЧНО! Ваші відповіді (загальний бал: ${totalScore}) вказують на дуже високий ризик апное сну. ${
      triggers.length > 0 
        ? `Виявлено ${triggers.length} критичних тригерів: ${triggers.slice(0, 3).join(', ')}.` 
        : ''
    } ТЕРМІНОВО зверніться до спеціаліста-сомнолога! Ця ситуація потребує невідкладної медичної допомоги.`
  };
  
  return summaryTemplates[riskLevel];
}

/**
 * Генерує список наступних кроків
 */
export function generateNextSteps(riskLevel: RiskLevel): string[] {
  const nextStepsMap = {
    low: [
      'Продовжуйте здоровий спосіб життя',
      'Підтримуйте регулярний розклад сну',
      'Займайтесь спортом регулярно',
      'Проходьте самоперевірку раз на рік',
      'Зверніться до лікаря при погіршенні симптомів'
    ],
    moderate: [
      'Запишіться на консультацію до сомнолога',
      'Ведіть щоденник сну протягом 2 тижнів',
      'Зробіть фото/відео свого сну (якщо можливо)',
      'Підготуйте список всіх симптомів',
      'Розгляньте можливість домашнього тестування сну'
    ],
    high: [
      'ТЕРМІНОВО запишіться на консультацію до сомнолога',
      'Проведіть полісомнографію (дослідження сну)',
      'Обговоріть з лікарем варіанти лікування',
      'Почніть вести детальний щоденник сну',
      'Розпочніть зміни способу життя (дієта, спорт)'
    ],
    critical: [
      '🚨 НЕВІДКЛАДНО зателефонуйте в клініку сну',
      '🏥 Запишіться на термінову консультацію (протягом тижня)',
      '📋 Проведіть полісомнографію якнайшвидше',
      '💊 НЕ приймайте жодних снодійних без лікаря',
      '🚗 Обмежте керування транспортом',
      '👨‍⚕️ Повідомте про симптоми вашого сімейного лікаря'
    ]
  };
  
  return nextStepsMap[riskLevel];
}