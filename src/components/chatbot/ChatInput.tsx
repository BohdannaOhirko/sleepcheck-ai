// components/chatbot/ChatInput.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  isLimitReached?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export default function ChatInput({
  onSend,
  isLoading,
  isLimitReached = false,
  placeholder = "Опишіть вашу проблему зі сном...",
  maxLength = 2000,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isLoading || isLimitReached) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 160);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const remainingChars = maxLength - input.length;
  const isNearLimit = remainingChars < 100;

  if (isLimitReached) {
    return (
      <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <a
            href="tel:+380988814499"
            className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] text-white font-semibold rounded-2xl hover:opacity-90 transition-all shadow-lg"
          >
            📞 Зателефонувати: +380 98 881 4499
          </a>
          <p className="text-xs text-gray-400 text-center mt-2">
            Наші спеціалісти готові відповісти на всі ваші запитання
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, maxLength))}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-[var(--logo-green)] focus:bg-white transition-all min-h-[64px] max-h-[160px] text-gray-800 text-base placeholder:text-gray-400 leading-relaxed"
              rows={2}
              disabled={isLoading}
              maxLength={maxLength}
            />
            {isNearLimit && (
              <div className="absolute bottom-2 right-3 text-xs text-gray-400">
                {remainingChars}
              </div>
            )}
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[var(--logo-green)] to-[var(--logo-lime)] text-white rounded-2xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
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
          <p className="text-xs text-gray-400">
            💡 Enter — відправити, Shift+Enter — новий рядок
          </p>
          {input.length > 0 && (
            <p className="text-xs text-gray-400">
              {input.length} / {maxLength}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
