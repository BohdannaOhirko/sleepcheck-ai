// components/chatbot/ChatWidget.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { Moon, Sparkles, X } from 'lucide-react';
import { useAIChat } from '@/hooks/useAIChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface ChatWidgetProps {
  questionnaireData?: any;
  onClose?: () => void;
  className?: string;
}

const QUICK_QUESTIONS = [
  { id: 'insomnia', text: 'Не можу заснути вночі' },
  { id: 'quality', text: 'Як покращити якість сну?' },
  { id: 'waking', text: 'Прокидаюсь посеред ночі' },
  { id: 'apnea', text: 'Що таке апное сну?' },
];

export default function ChatWidget({ 
  questionnaireData, 
  onClose,
  className = '' 
}: ChatWidgetProps) {
  const { messages, isLoading, error, sendMessage, clearError } = useAIChat({
    context: { questionnaireData },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className={`flex flex-col h-full bg-background ${className}`}>
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg relative">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/20 p-2 rounded-lg backdrop-blur-sm">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                Консультант зі сну
                <Sparkles className="w-4 h-4" />
              </h1>
              <p className="text-primary-foreground/80 text-xs">
                AI-помічник центру "Ехокор"
              </p>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              aria-label="Закрити чат"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-3 mx-4 mt-4 rounded-lg">
          <div className="flex justify-between items-start">
            <p className="text-destructive text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-destructive hover:text-destructive/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <TypingIndicator />}

        {/* Quick Questions */}
        {messages.length === 1 && !isLoading && (
          <div className="space-y-3 mt-6 animate-in fade-in duration-300">
            <p className="text-center text-muted-foreground text-sm font-medium">
              Швидкі питання:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuickQuestion(question.text)}
                  className="p-3 bg-card hover:bg-accent border border-border rounded-lg text-sm text-card-foreground transition-all hover:shadow-md hover:scale-[1.02] text-left active:scale-[0.98]"
                >
                  {question.text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}