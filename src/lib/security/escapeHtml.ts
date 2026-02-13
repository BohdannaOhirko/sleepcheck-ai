/**
 * Екранування HTML для запобігання XSS атак
 * 
 * Перетворює небезпечні символи у HTML entities:
 * < стає &lt;
 * > стає &gt;
 * " стає &quot;
 * & стає &amp;
 * ' стає &#039;
 * 
 * @param str - Рядок для екранування
 * @returns Безпечний рядок
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  
  return str
    .replace(/&/g, '&amp;')   // Має бути першим!
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Екранування всіх строкових полів в об'єкті
 */
export function escapeFormData<T extends Record<string, any>>(data: T): T {
  const escaped = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      escaped[key as keyof T] = escapeHtml(value) as T[keyof T];
    } else {
      escaped[key as keyof T] = value;
    }
  }
  
  return escaped;
}