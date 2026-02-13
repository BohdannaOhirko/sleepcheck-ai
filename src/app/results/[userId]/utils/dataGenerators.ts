import { PossibleCondition, UrgencyLevel, Examination } from '@/types/scenarios';

export function getUrgencyData(risk: string, answers: Record<string, any>): UrgencyLevel {
  const examinations: Examination[] = [];
  const specialists: string[] = [];

  if (risk === 'critical' || risk === 'high') {
    examinations.push({
      name: 'Полісомнографія (дослідження сну)',
      description: 'Комплексне дослідження сну для точної діагностики апное',
      urgency: 'Невідкладно - протягом 1-2 тижнів'
    });
    
    examinations.push({
      name: 'Консультація сомнолога',
      description: 'Спеціаліст з розладів сну для інтерпретації результатів',
      urgency: 'Невідкладно'
    });

    specialists.push('Сомнолог', 'Отоларинголог (ЛОР)');
    
    if (answers.hypertension || answers['heart-disease']) {
      examinations.push({
        name: 'ЕКГ та консультація кардіолога',
        description: 'Перевірка серцево-судинної системи',
        urgency: 'Рекомендовано'
      });
      specialists.push('Кардіолог');
    }
  } else if (risk === 'moderate') {
    examinations.push({
      name: 'Консультація сомнолога',
      description: 'Первинна консультація для оцінки необхідності подальших досліджень',
      urgency: 'Протягом місяця'
    });
    
    examinations.push({
      name: 'Огляд ЛОРа',
      description: 'Перевірка верхніх дихальних шляхів',
      urgency: 'Рекомендовано'
    });

    specialists.push('Сомнолог', 'Отоларинголог (ЛОР)');
  }

  examinations.push({
    name: 'Аналізи крові',
    description: 'Загальний аналіз, глюкоза, гормони щитовидної залози',
    urgency: 'Рекомендовано'
  });

  // Визначення timeline
  const timeline = risk === 'critical' || risk === 'high' 
    ? 'Невідкладно - протягом 1-2 тижнів' 
    : 'Протягом 1-2 місяців';

  // Повертаємо об'єкт що відповідає типу UrgencyLevel
  return {
    level: risk === 'critical' ? 'critical' : risk === 'high' ? 'high' : risk === 'moderate' ? 'moderate' : 'low',
    title: risk === 'critical' ? 'Критичний' : risk === 'high' ? 'Високий' : risk === 'moderate' ? 'Помірний' : 'Низький',
    timeframe: timeline,
    color: risk === 'critical' || risk === 'high' ? '#dc2626' : '#f59e0b',
    bgColor: risk === 'critical' || risk === 'high' ? '#fee2e2' : '#fef3c7',
    borderColor: risk === 'critical' || risk === 'high' ? '#b91c1c' : '#d97706',
    icon: risk === 'critical' || risk === 'high' ? 'alert-circle' : 'alert-triangle',
    description: 'Рекомендується консультація спеціаліста',
    actions: [],
    specialists,
    examinations
  };
}

export function getPossibleConditions(risk: string, answers: Record<string, any>): PossibleCondition[] {
  const conditions: PossibleCondition[] = [];

  if (risk === 'critical' || risk === 'high') {
    conditions.push({
      name: 'Обструктивне апное сну',
      icon: 'alert-circle',
      probability: 'висока',
      description: 'Повторювані епізоди зупинки дихання під час сну через блокування дихальних шляхів'
    });

    if (answers['breathing-pauses']) {
      conditions.push({
        name: 'Важке апное (ІАГ > 30)',
        icon: 'alert-triangle',
        probability: 'висока',
        description: 'Більше 30 епізодів апное за годину, потребує негайного лікування'
      });
    }

    if (answers.hypertension || answers['heart-disease']) {
      conditions.push({
        name: 'Серцево-судинні ускладнення',
        icon: 'heart',
        probability: 'помірна',
        description: 'Апное збільшує навантаження на серце та підвищує ризик аритмії'
      });
    }

    if (answers.diabetes || answers.bmi > 30) {
      conditions.push({
        name: 'Метаболічний синдром',
        icon: 'activity',
        probability: 'помірна',
        description: 'Порушення обміну речовин, резистентність до інсуліну'
      });
    }
  } else if (risk === 'moderate') {
    conditions.push({
      name: 'Легке або помірне апное',
      icon: 'info',
      probability: 'помірна',
      description: '5-30 епізодів апное за годину, рекомендується консультація'
    });

    if (answers.snoring > 7) {
      conditions.push({
        name: 'Первинний хропіння',
        icon: 'moon',
        probability: 'висока',
        description: 'Хропіння без зупинок дихання, але може прогресувати до апное'
      });
    }
  }

  if (answers['daytime-sleepiness'] > 7) {
    conditions.push({
      name: 'Синдром надмірної денної сонливості',
      icon: 'sun',
      probability: risk === 'high' ? 'висока' : 'помірна',
      description: 'Постійна втома та неконтрольована сонливість протягом дня'
    });
  }

  if (answers.depression || answers['mood-changes']) {
    conditions.push({
      name: 'Порушення настрою',
      icon: 'brain',
      probability: 'можлива',
      description: 'Депресія, тривожність, дратівливість через хронічне недосипання'
    });
  }

  return conditions;
}

export function generateRecommendations(risk: string, answers: Record<string, any>): string[] {
  const recommendations: string[] = [];

  if (risk === 'critical' || risk === 'high') {
    recommendations.push('Негайно зверніться до лікаря-сомнолога для детального обстеження');
    recommendations.push('Розгляньте можливість проведення полісомнографії (дослідження сну)');
  }

  if (answers.snoring === 'yes' || answers.snoring === true) {
    recommendations.push('Уникайте сну на спині, спробуйте спати на боці');
  }

  if (answers.alcohol > 5) {
    recommendations.push('Зменште вживання алкоголю перед сном');
  }

  if (answers.smoking === 'yes' || answers.smoking === true) {
    recommendations.push('Розгляньте можливість кинути палити для покращення дихання');
  }

  if (answers['physical-activity'] < 5) {
    recommendations.push('Збільште фізичну активність - займайтеся спортом 3-4 рази на тиждень');
  }

  return recommendations;
}