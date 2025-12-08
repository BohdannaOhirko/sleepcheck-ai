// components/chatbot/TypingIndicator.tsx
'use client';

import React from 'react';
import { Loader2, Moon } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-card rounded-lg p-4 shadow-sm border border-border max-w-[200px]">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Moon className="w-4 h-4" />
          <span className="text-xs font-semibold">AI Консультант</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Обмірковую відповідь...</span>
        </div>
      </div>
    </div>
  );
}