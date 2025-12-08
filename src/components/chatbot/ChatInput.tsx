// components/chatbot/ChatInput.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
  maxLength?: number;
}

export default function ChatInput({
  onSend,
  isLoading,
  placeholder = 'Опишіть вашу проблему зі сном...',
  maxLength = 2000,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Автоматична зміна висоти textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const remainingChars = maxLength - input.length;
  const isNearLimit = remainingChars < 100;

  return (
    <div className="border-t border-border bg-card/80 backdrop-blur-sm p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full p-3 pr-10 bg-background border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all max-h-32 text-foreground placeholder:text-muted-foreground"
              rows={1}
              disabled={isLoading}
              maxLength={maxLength}
            />
            {isNearLimit && (
              <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                {remainingChars}
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            aria-label="Відправити повідомлення"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-2 px-1">
          <p className="text-xs text-muted-foreground">
            💡 Enter - відправити, Shift+Enter - новий рядок
          </p>
          {input.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {input.length} / {maxLength}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}