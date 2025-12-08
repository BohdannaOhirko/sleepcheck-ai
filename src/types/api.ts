// types/api.ts
// TypeScript типи для API та чат-бота

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  context?: {
    questionnaireData?: any;
    recentTopics?: string[];
  };
}

export interface ApiError {
  error: string;
  code?: string;
  details?: any;
}

// Експорт типів для зручності
export type MessageRole = 'user' | 'assistant';
export type ChatMessageArray = ChatMessage[];