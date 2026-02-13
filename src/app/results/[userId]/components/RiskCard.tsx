import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

interface RiskCardProps {
  riskLevel: 'low' | 'medium' | 'high';
  score: number;
}

export function RiskCard({ riskLevel, score }: RiskCardProps) {
  const getRiskInfo = (level: string) => {
    switch (level) {
      case 'low':
        return {
          color: 'bg-green-100 border-green-500 text-green-800',
          icon: <CheckCircle className="w-10 h-10 text-green-600" />,
          title: 'Низький ризик апное',
          description: 'Ваші відповіді вказують на низьку ймовірність апное сну. Продовжуйте дотримуватися здорових звичок сну.'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 border-yellow-500 text-yellow-800',
          icon: <AlertTriangle className="w-10 h-10 text-yellow-600" />,
          title: 'Середній ризик апное',
          description: 'Деякі ознаки вказують на можливі проблеми зі сном. Рекомендуємо проконсультуватися з лікарем.'
        };
      case 'high':
        return {
          color: 'bg-red-100 border-red-500 text-red-800',
          icon: <AlertCircle className="w-10 h-10 text-red-600" />,
          title: 'Високий ризик апное',
          description: 'Ваші відповіді вказують на високу ймовірність апное сну. Настійно рекомендуємо звернутися до спеціаліста.'
        };
      default:
        return {
          color: 'bg-gray-100 border-gray-500 text-gray-800',
          icon: <XCircle className="w-10 h-10 text-gray-600" />,
          title: 'Невизначено',
          description: 'Не вдалося визначити рівень ризику.'
        };
    }
  };

  const riskInfo = getRiskInfo(riskLevel);

  return (
    <div className={`${riskInfo.color} border-l-4 rounded-lg p-6 shadow-md`}>
      <div className="flex items-start gap-4">
        <div>{riskInfo.icon}</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{riskInfo.title}</h2>
          <p className="text-lg mb-4">{riskInfo.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">{score}</span>
            <span className="text-lg ml-2">балів</span>
          </div>
        </div>
      </div>
    </div>
  );
}