'use client';

import dynamic from 'next/dynamic';

const AirwayScene = dynamic(() => import('./AirwayScene'), { ssr: false });

interface AirwayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AirwayModal({ isOpen, onClose }: AirwayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal content */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-background/95 to-transparent">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-3xl">🫁</span>
                Обструктивне апное сну
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Інтерактивна 3D візуалізація
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              ✕ Закрити
            </button>
          </div>
        </div>

        {/* 3D Scene */}
        <AirwayScene />
      </div>
    </div>
  );
}