// components/chatbot/ChatWidget.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Moon, Sparkles, X, Calendar } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import BookingModal from "@/components/services/BookingModal";

interface ChatWidgetProps {
  questionnaireData?: Record<string, unknown>;
  onClose?: () => void;
  className?: string;
}

const QUICK_QUESTIONS = [
  { id: "insomnia", text: "Не можу заснути вночі" },
  { id: "quality", text: "Як покращити якість сну?" },
  { id: "waking", text: "Прокидаюсь посеред ночі" },
  { id: "apnea", text: "Що таке апное сну?" },
];

export default function ChatWidget({
  questionnaireData,
  onClose,
  className = "",
}: ChatWidgetProps) {
  const {
    messages,
    isLoading,
    error,
    isLimitReached,
    sendMessage,
    clearError,
  } = useAIChat({
    context: { questionnaireData },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (text: string) => {
    sendMessage(text);
  };

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookingModalOpen(true);
  };

  const shouldShowBookingButton = () => {
    if (messages.length === 0) return false;
    const lastBotMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    if (!lastBotMessage) return false;

    const keywords = [
      "записатися",
      "запису",
      "форму",
      "консультацію",
      "телефон",
      "+38098 881 44 99",
      "адміністрації",
    ];

    return keywords.some((keyword) =>
      lastBotMessage.content.toLowerCase().includes(keyword.toLowerCase()),
    );
  };

  return (
    <>
      <div
        className={`flex flex-col h-full bg-gradient-to-b from-gray-50 to-white ${className}`}
      >
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative p-6 shadow-2xl">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/30 blur-xl rounded-full"></div>
                  <div className="relative bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                    <Moon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                    Консультант зі сну
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </h1>
                  <p className="text-white/90 text-sm font-medium">
                    МЦ «Ехокор» — Львів
                  </p>
                </div>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2.5 hover:bg-white/20 rounded-xl transition-all backdrop-blur-sm border border-white/20"
                  aria-label="Закрити чат"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-4 mt-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-red-700 text-sm font-medium">{error}</p>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto w-full">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && <TypingIndicator />}

          {/* Booking Button */}
          {!isLoading && shouldShowBookingButton() && (
            <div className="flex justify-center mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={handleBookingClick}
                type="button"
                className="group relative px-8 py-4 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-lime)] to-[var(--logo-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-white flex items-center gap-3 text-base">
                  <Calendar className="w-6 h-6" />
                  Записатися на консультацію
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </button>
            </div>
          )}

          {/* Quick Questions — компактні */}
          {messages.length === 1 && !isLoading && (
            <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
                Популярні питання
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuickQuestion(question.text)}
                    className="px-4 py-2 bg-white border border-gray-200 hover:border-[var(--logo-green)] hover:bg-green-50 rounded-full text-sm text-gray-600 hover:text-gray-900 transition-all hover:shadow-sm active:scale-95"
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
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
          isLimitReached={isLimitReached}
        />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceName="Консультація сомнолога"
      />
    </>
  );
}
