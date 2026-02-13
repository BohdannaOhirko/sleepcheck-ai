import { getIcon } from '@/lib/icons';

interface RecommendationsListProps {
  recommendations: string[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        {getIcon('stethoscope', 'w-6 h-6 text-blue-600')}
        <h3 className="text-2xl font-bold text-gray-900">Рекомендації</h3>
      </div>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mt-0.5">
              {index + 1}
            </div>
            <span className="text-gray-700 flex-1">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}