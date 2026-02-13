'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AirParticles from './airway/AirParticles';
import Lungs from './airway/Lungs';
import BlockageIndicator from './airway/BlockageIndicator';
import AirflowArrows from './airway/AirflowArrows';
import AirwayModel from './airway/AirwayModel';

export default function AirwayScene() {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-50 to-slate-100">
      <Canvas camera={{ position: [5, 1, 6], fov: 45 }}>
        <OrbitControls 
          minDistance={4} 
          maxDistance={10}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        <spotLight position={[0, 5, 5]} intensity={1.2} angle={0.4} penumbra={1} color="#ffffff" />
        <pointLight position={[0, 2, 4]} intensity={0.8} color="#60d5f4" />
        <pointLight position={[3, 0, 2]} intensity={0.6} color="#ffd7e5" />
        
        <AirwayModel isBlocked={isBlocked} />
        <AirParticles isBlocked={isBlocked} />
        <Lungs isBlocked={isBlocked} />
        <BlockageIndicator isBlocked={isBlocked} />
        <AirflowArrows isBlocked={isBlocked} />
        
        <gridHelper args={[12, 12, '#cbd5e1', '#e2e8f0']} position={[0, -4, 0]} />
      </Canvas>

      {/* Кнопки */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
        <button
          onClick={() => setIsBlocked(false)}
          className={`px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl ${
            !isBlocked
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Нормальне дихання</span>
          </div>
        </button>
        
        <button
          onClick={() => setIsBlocked(true)}
          className={`px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl ${
            isBlocked
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white scale-105 animate-pulse'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚫</span>
            <span>Обструктивне апное</span>
          </div>
        </button>
      </div>

      {/* Інфо панель */}
      <div className={`absolute top-24 left-6 backdrop-blur-md rounded-2xl p-6 max-w-sm shadow-2xl border-2 ${
        isBlocked ? 'bg-red-50/95 border-red-400' : 'bg-emerald-50/95 border-emerald-400'
      }`}>
        <h3 className="font-bold mb-3 text-xl flex items-center gap-3">
          {isBlocked ? (
            <>
              <span className="text-3xl animate-pulse">🚫</span>
              <span className="text-red-700">Обструктивне апное</span>
            </>
          ) : (
            <>
              <span className="text-3xl">✓</span>
              <span className="text-emerald-700">Нормальне дихання</span>
            </>
          )}
        </h3>
        
        <div className="space-y-3 text-sm text-gray-700">
          <p className="leading-relaxed">
            {isBlocked
              ? "Язик та м'які тканини глотки повністю блокують дихальні шляхи."
              : 'Дихальні шляхи повністю відкриті. Повітря вільно проходить від носа до легень.'}
          </p>
          
          {isBlocked && (
            <>
              <div className="flex items-start gap-2 p-3 bg-red-100 rounded-lg">
                <span>⚠️</span>
                <span className="text-xs">Кисень не надходить до легень</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-orange-100 rounded-lg">
                <span>⏱️</span>
                <span className="text-xs">Може тривати 10-90 секунд</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Підказки */}
      <div className="absolute bottom-28 left-0 right-0 text-center">
        <div className="inline-block bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <p className="text-sm text-gray-600 font-medium">
            💡 <span className="font-semibold">Обертайте</span> мишкою • <span className="font-semibold">Масштабуйте</span> коліщатком
          </p>
        </div>
      </div>
    </div>
  );
}