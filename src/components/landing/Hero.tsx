"use client";
import { useEffect, useRef, useState } from "react";
import HeroContent from "./HeroContent";

interface HeroProps {
  onOpenChat?: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f8faf9]"
    >
      {/* Динамічний градієнтний фон */}
      <div
        className="absolute inset-0 opacity-40 transition-all duration-700 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(34,197,94,0.15), transparent 70%)`,
        }}
      />

      {/* Сітка */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Декоративні кола */}
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] rounded-full border border-green-100 opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-[-5%] w-[350px] h-[350px] rounded-full border border-green-200 opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] rounded-full border border-green-100 opacity-50 pointer-events-none" />

      {/* Плаваючі елементи */}
      <div className="absolute top-32 right-[15%] hidden lg:block pointer-events-none">
        <div className="relative animate-float">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{
                background: "linear-gradient(135deg, #d0f0da, #a8e6bc)",
              }}
            >
              😴
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Аналіз завершено
              </p>
              <p className="text-xs text-gray-400">Ризик: Низький ✓</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-[10%] hidden lg:block pointer-events-none">
        <div className="animate-float" style={{ animationDelay: "1s" }}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-400 mb-1">Якість сну</p>
            <div className="flex items-end gap-1 h-8">
              {[3, 5, 4, 7, 6, 8, 7].map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-sm"
                  style={{
                    height: `${h * 4}px`,
                    background: i === 6 ? "var(--logo-green)" : "#e5f7eb",
                    transition: `height 0.3s ease ${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-48 left-[8%] hidden xl:block pointer-events-none">
        <div className="animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-2">
            <div className="flex -space-x-1">
              {["#86efac", "#6ee7b7", "#67e8f9"].map((c, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-xs font-medium text-gray-600">
              +10к пацієнтів клініки
            </p>
          </div>
        </div>
      </div>

      {/* Основний контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <HeroContent isVisible={isVisible} onOpenChat={onOpenChat} />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
