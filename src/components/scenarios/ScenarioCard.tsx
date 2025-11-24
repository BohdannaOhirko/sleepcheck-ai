'use client';

import { useState } from 'react';
import { ScenariosData, ScenarioType } from '@/types/scenarios';

interface ScenarioCardProps {
  scenarios: ScenariosData;
}

const tabs: { key: ScenarioType; label: string; icon: string; active: string; inactive: string }[] = [
  { key: 'withTreatment', label: 'З лікуванням', icon: '🌟', active: 'bg-green-600 text-white', inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
  { key: 'withoutChanges', label: 'Без змін', icon: '⏸️', active: 'bg-yellow-600 text-white', inactive: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
  { key: 'worstCase', label: 'При ігноруванні', icon: '⚠️', active: 'bg-red-600 text-white', inactive: 'bg-red-50 text-red-700 hover:bg-red-100' },
];

const scenarioStyles: Record<ScenarioType, { bg: string; color: string; check: string }> = {
  withTreatment: { bg: 'bg-green-50', color: 'text-green-700', check: 'text-green-600' },
  withoutChanges: { bg: 'bg-yellow-50', color: 'text-yellow-700', check: 'text-yellow-600' },
  worstCase: { bg: 'bg-red-50', color: 'text-red-700', check: 'text-red-600' },
};

export function ScenarioCard({ scenarios }: ScenarioCardProps) {
  const [active, setActive] = useState<ScenarioType>('withTreatment');
  
  const current = scenarios[active];
  const styles = scenarioStyles[active];
  const tab = tabs.find(t => t.key === active)!;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📈 Сценарії розвитку подій</h3>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              active === t.key ? t.active : t.inactive
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      
      <div className={`p-6 rounded-lg ${styles.bg}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{tab.icon}</span>
          <span className={`font-medium ${styles.color}`}>{current.timeline}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          {current.changes.map((change, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className={styles.check}>{active === 'withTreatment' ? '✓' : '•'}</span>
              <span className="text-gray-700">{change}</span>
            </div>
          ))}
        </div>
        
        {current.benefits && (
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <h4 className="font-medium text-green-700 mb-2">💚 Переваги:</h4>
            <ul className="space-y-1">
              {current.benefits.map((b, idx) => (
                <li key={idx} className="text-sm text-gray-600">• {b}</li>
              ))}
            </ul>
          </div>
        )}
        
        {current.risks && (
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <h4 className={`font-medium mb-2 ${active === 'withoutChanges' ? 'text-yellow-700' : 'text-red-700'}`}>
              ⚠️ Ризики:
            </h4>
            <ul className="space-y-1">
              {current.risks.map((r, idx) => (
                <li key={idx} className="text-sm text-gray-600">• {r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}