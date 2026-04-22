"use client";

import { YesNoQuestion } from "@/types/questionnaire";

interface QuestionYesNoProps {
  question: YesNoQuestion;
  value: "yes" | "no" | "unknown" | null;
  onChange: (value: "yes" | "no" | "unknown") => void;
}

export default function QuestionYesNo({
  question,
  value,
  onChange,
}: QuestionYesNoProps) {
  const hasUnknown = !!(question as unknown as Record<string, unknown>)
    .unknownOption;

  return (
    <div className={`grid gap-4 ${hasUnknown ? "grid-cols-3" : "grid-cols-2"}`}>
      <button
        onClick={() => onChange("yes")}
        className={`p-8 rounded-2xl border-2 transition-all ${
          value === "yes"
            ? "border-[var(--logo-green)] bg-[var(--logo-green)]/10 scale-105"
            : "border-border hover:border-[var(--logo-green)] hover:bg-accent"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              value === "yes"
                ? "bg-[var(--logo-green)] text-white"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div
            className={`text-2xl font-bold ${value === "yes" ? "text-[var(--logo-green)]" : "text-foreground"}`}
          >
            Так
          </div>
        </div>
      </button>

      <button
        onClick={() => onChange("no")}
        className={`p-8 rounded-2xl border-2 transition-all ${
          value === "no"
            ? "border-[var(--logo-aqua)] bg-[var(--logo-aqua)]/10 scale-105"
            : "border-border hover:border-[var(--logo-aqua)] hover:bg-accent"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              value === "no"
                ? "bg-[var(--logo-aqua)] text-white"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div
            className={`text-2xl font-bold ${value === "no" ? "text-[var(--logo-aqua)]" : "text-foreground"}`}
          >
            Ні
          </div>
        </div>
      </button>

      {hasUnknown && (
        <button
          onClick={() => onChange("unknown")}
          className={`p-8 rounded-2xl border-2 transition-all ${
            value === "unknown"
              ? "border-gray-400 bg-gray-100 scale-105"
              : "border-border hover:border-gray-400 hover:bg-accent"
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                value === "unknown"
                  ? "bg-gray-500 text-white"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <span className="text-2xl font-bold">?</span>
            </div>
            <div
              className={`text-2xl font-bold ${value === "unknown" ? "text-gray-600" : "text-foreground"}`}
            >
              Не знаю
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
