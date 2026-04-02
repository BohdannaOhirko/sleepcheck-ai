import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ApneaResult {
  id: string;
  created_at: string;
  score: number;
  risk_level: string;
  city?: string;
  country?: string;
}

interface Props {
  results: ApneaResult[];
}

const getRiskStyle = (level: string) => {
  switch (level) {
    case "Низький ризик":
      return {
        dot: "bg-emerald-500",
        badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
      };
    case "Помірний ризик":
      return {
        dot: "bg-amber-500",
        badge: "text-amber-700 bg-amber-50 border-amber-200",
      };
    case "Високий ризик":
      return {
        dot: "bg-red-500",
        badge: "text-red-700 bg-red-50 border-red-200",
      };
    default:
      return {
        dot: "bg-gray-400",
        badge: "text-gray-600 bg-gray-50 border-gray-200",
      };
  }
};

export default function ApneaHistory({ results }: Props) {
  if (results.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <span className="text-lg">🫁</span>
          <h2 className="font-semibold text-gray-900">Скринінг апное</h2>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
          {results.length} записів
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {results.map((result, i) => {
          const style = getRiskStyle(result.risk_level);
          return (
            <div
              key={result.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-gray-700">
                    {new Date(result.created_at).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(result.created_at).getFullYear()}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Скринінг #{results.length - i}
                  </p>
                  <p className="text-xs text-gray-400">
                    {result.score} балів
                    {result.city ? ` · ${result.city}` : ""}
                    {result.country ? `, ${result.country}` : ""}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${style.badge}`}
              >
                {result.risk_level}
              </span>
            </div>
          );
        })}
      </div>
      <div className="px-6 py-4 border-t border-gray-50">
        <Link
          href="/apnea-screener"
          className="group flex items-center justify-center gap-2 text-sm text-[var(--logo-green)] hover:text-[var(--logo-green)]/80 transition-colors font-medium"
        >
          Пройти новий скринінг
          <ChevronRight
            size={15}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
