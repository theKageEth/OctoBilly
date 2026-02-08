'use client';

import { Canvas } from '@react-three/fiber';
import CharacterPreview from './CharacterPreview';

export default function CharacterPreviewScene({ characterConfig }) {
  return (
    <Canvas
      camera={{ position: [0, -2, 8], fov: 50   , near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%', pointerEvents: 'auto', touchAction: 'none' }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <CharacterPreview characterConfig={characterConfig} />
    </Canvas>
  );
}
