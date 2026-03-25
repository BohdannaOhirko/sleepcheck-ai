// components/chatbot/ChatButton.tsx
'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

interface ChatButtonProps {
  questionnaireData?: Record<string, unknown>;
  position?: 'bottom-right' | 'bottom-left';
}

export default function ChatButton({ 
  questionnaireData,
  position = 'bottom-right' 
}: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  return (
    <>
      {/* Плаваюча кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${positionClasses[position]} w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-50 group`}
        aria-label={isOpen ? 'Закрити чат' : 'Відкрити чат'}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-8 h-8 transition-transform group-hover:rotate-90" />
          ) : (
            <MessageCircle className="w-8 h-8 transition-transform group-hover:scale-110" />
          )}
          
          {/* Пульсуюча точка */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
          )}
        </div>
      </button>

      {/* Модальне вікно з чатом - Desktop */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Чат - Desktop */}
          <div className="hidden md:block fixed bottom-24 right-6 w-[420px] h-[600px] z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-card rounded-xl shadow-2xl overflow-hidden h-full border border-border">
              <ChatWidget
                questionnaireData={questionnaireData}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        </>
      )}

      {/* Мобільна версія - повноекранний чат */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in fade-in duration-200">
          <ChatWidget
            questionnaireData={questionnaireData}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
}