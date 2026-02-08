import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import Image from 'next/image'

// Import face images
import neutral1 from '@/components/octopus/face/neutral1.png'
import neutral2 from '@/components/octopus/face/neutral2.png'
import neutral3 from '@/components/octopus/face/neutral3.png'
import neutral4 from '@/components/octopus/face/neutral4.png'
import neutral5 from '@/components/octopus/face/neutral5.png'
import neautral6 from '@/components/octopus/face/neautral6.png'
import neautral7 from '@/components/octopus/face/neautral7.png'
import cry from '@/components/octopus/face/cry.png'
import laugh from '@/components/octopus/face/laugh.png'
import shock from '@/components/octopus/face/shock.png'
import shock2 from '@/components/octopus/face/shock2.png'
import pout from '@/components/octopus/face/pout.png'
import Love from '@/components/octopus/face/Love.png'
import dead from '@/components/octopus/face/dead.png'

const faceImages = {
  neutral: neutral1,
  neutral1,
  neutral2,
  neutral3,
  neutral4,
  neutral5,
  neutral6: neautral6,
  neutral7: neautral7,
  cry,
  laugh,
  shock,
  shock2,
  pout,
  love: Love,
  dead
}

export function Octopi(props) {
  const { nodes, materials } = useGLTF('/model/octopus.glb')
  
  // Single color for entire octopus
  const { color = '#235ad9', currentFace = 'neutral3', ...groupProps } = props
  
  return (
    <group {...groupProps} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material001_0.geometry}
          >
            <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
          </mesh>
          <group position={[0, -0.8, -0.5]} rotation={[0.175, 0, 0]} scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere001_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere001_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[0.8, 0, -0.5]}
            rotation={[0, 0.175, Math.PI / 2]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[0, 0.8, -0.5]}
            rotation={[-0.175, 0, -Math.PI]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere003_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere003_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[-0.8, 0, -0.5]}
            rotation={[0, -0.175, -Math.PI / 2]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere004_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere004_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[0.6, -0.6, -0.5]}
            rotation={[0.124, 0.123, 0.778]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere005_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere005_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[0.6, 0.6, -0.5]}
            rotation={[-0.124, 0.123, 2.364]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere006_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere006_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[-0.6, 0.6, -0.5]}
            rotation={[-0.112, -0.134, -2.272]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          <group
            position={[-0.6, -0.6, -0.5]}
            rotation={[0.124, -0.123, -0.778]}
            scale={[0.49, 1, 0.376]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere008_Material003_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere008_Material001_0.geometry}
            >
              <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} />
            </mesh>
          </group>
          
          {/* Face overlay using Html */}
          {currentFace && faceImages[currentFace] && (
            <Html
              position={[0, -0.3, 0.5]}
              center
              distanceFactor={1}
              transform
              sprite
              pointerEvents="none"
            >
              <div style={{ width: '500px', height: '500px', position: 'relative', pointerEvents: 'none' }}>
                <Image 
                  src={faceImages[currentFace]} 
                  alt="face" 
                  fill
                  style={{ objectFit: 'contain', pointerEvents: 'none' }}
                />
              </div>
            </Html>
          )}
         
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/octopus.glb')