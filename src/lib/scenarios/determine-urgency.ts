import { CriticalSymptom, UrgencyLevel } from '@/types/scenarios';

export function determineUrgency(
  symptoms: CriticalSymptom[],
  answers: Record<string, any>,
  bmi: number
): UrgencyLevel {
  const criticalCount = symptoms.filter(s => s.severity === 'critical').length;
  const highCount = symptoms.filter(s => s.severity === 'high').length;
  
  const hasHeartDisease = answers['heart-disease'] === true;
  const hasSevereSymptoms = answers['breathing-pauses'] || answers['gasping'];
  const hasDangerousSleepiness = (answers['falling-asleep-sitting'] || 0) >= 7;
  
  // Критичний рівень
  if (criticalCount >= 2 || (criticalCount >= 1 && hasHeartDisease) || (hasSevereSymptoms && hasDangerousSleepiness)) {
    return {
      level: 'critical',
      title: 'Терміновий візит до лікаря',
      timeframe: '1-2 тижні',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      icon: '🚨',
      description: 'Ваші симптоми потребують термінової медичної оцінки.',
      actions: [
        'Запишіться до терапевта цього тижня',
        'Попросіть направлення до сомнолога',
        'Уникайте водіння при сонливості',
        'Не вживайте алкоголь та снодійні'
      ],
      specialists: ['Сомнолог', 'Пульмонолог', 'Кардіолог'],
      examinations: [
        { name: 'Полісомнографія', description: 'Дослідження сну — золотий стандарт', urgency: 'Пріоритетно' },
        { name: 'Пульсоксиметрія', description: 'Вимірювання кисню під час сну', urgency: 'Можна вдома' },
        { name: 'ЕКГ та ЕхоКГ', description: 'Оцінка стану серця', urgency: 'При серцевих скаргах' }
      ]
    };
  }
  
  // Високий рівень
  if (criticalCount >= 1 || highCount >= 2 || (highCount >= 1 && bmi >= 30)) {
    return {
      level: 'high',
      title: 'Плановий візит до лікаря',
      timeframe: '2-4 тижні',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-500',
      icon: '⚠️',
      description: 'Є симптоми, які потребують медичної оцінки.',
      actions: [
        'Запишіться до терапевта протягом місяця',
        'Ведіть щоденник сну до візиту',
        'Попросіть партнера записати відео сну'
      ],
      specialists: ['Терапевт', 'Сомнолог', 'ЛОР'],
      examinations: [
        { name: 'Консультація сомнолога', description: 'Оцінка та призначення обстеження', urgency: 'Рекомендовано' },
        { name: 'Домашній тест на апное', description: 'Портативний пристрій для скринінгу', urgency: 'Альтернатива' },
        { name: 'Аналіз крові', description: 'Загальний, глюкоза, ліпідограма', urgency: 'Базове' }
      ]
    };
  }
  
  // Помірний рівень
  if (highCount >= 1 || symptoms.length >= 2) {
    return {
      level: 'moderate',
      title: 'Консультація за можливості',
      timeframe: '1-3 місяці',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      icon: '💡',
      description: 'Є симптоми, на які варто звернути увагу.',
      actions: [
        'Спробуйте змінити звички сну',
        'Відстежуйте покращення симптомів',
        'Якщо не покращується — до лікаря'
      ],
      specialists: ['Терапевт'],
      examinations: [
        { name: 'Огляд терапевта', description: 'Загальна оцінка здоров\'я', urgency: 'За можливості' },
        { name: 'Контроль тиску', description: 'Вимірювання вдома протягом тижня', urgency: 'Самостійно' }
      ]
    };
  }
  
  // Низький рівень
  return {
    level: 'low',
    title: 'Профілактика та самоконтроль',
    timeframe: 'За бажанням',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    icon: '✅',
    description: 'Ваші показники в межах норми.',
    actions: [
      'Дотримуйтесь режиму сну',
      'Підтримуйте здорову вагу',
      'Уникайте алкоголю перед сном',
      'Повторіть тест через 6-12 місяців'
    ],
    specialists: [],
    examinations: [
      { name: 'Профілактичний огляд', description: 'Щорічний огляд у терапевта', urgency: 'Планово' }
    ]
  };
}