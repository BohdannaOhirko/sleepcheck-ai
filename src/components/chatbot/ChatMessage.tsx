// components/chatbot/ChatMessage.tsx
'use client';

import React from 'react';
import { Moon, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types/api';

interface ChatMessageProps {
  message: ChatMessageType;
  showTimestamp?: boolean;
}

export default function ChatMessage({ message, showTimestamp = false }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div
        className={`max-w-[85%] rounded-lg p-4 shadow-sm ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground border border-border'
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 text-primary">
            <Moon className="w-4 h-4" />
            <span className="text-xs font-semibold">AI Консультант</span>
          </div>
        )}
        
        {isUser && showTimestamp && (
          <div className="flex items-center gap-2 mb-2 opacity-75">
            <User className="w-4 h-4" />
            <span className="text-xs font-semibold">Ви</span>
          </div>
        )}

        <div className="whitespace-pre-wrap leading-relaxed text-sm">
          {message.content}
        </div>

        {showTimestamp && (
          <div className={`text-xs mt-2 ${isUser ? 'opacity-70' : 'text-muted-foreground'}`}>
            {new Date(message.timestamp).toLocaleTimeString('uk-UA', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
}