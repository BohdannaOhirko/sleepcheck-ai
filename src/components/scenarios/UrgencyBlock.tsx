import { UrgencyLevel } from '@/types/scenarios';

interface UrgencyBlockProps {
  urgency: UrgencyLevel;
}

export function UrgencyBlock({ urgency }: UrgencyBlockProps) {
  return (
    <div className={`${urgency.bgColor} border-l-4 ${urgency.borderColor} rounded-xl p-6 shadow-lg`}>
      <div className="flex items-start gap-4">
        <div className="text-5xl">{urgency.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h2 className={`text-2xl font-bold ${urgency.color}`}>{urgency.title}</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgency.bgColor} ${urgency.color} border ${urgency.borderColor}`}>
              {urgency.timeframe}
            </span>
          </div>
          <p className="text-gray-700 text-lg">{urgency.description}</p>
        </div>
      </div>
      
      <div className="mt-6 bg-white/50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">📋 Що робити:</h3>
        <ul className="space-y-2">
          {urgency.actions.map((action, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">→</span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}