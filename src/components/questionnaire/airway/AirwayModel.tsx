'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface AirwayModelProps {
  isBlocked: boolean;
}

export default function AirwayModel({ isBlocked }: AirwayModelProps) {
  const blockRef = useRef<THREE.Mesh>(null);
  const tongueRef = useRef<THREE.Mesh>(null);
  const softPalateRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);

  useFrame((_, delta) => {
    const target = isBlocked ? 1 : 0;
    const newScale = scale + (target - scale) * delta * 3;
    setScale(newScale);

    if (blockRef.current) {
      blockRef.current.scale.set(1 + newScale * 0.5, 1 + newScale * 0.3, 1 + newScale * 0.5);
      (blockRef.current.material as THREE.MeshStandardMaterial).opacity = newScale * 0.85;
    }
    
    if (tongueRef.current) {
      tongueRef.current.position.y = 1.5 - newScale * 0.45;
      tongueRef.current.rotation.x = 0.2 + newScale * 0.3;
    }
    
    if (softPalateRef.current) {
      softPalateRef.current.position.y = 2.1 - newScale * 0.2;
      softPalateRef.current.rotation.x = -0.2 - newScale * 0.4;
    }
  });

  return (
    <group>
      {/* Силует голови - анатомічний контекст */}
      <mesh position={[-0.8, 2.2, -0.5]}>
        <boxGeometry args={[2, 2.5, 1.5]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          transparent 
          opacity={0.08}
          wireframe={false}
        />
      </mesh>

      {/* Носова порожнина - квадратна */}
      <mesh position={[0, 2.8, -0.2]}>
        <boxGeometry args={[0.5, 0.4, 0.35]} />
        <meshStandardMaterial 
          color="#ffc4d1" 
          transparent 
          opacity={0.4}
          roughness={0.7}
        />
      </mesh>

      {/* Носоглотка */}
      <mesh position={[0, 2.4, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.5]} />
        <meshStandardMaterial 
          color="#ffb3c6" 
          transparent 
          opacity={0.65}
          roughness={0.6}
        />
      </mesh>

      {/* М'яке піднебіння */}
      <mesh ref={softPalateRef} position={[0, 2.1, -0.3]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.5, 0.12, 0.3]} />
        <meshStandardMaterial 
          color="#ff8fab"
          roughness={0.5}
        />
      </mesh>

      {/* Ротоглотка - прямокутна */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.75, 1.2, 0.55]} />
        <meshStandardMaterial 
          color="#ff99b3"
          transparent 
          opacity={0.7}
          roughness={0.5}
        />
      </mesh>

      {/* Язик - плоский прямокутник */}
      <mesh ref={tongueRef} position={[0, 1.5, -0.3]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.55, 0.25, 0.45]} />
        <meshStandardMaterial 
          color="#ff6b8a"
          roughness={0.4}
        />
      </mesh>

      {/* Блокування */}
      <mesh ref={blockRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#b91c1c"
          transparent 
          opacity={0}
          emissive="#dc2626"
          emissiveIntensity={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Гортаноглотка */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.65, 1, 0.5]} />
        <meshStandardMaterial 
          color="#ff8099"
          transparent 
          opacity={0.7}
          roughness={0.5}
        />
      </mesh>

      {/* Трахея - ПЕРЕРІЗАНА НАВПІЛ (схематично) */}
      <group position={[0, -0.5, 0]}>
        {/* Передня стінка трахеї */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.7, 2.5, 0.08]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.8}
            roughness={0.4}
          />
        </mesh>
        
        {/* Задня стінка трахеї */}
        <mesh position={[0, 0, -0.2]}>
          <boxGeometry args={[0.7, 2.5, 0.08]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* Бокові стінки */}
        <mesh position={[0.33, 0, 0]}>
          <boxGeometry args={[0.08, 2.5, 0.48]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.7}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[-0.33, 0, 0]}>
          <boxGeometry args={[0.08, 2.5, 0.48]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.7}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Хрящові кільця - С-подібні, плоскі */}
      {[0.9, 0.5, 0.1, -0.3, -0.7, -1.1, -1.5].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Передня частина кільця */}
          <mesh position={[0, 0, 0.25]}>
            <boxGeometry args={[0.75, 0.08, 0.05]} />
            <meshStandardMaterial 
              color="#d86b92"
              roughness={0.3}
            />
          </mesh>
          {/* Бокові частини */}
          <mesh position={[0.35, 0, 0.1]}>
            <boxGeometry args={[0.05, 0.08, 0.3]} />
            <meshStandardMaterial 
              color="#d86b92"
              roughness={0.3}
            />
          </mesh>
          <mesh position={[-0.35, 0, 0.1]}>
            <boxGeometry args={[0.05, 0.08, 0.3]} />
            <meshStandardMaterial 
              color="#d86b92"
              roughness={0.3}
            />
          </mesh>
        </group>
      ))}

      {/* Біфуркація трахеї - трикутна форма */}
      <mesh position={[0, -1.8, 0]}>
        <coneGeometry args={[0.4, 0.25, 4]} />
        <meshStandardMaterial 
          color="#ff8099"
          roughness={0.4}
        />
      </mesh>

      {/* БРОНХИ - СХЕМАТИЧНІ ПРЯМОКУТНІ ТРУБИ */}
      {/* Лівий головний бронх */}
      <group position={[-0.5, -2.2, 0]} rotation={[0, 0, 0.4]}>
        <mesh>
          <boxGeometry args={[0.35, 1.0, 0.35]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.7}
            roughness={0.4}
          />
        </mesh>
        {/* Долькові бронхи - горизонтальні відгалуження */}
        <mesh position={[-0.25, -0.3, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <meshStandardMaterial 
            color="#ff8099"
            transparent 
            opacity={0.65}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[-0.2, 0.2, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
          <meshStandardMaterial 
            color="#ff8099"
            transparent 
            opacity={0.65}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Правий головний бронх */}
      <group position={[0.45, -2.15, 0]} rotation={[0, 0, -0.3]}>
        <mesh>
          <boxGeometry args={[0.38, 0.9, 0.38]} />
          <meshStandardMaterial 
            color="#ff99ad"
            transparent 
            opacity={0.7}
            roughness={0.4}
          />
        </mesh>
        {/* Долькові бронхи */}
        <mesh position={[0.22, -0.25, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.22, 0.5, 0.22]} />
          <meshStandardMaterial 
            color="#ff8099"
            transparent 
            opacity={0.65}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0.18, 0.15, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.2, 0.45, 0.2]} />
          <meshStandardMaterial 
            color="#ff8099"
            transparent 
            opacity={0.65}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* СХЕМАТИЧНЕ ЗОБРАЖЕННЯ ЛЕГЕНЬ - контури */}
      {/* Ліва легеня - контурна рамка */}
      <mesh position={[-0.9, -2.7, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial 
          color="#ffaec9"
          transparent 
          opacity={0.15}
          wireframe={false}
          roughness={0.5}
        />
      </mesh>
      
      {/* Права легеня - контурна рамка */}
      <mesh position={[0.85, -2.7, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial 
          color="#ffaec9"
          transparent 
          opacity={0.15}
          wireframe={false}
          roughness={0.5}
        />
      </mesh>

      {/* Підписи */}
      <Text position={[1.3, 2.8, 0]} fontSize={0.13} color="#1f2937" fontWeight="bold">
        Носоглотка
      </Text>
      <Text position={[1.3, 1.8, 0]} fontSize={0.13} color="#1f2937" fontWeight="bold">
        Ротоглотка
      </Text>
      <Text position={[-1.3, 1.5, 0]} fontSize={0.13} color="#ef4444" fontWeight="bold">
        Язик
      </Text>
      <Text position={[1.3, 0.8, 0]} fontSize={0.13} color="#1f2937" fontWeight="bold">
        Гортаноглотка
      </Text>
      <Text position={[1.3, -0.5, 0]} fontSize={0.13} color="#1f2937" fontWeight="bold">
        Трахея
      </Text>
      <Text position={[-1.2, -1.8, 0]} fontSize={0.12} color="#1f2937" fontWeight="bold">
        Біфуркація
      </Text>
      <Text position={[-1.3, -2.4, 0]} fontSize={0.13} color="#1f2937" fontWeight="bold">
        Головні бронхи
      </Text>
      <Text position={[0, -3.2, 0]} fontSize={0.12} color="#1f2937" fontWeight="bold">
        Легені (схема)
      </Text>
    </group>
  );
}