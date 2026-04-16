// hooks/useAIChat.ts
'use client';

import { useState, useCallback, useRef } from 'react';
import { ChatMessage } from '@/types/api';

const LIMIT_MESSAGE = `Дякую за вашу зацікавленість у темі сну! Бачу, що у вас багато запитань — це означає, що тема для вас справді важлива.

Щоб отримати повноцінну консультацію та індивідуальні рекомендації, пропоную зв'язатись з нашими спеціалістами напряму:

📞 **+380 98 881 4499**

Наші сомнологи допоможуть розібратись з вашою ситуацією детально. Будемо раді вас почути!`;

interface UseAIChatOptions {
  initialMessages?: ChatMessage[];
  onError?: (error: Error) => void;
  context?: {
    questionnaireData?: Record<string, unknown>;
  };
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    options.initialMessages || [
      {
        id: '1',
        role: 'assistant',
        content: 'Вітаю! Я консультант МЦ «Ехокор» з питань розладів сну. Чим можу допомогти?',
        timestamp: new Date(),
      },
    ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const USER_MESSAGE_LIMIT = 10;

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Рахуємо повідомлення користувача
      const userMessagesCount = messages.filter((m) => m.role === 'user').length + 1;

      if (userMessagesCount >= USER_MESSAGE_LIMIT) {
        setIsLimitReached(true);
        const limitMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: LIMIT_MESSAGE,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, limitMessage]);
        return;
      }

      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            context: options.context,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Помилка при отриманні відповіді');
        }

        const data = await response.json();

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Невідома помилка');

        if (error.name !== 'AbortError') {
          setError(error.message);
          options.onError?.(error);

          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Вибачте, виникла помилка. Спробуйте ще раз.',
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, errorMessage]);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading, options]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Привіт! 👋 Чим можу допомогти?',
        timestamp: new Date(),
      },
    ]);
    setError(null);
    setIsLimitReached(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isLimitReached,
    sendMessage,
    clearMessages,
    clearError,
  };
}