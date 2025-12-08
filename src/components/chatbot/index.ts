// components/chatbot/index.ts
// Централізований експорт всіх компонентів чат-бота

export { default as ChatWidget } from './ChatWidget';
export { default as ChatMessage } from './ChatMessage';
export { default as ChatInput } from './ChatInput';
export { default as TypingIndicator } from './TypingIndicator';
export { default as ChatButton } from './ChatButton';

// Експорт hook
export { useAIChat } from '@/hooks/useAIChat';

// Експорт типів
export type { ChatMessage as ChatMessageType } from '@/types/api';
export type { ChatResponse, ChatRequest } from '@/types/api';