import { CriticalSymptom, PossibleCondition } from '@/types/scenarios';

export function analyzeSymptoms(
  answers: Record<string, unknown>,
  bmi: number
): { symptoms: CriticalSymptom[]; conditions: PossibleCondition[] } {
  const symptoms: CriticalSymptom[] = [];
  const conditions: PossibleCondition[] = [];
  
  // Критичні симптоми дихання
  if (answers['breathing-pauses'] === true) {
    symptoms.push({
      id: 'breathing-pauses',
      name: 'Зупинки дихання уві сні',
      severity: 'critical',
      description: 'Головний симптом обструктивного апное сну. Потребує обстеження.'
    });
  }
  
  if (answers['gasping'] === true) {
    symptoms.push({
      id: 'gasping',
      name: 'Пробудження від задухи',
      severity: 'critical',
      description: 'Свідчить про епізоди гіпоксії (нестачі кисню) під час сну.'
    });
  }
  
  // Хропіння
  if (answers['snoring'] === true && (answers['snoring-loudness'] || 0) >= 7) {
    symptoms.push({
      id: 'loud-snoring',
      name: 'Гучне хропіння',
      severity: 'high',
      description: 'Гучне хропіння часто супроводжує апное сну.'
    });
  }
  
  // Денна сонливість
  if ((answers['daytime-sleepiness'] || 0) >= 7) {
    symptoms.push({
      id: 'severe-sleepiness',
      name: 'Виражена денна сонливість',
      severity: 'high',
      description: 'Небезпечна при керуванні транспортом.'
    });
  }
  
  if ((answers['falling-asleep-sitting'] || 0) >= 6) {
    symptoms.push({
      id: 'falling-asleep',
      name: 'Засинання під час діяльності',
      severity: 'high',
      description: 'Підвищує ризик аварій та травм.'
    });
  }
  
  // Супутні захворювання
  if (answers['hypertension'] === true) {
    symptoms.push({
      id: 'hypertension',
      name: 'Артеріальна гіпертензія',
      severity: 'moderate',
      description: 'Часто пов\'язана з апное сну.'
    });
  }
  
  if (answers['heart-disease'] === true) {
    symptoms.push({
      id: 'heart-disease',
      name: 'Захворювання серця',
      severity: 'critical',
      description: 'Потребує особливої уваги при апное.'
    });
  }
  
  // Фізичні показники
  if (bmi >= 30) {
    symptoms.push({
      id: 'obesity',
      name: `Підвищена вага (ІМТ: ${bmi.toFixed(1)})`,
      severity: bmi >= 35 ? 'high' : 'moderate',
      description: 'Головний фактор ризику апное сну.'
    });
  }
  
  if ((answers['neck-circumference'] || 0) >= 43) {
    symptoms.push({
      id: 'neck',
      name: 'Збільшений обхват шиї',
      severity: 'moderate',
      description: 'Підвищує ризик обструкції дихальних шляхів.'
    });
  }
  
  if (answers['morning-headaches'] === true) {
    symptoms.push({
      id: 'headaches',
      name: 'Ранкові головні болі',
      severity: 'moderate',
      description: 'Можуть бути наслідком нічної гіпоксії.'
    });
  }
  
  // Скарги партнера
  const partnerComplaints = answers['partner-complaints'] || [];
  if (partnerComplaints.includes('breathing-stops') && !symptoms.find(s => s.id === 'breathing-pauses')) {
    symptoms.push({
      id: 'partner-observed-apnea',
      name: 'Зупинки дихання (помічено партнером)',
      severity: 'critical',
      description: 'Важливий діагностичний критерій.'
    });
  }
  
  // Визначення можливих станів
  const hasCriticalApnea = answers['breathing-pauses'] || answers['gasping'] || partnerComplaints.includes('breathing-stops');
  const hasModerateApnea = answers['snoring'] && ((answers['daytime-sleepiness'] || 0) >= 5 || (answers['morning-freshness'] || 10) <= 4);
  
  if (hasCriticalApnea) {
    conditions.push({
      name: 'Обструктивне апное сну',
      probability: 'висока',
      description: 'Дихальні шляхи періодично блокуються під час сну.',
      icon: '😴'
    });
  } else if (hasModerateApnea) {
    conditions.push({
      name: 'Обструктивне апное сну',
      probability: 'помірна',
      description: 'Симптоми можуть вказувати на апное, потрібне обстеження.',
      icon: '😴'
    });
  }
  
  if (answers['snoring'] && !hasCriticalApnea) {
    conditions.push({
      name: 'Первинне хропіння',
      probability: hasModerateApnea ? 'можлива' : 'помірна',
      description: 'Хропіння без зупинок дихання. Може прогресувати.',
      icon: '🔊'
    });
  }
  
  if ((answers['sleep-onset'] || 0) >= 30 || (answers['night-awakenings'] || 0) >= 3) {
    conditions.push({
      name: 'Інсомнія (безсоння)',
      probability: 'можлива',
      description: 'Труднощі з засинанням або підтриманням сну.',
      icon: '🌙'
    });
  }
  
  if (partnerComplaints.includes('kicks') || partnerComplaints.includes('restless')) {
    conditions.push({
      name: 'Синдром неспокійних ніг',
      probability: 'можлива',
      description: 'Рухи ногами під час сну порушують його якість.',
      icon: '🦵'
    });
  }
  
  return { symptoms, conditions };
}