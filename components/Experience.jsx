'use client';

import { PresentationControls, Float } from '@react-three/drei';
import { Octopi } from './octopus/Octopi';

// Color mapping for body types
const bodyColors = {
  'blue-octopi': '#235ad9',
  'green-octopi': '#34d399',
  'pink-octopi': '#ec4899',
  'orange-octopi': '#f97316',
  'purple-octopi': '#a855f7',
  'yellow-octopi': '#fbbf24',
  'red-octopi': '#ef4444',
  'teal-octopi': '#14b8a6'
};

// Face mapping
const faceMapping = {
  'neutral': 'neutral1',
  'neutral2': 'neutral2',
  'neutral3': 'neutral3',
  'neutral4': 'neutral4',
  'neutral5': 'neutral5',
  'laugh': 'laugh',
  'love': 'love',
  'pout': 'pout',
  'cry': 'cry',
  'shock': 'shock',
};

export default function Experience({ characterConfig, rotation3D = 0 }) {
  const color = bodyColors[characterConfig?.body] || bodyColors['blue-octopi'];
  const face = faceMapping[characterConfig?.face] || 'neutral1';

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={5} />
      <pointLight position={[-5, 5, 0]} intensity={0.2} />
      
      {/* 3D Octopus Model with Interactive Controls */}
      
        <Float speed={5} rotationIntensity={0} floatIntensity={1.5}> 
          <Octopi  
            position={[0, -4, 0]} 
            rotation={[0, rotation3D, 0]}
            color={color}
            currentFace={face}
            scale={1.2}
          />
        </Float>
      
      
      {/* Camera Controls */}
     
    </>
  );
}
