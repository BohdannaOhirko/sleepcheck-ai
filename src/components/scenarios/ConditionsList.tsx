import { PossibleCondition } from '@/types/scenarios';

interface ConditionsListProps {
  conditions: PossibleCondition[];
}

const probabilityStyles = {
  'висока': 'bg-red-100 text-red-700',
  'помірна': 'bg-yellow-100 text-yellow-700',
  'можлива': 'bg-gray-100 text-gray-700'
};

export function ConditionsList({ conditions }: ConditionsListProps) {
  if (conditions.length === 0) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🩺 Можливі стани для перевірки</h3>
      <p className="text-gray-600 text-sm mb-4">
        ⚠️ Це не діагноз, а припущення на основі відповідей. Точний діагноз поставить лікар.
      </p>
      <div className="grid gap-4">
        {conditions.map((condition, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{condition.icon}</span>
              <div>
                <h4 className="font-semibold">{condition.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded ${probabilityStyles[condition.probability]}`}>
                  Ймовірність: {condition.probability}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{condition.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}