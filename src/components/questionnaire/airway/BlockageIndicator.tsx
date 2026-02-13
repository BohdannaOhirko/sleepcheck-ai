'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface BlockageIndicatorProps {
  isBlocked: boolean;
}

export default function BlockageIndicator({ isBlocked }: BlockageIndicatorProps) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current && isBlocked) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.2);
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (!isBlocked) return null;

  return (
    <group ref={ref} position={[0, 1.5, 1.8]}>
      <mesh>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#ef4444" 
          emissiveIntensity={2}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.3, 0.05, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <Text position={[0, 0.5, 0]} fontSize={0.18} color="#dc2626" fontWeight="bold">
        БЛОКУВАННЯ!
      </Text>
    </group>
  );
}