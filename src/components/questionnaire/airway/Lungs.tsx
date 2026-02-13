'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LungsProps {
  isBlocked: boolean;
}

export default function Lungs({ isBlocked }: LungsProps) {
  const leftLungRef = useRef<THREE.Mesh>(null);
  const rightLungRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!isBlocked) {
      const breathScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      leftLungRef.current?.scale.set(breathScale, breathScale, breathScale);
      rightLungRef.current?.scale.set(breathScale, breathScale, breathScale);
    } else {
      leftLungRef.current?.scale.set(0.95, 0.95, 0.95);
      rightLungRef.current?.scale.set(0.95, 0.95, 0.95);
    }
  });

  return (
    <group position={[0, -2.8, 0]}>
      {/* Ліва легеня */}
      <mesh ref={leftLungRef} position={[-0.7, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color={isBlocked ? "#ff6b9d" : "#ffaec9"}
          transparent
          opacity={0.7}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Права легеня */}
      <mesh ref={rightLungRef} position={[0.7, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color={isBlocked ? "#ff6b9d" : "#ffaec9"}
          transparent
          opacity={0.7}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Бронхіоли */}
      {[-0.7, 0.7].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          {Array.from({ length: 5 }, (_, i) => (
            <mesh 
              key={i} 
              position={[
                Math.sin(i * Math.PI / 2.5) * 0.3,
                Math.cos(i * Math.PI / 3) * 0.2,
                Math.sin(i * Math.PI / 4) * 0.2
              ]}
            >
              <cylinderGeometry args={[0.02, 0.01, 0.3, 8]} />
              <meshStandardMaterial color="#d946ef" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}