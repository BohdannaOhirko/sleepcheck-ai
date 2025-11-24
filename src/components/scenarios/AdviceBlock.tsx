interface AdviceBlockProps {
  advice: string[];
}

export function AdviceBlock({ advice }: AdviceBlockProps) {
  if (advice.length === 0) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💡 Персональні рекомендації</h3>
      <div className="space-y-4">
        {advice.map((item, idx) => (
          <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}