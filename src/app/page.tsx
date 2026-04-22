"use client";

import Hero from "@/components/landing/Hero";
import { useState } from "react";
import { ChatWidget } from "@/components/chatbot";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Hero onOpenChat={() => setIsChatOpen(true)} />

      {/* Модальне вікно з чатом */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] overflow-hidden border border-border animate-in slide-in-from-bottom-4 duration-300">
            <ChatWidget onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
