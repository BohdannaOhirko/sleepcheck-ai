import { PossibleCondition } from '@/types/scenarios';
import { getIcon } from '@/lib/icons';

interface ConditionsListProps {
  conditions: PossibleCondition[];
}

const probabilityStyles = {
  'висока': 'bg-red-100 text-red-800 border-red-200',
  'помірна': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'можлива': 'bg-gray-100 text-gray-800 border-gray-200'
};

export function ConditionsList({ conditions }: ConditionsListProps) {
  if (conditions.length === 0) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Можливі стани для перевірки
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Це не діагноз, а припущення на основі відповідей. Точний діагноз встановлює лікар після обстеження.
      </p>
      <div className="space-y-4">
        {conditions.map((condition, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {getIcon(condition.icon, 'w-6 h-6 text-blue-600')}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium whitespace-nowrap ${probabilityStyles[condition.probability]}`}>
                    {condition.probability}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{condition.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}