'use client';

import { useState } from 'react';
import { UrgencyLevel } from '@/types/scenarios';
import { BookingModal } from './BookingModal';

interface ExaminationsBlockProps {
  urgency: UrgencyLevel;
}

export function ExaminationsBlock({ urgency }: ExaminationsBlockProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');

  if (urgency.examinations.length === 0) return null;

  const handleBooking = (specialist?: string) => {
    setSelectedSpecialist(specialist || '');
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🏥 Рекомендовані обстеження</h3>
        <div className="space-y-4">
          {urgency.examinations.map((exam, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-semibold">{exam.name}</h4>
                <p className="text-gray-600 text-sm">{exam.description}</p>
                <span className="text-xs text-blue-600 font-medium">{exam.urgency}</span>
              </div>
            </div>
          ))}
        </div>
        
        {urgency.specialists.length > 0 && (
          <div className="mt-6 p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
            <h4 className="font-semibold mb-3">👨‍⚕️ До яких спеціалістів звернутись:</h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {urgency.specialists.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => handleBooking(spec)}
                  className="px-4 py-2 bg-white rounded-full text-sm border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-2"
                >
                  {spec}
                  <span className="text-blue-500">→</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handleBooking()}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <span className="text-xl">🏥</span>
              Записатись в МЦ «Ехокор»
            </button>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        specialist={selectedSpecialist}
      />
    </>
  );
}