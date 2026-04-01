"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AirParticles from "./airway/AirParticles";
import Lungs from "./airway/Lungs";
import BlockageIndicator from "./airway/BlockageIndicator";
import AirflowArrows from "./airway/AirflowArrows";
import AirwayModel from "./airway/AirwayModel";

export default function AirwayScene() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [infoPanelCollapsed, setInfoPanelCollapsed] = useState(false);

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
        <spotLight
          position={[0, 5, 5]}
          intensity={1.2}
          angle={0.4}
          penumbra={1}
          color="#ffffff"
        />
        <pointLight position={[0, 2, 4]} intensity={0.8} color="#60d5f4" />
        <pointLight position={[3, 0, 2]} intensity={0.6} color="#ffd7e5" />

        <AirwayModel isBlocked={isBlocked} />
        <AirParticles isBlocked={isBlocked} />
        <Lungs isBlocked={isBlocked} />
        <BlockageIndicator isBlocked={isBlocked} />
        <AirflowArrows isBlocked={isBlocked} />

        <gridHelper
          args={[12, 12, "#cbd5e1", "#e2e8f0"]}
          position={[0, -4, 0]}
        />
      </Canvas>

      {/* Кнопки переключення — знизу по центру */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
        <button
          onClick={() => setIsBlocked(false)}
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all shadow-xl ${
            !isBlocked
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Нормальне дихання</span>
          </div>
        </button>

        <button
          onClick={() => setIsBlocked(true)}
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all shadow-xl ${
            isBlocked
              ? "bg-gradient-to-r from-red-600 to-rose-600 text-white scale-105 animate-pulse"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>🚫</span>
            <span>Обструктивне апное</span>
          </div>
        </button>
      </div>

      {/* Підказка обертання */}
      <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow text-xs text-gray-500">
          💡 <span className="font-semibold">Обертайте</span> мишкою •{" "}
          <span className="font-semibold">Масштабуйте</span> коліщатком
        </div>
      </div>

      {/* Інфо-панель — знизу праворуч, згортається */}
      <div
        className={`absolute bottom-20 right-4 backdrop-blur-md rounded-2xl shadow-2xl border-2 transition-all duration-300 max-w-[260px] ${
          isBlocked
            ? "bg-red-50/95 border-red-400"
            : "bg-emerald-50/95 border-emerald-400"
        }`}
      >
        {/* Заголовок-кнопка */}
        <button
          onClick={() => setInfoPanelCollapsed(!infoPanelCollapsed)}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <span
            className={`font-bold text-sm flex items-center gap-2 ${isBlocked ? "text-red-700" : "text-emerald-700"}`}
          >
            {isBlocked ? "🚫 Обструктивне апное" : "✓ Нормальне дихання"}
          </span>
          <span className="text-gray-400 text-xs ml-2">
            {infoPanelCollapsed ? "▲" : "▼"}
          </span>
        </button>

        {/* Контент */}
        {!infoPanelCollapsed && (
          <div className="px-4 pb-4 space-y-2 text-xs text-gray-700">
            <p className="leading-relaxed">
              {isBlocked
                ? "Язик та м'які тканини глотки повністю блокують дихальні шляхи."
                : "Дихальні шляхи повністю відкриті. Повітря вільно проходить від носа до легень."}
            </p>
            {isBlocked && (
              <>
                <div className="flex items-start gap-2 p-2 bg-red-100 rounded-lg">
                  <span>⚠️</span>
                  <span>Кисень не надходить до легень</span>
                </div>
                <div className="flex items-start gap-2 p-2 bg-orange-100 rounded-lg">
                  <span>⏱️</span>
                  <span>Може тривати 10–90 секунд</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
