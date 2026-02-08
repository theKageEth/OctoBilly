'use client';

import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function Scene({ characterConfig, rotation3D }) {
  return (
    <Canvas
      camera={{ position: [0, -4, 10], fov: 75 , near: 0.1,
          far: 200,}}
      style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Experience characterConfig={characterConfig} rotation3D={rotation3D} />
    </Canvas>
  );
}
