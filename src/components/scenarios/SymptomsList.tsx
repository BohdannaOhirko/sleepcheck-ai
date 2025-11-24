import { CriticalSymptom } from '@/types/scenarios';

interface SymptomsListProps {
  symptoms: CriticalSymptom[];
}

const severityConfig = {
  critical: { bg: 'bg-red-50', border: 'border-red-500', badge: 'bg-red-200 text-red-800', label: 'Критично' },
  high: { bg: 'bg-orange-50', border: 'border-orange-500', badge: 'bg-orange-200 text-orange-800', label: 'Важливо' },
  moderate: { bg: 'bg-yellow-50', border: 'border-yellow-500', badge: 'bg-yellow-200 text-yellow-800', label: 'Помірно' }
};

export function SymptomsList({ symptoms }: SymptomsListProps) {
  if (symptoms.length === 0) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔍 Виявлені симптоми та фактори ризику</h3>
      <div className="space-y-3">
        {symptoms.map((symptom) => {
          const config = severityConfig[symptom.severity];
          return (
            <div key={symptom.id} className={`p-4 rounded-lg border-l-4 ${config.bg} ${config.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${config.badge}`}>
                  {config.label}
                </span>
                <h4 className="font-semibold">{symptom.name}</h4>
              </div>
              <p className="text-gray-600 text-sm">{symptom.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}