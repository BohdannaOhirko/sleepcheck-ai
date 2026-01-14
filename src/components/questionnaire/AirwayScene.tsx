'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function AirParticles({ isBlocked }: { isBlocked: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    ref.current?.children.forEach((p, i) => {
      if (!isBlocked) {
        p.position.y += 0.04;
        p.position.x = Math.sin(state.clock.elapsedTime * 2 + i * 0.3) * 0.15;
        if (p.position.y > 2.5) p.position.y = -3;
        ((p as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0.8;
      } else {
        ((p as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0.05;
      }
    });
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 25 }, (_, i) => (
        <mesh key={i} position={[0, -3 + i * 0.2, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#22d3ee" transparent emissive="#06b6d4" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

function BlockageIndicator({ isBlocked }: { isBlocked: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current && isBlocked) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.15);
    }
  });

  if (!isBlocked) return null;

  return (
    <group ref={ref} position={[0, 1.5, 1.5]}>
      {/* Жовтий індикатор блокування */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
      {/* Текст БЛОКУВАННЯ */}
      <Text position={[0, 0.5, 0]} fontSize={0.2} color="#fbbf24" fontWeight="bold">
        БЛОКУВАННЯ!
      </Text>
    </group>
  );
}

function AirwayModel({ isBlocked }: { isBlocked: boolean }) {
  const blockRef = useRef<THREE.Mesh>(null);
  const tongueRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);

  useFrame((_, delta) => {
    const target = isBlocked ? 1 : 0;
    const newScale = scale + (target - scale) * delta * 2.5;
    setScale(newScale);

    if (blockRef.current) {
      blockRef.current.scale.set(1, newScale, 1);
      (blockRef.current.material as THREE.MeshStandardMaterial).opacity = newScale * 0.9;
    }
    if (tongueRef.current) {
      tongueRef.current.position.y = 1.8 - newScale * 0.35;
    }
  });

  return (
    <group>
      {/* Носоглотка */}
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff9ba8" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Глотка - насичений колір */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 1.5, 24]} />
        <meshStandardMaterial color="#ff4d7d" transparent opacity={0.8} />
      </mesh>

      {/* Язик */}
      <mesh ref={tongueRef} position={[0, 1.8, -0.2]} rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.35, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff3366" />
      </mesh>

      {/* Блокування - яскраво червоне */}
      <mesh ref={blockRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshStandardMaterial 
          color="#cc0000" 
          transparent 
          opacity={0}
          emissive="#ff0000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Трахея */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.45, 3, 24]} />
        <meshStandardMaterial color="#ff668a" transparent opacity={0.75} />
      </mesh>

      {/* Хрящові кільця */}
      {[0.8, 0.3, -0.2, -0.7, -1.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.42, 0.04, 12, 24, Math.PI * 1.5]} />
          <meshStandardMaterial color="#ff3355" />
        </mesh>
      ))}

      {/* Бронхи */}
      <mesh position={[-0.5, -1.5, 0.1]} rotation={[0.2, 0, 0.4]}>
        <cylinderGeometry args={[0.3, 0.25, 1.8, 16]} />
        <meshStandardMaterial color="#ff5577" transparent opacity={0.75} />
      </mesh>
      <mesh position={[0.5, -1.5, 0.1]} rotation={[0.2, 0, -0.4]}>
        <cylinderGeometry args={[0.3, 0.25, 1.8, 16]} />
        <meshStandardMaterial color="#ff5577" transparent opacity={0.75} />
      </mesh>

      {/* Підписи */}
      <Text position={[1.3, 2.5, 0]} fontSize={0.15} color="#374151" fontWeight="bold">
        Носоглотка
      </Text>
      <Text position={[1.3, 1.8, 0]} fontSize={0.15} color="#374151" fontWeight="bold">
        Глотка
      </Text>
      <Text position={[1.3, 0, 0]} fontSize={0.15} color="#374151" fontWeight="bold">
        Трахея
      </Text>
      <Text position={[1.3, -1.5, 0]} fontSize={0.15} color="#374151" fontWeight="bold">
        Бронхи
      </Text>
    </group>
  );
}

export default function AirwayScene() {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div className="w-full h-full relative bg-transparent">
      <Canvas camera={{ position: [4, 1.5, 5], fov: 50 }}>
        <OrbitControls minDistance={3} maxDistance={8} />
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} intensity={2.5} angle={0.3} penumbra={1} />
        <spotLight position={[-5, 3, -5]} intensity={1.5} angle={0.3} />
        <pointLight position={[0, 2, 3]} intensity={1} color="#22d3ee" />
        
        <AirwayModel isBlocked={isBlocked} />
        <AirParticles isBlocked={isBlocked} />
        <BlockageIndicator isBlocked={isBlocked} />
        
        <gridHelper args={[10, 10, '#d1d5db', '#e5e7eb']} position={[0, -3, 0]} />
      </Canvas>

      {/* Кнопки */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
        <button
          onClick={() => setIsBlocked(false)}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl ${
            !isBlocked
              ? 'bg-green-600 text-white scale-105 shadow-green-500/50'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          ✓ Нормальне дихання
        </button>
        <button
          onClick={() => setIsBlocked(true)}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl ${
            isBlocked
              ? 'bg-red-600 text-white scale-105 shadow-red-500/50 animate-pulse'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          🚫 Апное
        </button>
      </div>

      {/* Інфо панель */}
      <div className={`absolute top-20 left-6 backdrop-blur-sm rounded-xl p-5 max-w-xs shadow-xl border-2 transition-all ${
        isBlocked 
          ? 'bg-red-50/95 border-red-400' 
          : 'bg-green-50/95 border-green-400'
      }`}>
        <h3 className="font-bold mb-2 text-lg flex items-center gap-2">
          {isBlocked ? (
            <>
              <span className="text-2xl">🚫</span>
              <span className="text-red-700">Під час апное</span>
            </>
          ) : (
            <>
              <span className="text-2xl">✓</span>
              <span className="text-green-700">Нормальне дихання</span>
            </>
          )}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {isBlocked
            ? "М'які тканини глотки повністю блокують дихальні шляхи. Кисень не надходить до легень. Це може тривати 10-30 секунд."
            : 'Дихальні шляхи відкриті. Повітря вільно проходить від носа до легень. Нормальне постачання кисню.'}
        </p>
      </div>

      <div className="absolute bottom-24 left-0 right-0 text-center text-gray-600 text-sm font-medium">
        💡 Обертайте модель мишкою • Масштабуйте коліщатком
      </div>
    </div>
  );
}