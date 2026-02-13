import { z } from 'zod';

/**
 * Схема валідації для AI чату
 * Захищає від:
 * - Занадто довгих повідомлень (DDoS)
 * - Шкідливого коду (XSS, injection)
 * - Занадто великої історії чату
 */
export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string()
        .min(1, 'Повідомлення не може бути порожнім')
        .max(5000, 'Повідомлення занадто довге (макс 5000 символів)')
        .refine(
          (val) => {
            // Блокуємо небезпечні HTML/JS патерни
            const dangerousPatterns = /<script|javascript:|onerror=|onclick=|onload=|eval\(|Function\(/i;
            return !dangerousPatterns.test(val);
          },
          { message: 'Повідомлення містить небезпечний контент' }
        )
    })
  )
  .min(1, 'Має бути хоча б одне повідомлення')
  .max(50, 'Занадто багато повідомлень (макс 50)'),
  
  questionnaireData: z.string()
    .max(50000, 'Дані анкети занадто великі (макс 50KB)')
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        
        // Перевірка на небезпечні символи
        const dangerousPatterns = /<script|javascript:|onerror=|onclick=|onload=|eval\(|Function\(|__proto__|constructor/i;
        return !dangerousPatterns.test(val);
      },
      { message: 'Дані анкети містять небезпечний контент' }
    )
    .refine(
      (val) => {
        if (!val) return true;
        
        // Перевірка що це валідний JSON
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Дані анкети мають бути валідним JSON' }
    )
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;