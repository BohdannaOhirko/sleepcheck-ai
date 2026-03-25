// lib/ai/context-builder.ts
// Формування контексту для AI на основі даних користувача

export interface UserQuestionnaireData {
  riskLevel?: string;
  keyIssues?: string[];
  totalScore?: number;
  fallAsleepTime?: number;
  sleepQuality?: number;
  nightAwakenings?: number;
  [key: string]: unknown;
}

export class ContextBuilder {
  /**
   * Створює контекст на основі результатів анкети
   */
  static buildFromQuestionnaire(data: UserQuestionnaireData): string {
    if (!data || Object.keys(data).length === 0) {
      return '\nКОНТЕКСТ: Це перша розмова з користувачем.';
    }

    const issues = data.keyIssues?.length 
      ? data.keyIssues.join(', ') 
      : 'не визначено';

    return `
КОНТЕКСТ КОРИСТУВАЧА (з анкети):
━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Рівень ризику: ${data.riskLevel || 'не визначено'}
⚠️ Ключові проблеми: ${issues}
💯 Загальний бал: ${data.totalScore || '—'}
⏱️ Час засинання: ${data.fallAsleepTime || '—'} хв
⭐ Якість сну: ${data.sleepQuality || '—'}/10
🌙 Прокидання вночі: ${data.nightAwakenings || '—'} разів
━━━━━━━━━━━━━━━━━━━━━━━━━━

Використовуй ці дані для персоналізованих рекомендацій та при необхідності рекомендуй послуги Ехокор.
`;
  }

  /**
   * Додає контекст про час доби
   */
  static addTimeContext(): string {
    const hour = new Date().getHours();
    
    if (hour >= 22 || hour < 6) {
      return '\n🌙 Зараз нічний час. Якщо користувач не спить, м\'яко запитай чи все гаразд.';
    } else if (hour >= 6 && hour < 12) {
      return '\n☀️ Зараз ранок. Добре для обговорення ранкових ритуалів.';
    } else if (hour >= 20 && hour < 22) {
      return '\n🌆 Зараз вечір. Добре для обговорення підготовки до сну.';
    }
    
    return '';
  }

  /**
   * Комплексний білдер контексту
   */
  static buildComplete(params: {
    questionnaireData?: UserQuestionnaireData | null;
    includeTime?: boolean;
  }): string {
    let context = '';

    // Основний контекст з анкети
    if (params.questionnaireData) {
      context = this.buildFromQuestionnaire(params.questionnaireData);
    }

    // Контекст часу
    if (params.includeTime) {
      context += this.addTimeContext();
    }

    return context;
  }
}