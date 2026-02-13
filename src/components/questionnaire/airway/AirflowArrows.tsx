'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirflowArrowsProps {
  isBlocked: boolean;
}

export default function AirflowArrows({ isBlocked }: AirflowArrowsProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && !isBlocked) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  if (isBlocked) return null;

  return (
    <group ref={groupRef} position={[1.8, 0, 0]}>
      {[2, 0.5, -1, -2.5].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}