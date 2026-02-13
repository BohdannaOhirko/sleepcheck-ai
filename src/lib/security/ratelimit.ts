import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiters для різних endpoint'ів
 */

// AI Chat: 10 запитів на хвилину
export const aiChatRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:ai-chat',
});

// Email форми: 3 запити на 10 хвилин
export const emailRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '10 m'),
  analytics: true,
  prefix: 'ratelimit:email',
});

/**
 * Отримує IP адресу клієнта з headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (cfIp) return cfIp.trim();
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp.trim();
  
  return '127.0.0.1'; // Fallback для локальної розробки
}