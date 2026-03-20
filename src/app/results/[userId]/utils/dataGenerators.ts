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
  } else {
    // low
    examinations.push({
      name: 'Профілактичний огляд',
      description: 'Щорічний профілактичний огляд у терапевта',
      urgency: 'Планово - раз на рік'
    });
  }

  examinations.push({
    name: 'Аналізи крові',
    description: 'Загальний аналіз, глюкоза, гормони щитовидної залози',
    urgency: 'Рекомендовано'
  });

  const timeline = risk === 'critical' || risk === 'high'
    ? 'Невідкладно - протягом 1-2 тижнів'
    : risk === 'moderate'
      ? 'Протягом 1-2 місяців'
      : 'Планово - раз на рік';

  return {
    level: risk === 'critical' ? 'critical' : risk === 'high' ? 'high' : risk === 'moderate' ? 'moderate' : 'low',
    title: risk === 'critical' ? 'Критичний' : risk === 'high' ? 'Високий' : risk === 'moderate' ? 'Помірний' : 'Низький',
    timeframe: timeline,
    color: risk === 'critical' || risk === 'high' ? '#dc2626' : risk === 'moderate' ? '#f59e0b' : '#16a34a',
    bgColor: risk === 'critical' || risk === 'high' ? '#fee2e2' : risk === 'moderate' ? '#fef3c7' : '#f0fdf4',
    borderColor: risk === 'critical' || risk === 'high' ? '#b91c1c' : risk === 'moderate' ? '#d97706' : '#15803d',
    icon: risk === 'critical' || risk === 'high' ? 'alert-circle' : risk === 'moderate' ? 'alert-triangle' : 'check-circle',
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

    if (answers.diabetes || (answers.bmi && answers.bmi > 30)) {
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

    if (answers['snoring-loudness'] > 7) {
      conditions.push({
        name: 'Первинне хропіння',
        icon: 'moon',
        probability: 'висока',
        description: 'Хропіння без зупинок дихання, але може прогресувати до апное'
      });
    }
  }

  // Денна сонливість — тільки при помірному ризику і вище
  if (risk !== 'low' && answers['daytime-sleepiness'] > 7) {
    conditions.push({
      name: 'Синдром надмірної денної сонливості',
      icon: 'sun',
      probability: risk === 'high' || risk === 'critical' ? 'висока' : 'помірна',
      description: 'Постійна втома та неконтрольована сонливість протягом дня'
    });
  }

  // Порушення настрою — тільки при помірному і вище
  if (risk !== 'low') {
    const moodChanges = answers['mood-changes'];
    const hasMood = Array.isArray(moodChanges)
      ? moodChanges.some((m: string) => ['depression', 'anxiety', 'irritability'].includes(m))
      : false;

    if (hasMood) {
      conditions.push({
        name: 'Порушення настрою',
        icon: 'brain',
        probability: 'можлива',
        description: 'Депресія, тривожність, дратівливість через хронічне недосипання'
      });
    }
  }

  return conditions;
}

export function generateRecommendations(risk: string, answers: Record<string, any>): string[] {
  const recommendations: string[] = [];

  if (risk === 'critical') {
    recommendations.push('Негайно зверніться до лікаря-сомнолога для детального обстеження');
    recommendations.push('Пройдіть полісомнографію (дослідження сну) якомога швидше');
    recommendations.push('До консультації — уникайте сну на спині, спіть на боці');
    recommendations.push('Не керуйте автомобілем при сильній денній сонливості');
  } else if (risk === 'high') {
    recommendations.push('Зверніться до лікаря-сомнолога протягом найближчих 2 тижнів');
    recommendations.push('Розгляньте можливість проведення полісомнографії (дослідження сну)');
    recommendations.push('Уникайте сну на спині, спробуйте спати на боці');
  } else if (risk === 'moderate') {
    recommendations.push('Проконсультуйтесь із сімейним лікарем щодо якості сну');
    recommendations.push('Дотримуйтесь режиму сну — лягайте та прокидайтесь в один час');

    if (answers.snoring === true || answers.snoring === 'yes') {
      recommendations.push('Уникайте сну на спині, спробуйте спати на боці');
    }
    if (Number(answers.alcohol) > 5) {
      recommendations.push('Зменште вживання алкоголю перед сном');
    }
    if (Number(answers['physical-activity']) < 5) {
      recommendations.push('Збільште фізичну активність — займайтеся спортом 3-4 рази на тиждень');
    }
  } else {
    // low
    recommendations.push('Продовжуйте дотримуватися здорових звичок сну');
    recommendations.push('Лягайте спати та прокидайтесь в один і той самий час щодня');
    recommendations.push('Уникайте екранів за 30-60 хвилин до сну');

    if (Number(answers['physical-activity']) < 4) {
      recommendations.push('Регулярна фізична активність покращує якість сну');
    }
    if (Number(answers.alcohol) > 3) {
      recommendations.push('Зменште вживання алкоголю перед сном для кращого відпочинку');
    }
  }

  return recommendations;
}