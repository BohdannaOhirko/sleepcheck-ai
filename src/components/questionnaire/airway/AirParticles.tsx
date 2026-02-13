'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AirParticlesProps {
  isBlocked: boolean;
}

export default function AirParticles({ isBlocked }: AirParticlesProps) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    ref.current?.children.forEach((p, i) => {
      if (!isBlocked) {
        p.position.y += 0.05;
        p.position.x = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.12;
        p.position.z = Math.cos(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.08;
        if (p.position.y > 3) p.position.y = -3.5;
        
        const material = (p as THREE.Mesh).material as THREE.MeshStandardMaterial;
        material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
      } else {
        const targetY = 1.3;
        p.position.y += (targetY - p.position.y) * 0.03;
        ((p as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 0.15;
      }
    });
  });

  return (
    <group ref={ref}>
      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} position={[0, -3.5 + i * 0.22, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color="#60d5f4" 
            transparent 
            emissive="#0ea5e9" 
            emissiveIntensity={1.2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}