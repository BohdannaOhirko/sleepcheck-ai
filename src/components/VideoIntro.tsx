"use client";

import { useRef, useState, useEffect } from "react";

export default function VideoIntro({ children }: { children: React.ReactNode }) {
  const [fadeState, setFadeState] = useState<"visible" | "fading" | "hidden">("visible");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleVideoEnd = () => {
    setFadeState("fading");
    timeoutRef.current = setTimeout(() => setFadeState("hidden"), 800);
  };

  if (fadeState === "hidden") return <>{children}</>;

  return (
    <>
      {children}
      <div className={`intro-wrapper ${fadeState === "fading" ? "intro-fade-out" : ""}`}>
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="intro-video"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}