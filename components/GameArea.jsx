import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { myPlayer } from "playroomkit";

export const GameArea = ({ players = [], onCollectBottle }) => {
  return (
    <group>
      {/* Ocean floor plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#4a90b8" 
          roughness={0.7} 
          metalness={0.1}
        />
      </mesh>

      {/* Rock decorations scattered around - varied sizes */}
      {/* Large rocks */}
      <mesh position={[-14, -1.2, -10]} rotation={[0.3, 0.5, 0.2]} castShadow>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[16, -1.3, 12]} rotation={[0.2, 1.5, 0.3]} castShadow>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial color="#525252" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[-17, -1.25, 6]} rotation={[0.4, 1.1, 0.5]} castShadow>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color="#505050" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Medium rocks */}
      <mesh position={[12, -1.35, -12]} rotation={[0.8, 1.2, 0.4]} castShadow>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial color="#555555" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[-10, -1.4, 14]} rotation={[0.5, 0.8, 0.6]} castShadow>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#4d4d4d" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[0, -1.45, -15]} rotation={[0.6, 0.3, 0.9]} castShadow>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#4b4b4b" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[10, -1.4, -6]} rotation={[0.7, 0.9, 0.2]} castShadow>
        <icosahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[8, -1.4, 10]} rotation={[0.5, 0.7, 0.3]} castShadow>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#4c4c4c" roughness={0.95} metalness={0.05} />
      </mesh>
      
      {/* Small rocks */}
      <mesh position={[-6, -1.55, -14]} rotation={[0.3, 0.6, 0.8]} castShadow>
        <icosahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#555555" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[-12, -1.5, 0]} rotation={[0.2, 1.0, 0.6]} castShadow>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#535353" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[4, -1.55, -10]} rotation={[0.4, 0.3, 0.7]} castShadow>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#4e4e4e" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[-4, -1.5, 12]} rotation={[0.6, 1.3, 0.4]} castShadow>
        <icosahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color="#515151" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[18, -1.4, 0]} rotation={[0.3, 0.9, 0.5]} castShadow>
        <dodecahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial color="#4b4b4b" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[-16, -1.35, -16]} rotation={[0.7, 0.4, 0.8]} castShadow>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#545454" roughness={0.9} metalness={0.1} />
      </mesh>
      
      <mesh position={[6, -1.55, 16]} rotation={[0.1, 1.6, 0.2]} castShadow>
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#4f4f4f" roughness={0.95} metalness={0.05} />
      </mesh>
      
      {/* Tiny pebbles */}
      <mesh position={[-8, -1.58, -8]} rotation={[0.5, 0.2, 0.4]} castShadow>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.9} metalness={0.05} />
      </mesh>
      
      <mesh position={[14, -1.58, 4]} rotation={[0.3, 0.8, 0.1]} castShadow>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#4d4d4d" roughness={0.95} metalness={0.05} />
      </mesh>
      
      <mesh position={[-2, -1.58, -4]} rotation={[0.6, 0.4, 0.7]} castShadow>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#585858" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Coral tubes */}
      <mesh position={[-14, -0.85, 8]} rotation={[0.1, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 1.5, 8]} />
        <meshStandardMaterial color="#ff6b35" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[16, -0.95, -8]} rotation={[0, 0, -0.08]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 1.3, 8]} />
        <meshStandardMaterial color="#ff8c5a" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[10, -0.9, 16]} rotation={[0.05, 0, 0.06]} castShadow>
        <cylinderGeometry args={[0.2, 0.16, 1.4, 8]} />
        <meshStandardMaterial color="#ff7845" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[-12, -1.0, -14]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 1.2, 8]} />
        <meshStandardMaterial color="#ff9f5a" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[-6, -0.88, 4]} rotation={[0.08, 0, 0.04]} castShadow>
        <cylinderGeometry args={[0.14, 0.11, 1.45, 8]} />
        <meshStandardMaterial color="#ff7040" roughness={0.7} metalness={0.1} />
      </mesh>
      
      <mesh position={[12, -0.92, 6]} rotation={[0, 0, -0.06]} castShadow>
        <cylinderGeometry args={[0.17, 0.13, 1.35, 8]} />
        <meshStandardMaterial color="#ff9050" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Green coral clusters - groups of 3 */}
      {/* Cluster 1 - back left */}
      <group position={[-18, 0, -12]}>
        <mesh position={[0, -0.9, 0]} rotation={[0.1, 0, 0.08]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 1.4, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.25, -0.95, 0.15]} rotation={[-0.05, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.1, -0.85, -0.2]} rotation={[0.08, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.11, 0.085, 1.5, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Cluster 2 - front right */}
      <group position={[14, 0, 12]}>
        <mesh position={[0, -0.88, 0]} rotation={[0, 0, -0.06]} castShadow>
          <cylinderGeometry args={[0.13, 0.1, 1.35, 8]} />
          <meshStandardMaterial color="#4ade80" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-0.2, -0.92, 0.18]} rotation={[0.07, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.11, 0.085, 1.25, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.15, -0.82, 0.1]} rotation={[-0.05, 0, -0.08]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.45, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Cluster 3 - center back */}
      <group position={[0, 0, -18]}>
        <mesh position={[0, -0.9, 0]} rotation={[-0.08, 0, 0.05]} castShadow>
          <cylinderGeometry args={[0.14, 0.11, 1.3, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.22, -0.85, -0.12]} rotation={[0.06, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 1.5, 8]} />
          <meshStandardMaterial color="#4ade80" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-0.18, -0.95, 0.1]} rotation={[0.04, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.15, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Cluster 4 - left side */}
      <group position={[-18, 0, 4]}>
        <mesh position={[0, -0.87, 0]} rotation={[0.05, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.11, 0.085, 1.4, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.2, -0.9, -0.15]} rotation={[-0.06, 0, -0.08]} castShadow>
          <cylinderGeometry args={[0.13, 0.1, 1.25, 8]} />
          <meshStandardMaterial color="#4ade80" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-0.12, -0.82, 0.2]} rotation={[0.08, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.55, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Cluster 5 - right back */}
      <group position={[18, 0, -4]}>
        <mesh position={[0, -0.9, 0]} rotation={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 1.35, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[-0.18, -0.85, 0.15]} rotation={[0.07, 0, 0.08]} castShadow>
          <cylinderGeometry args={[0.11, 0.085, 1.45, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0.15, -0.92, -0.1]} rotation={[-0.05, 0, -0.06]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>

      {/* Seaweed blades */}
      <mesh position={[-16, -1.25, -4]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.9, 0.08]} />
        <meshStandardMaterial color="#2d5f3f" roughness={0.8} metalness={0.05} />
      </mesh>
      
      <mesh position={[17, -1.2, 10]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.08, 0.85, 0.08]} />
        <meshStandardMaterial color="#35694a" roughness={0.8} metalness={0.05} />
      </mesh>
      
      <mesh position={[-8, -1.3, 18]} rotation={[0, 0, 0.18]} castShadow>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color="#2f6342" roughness={0.8} metalness={0.05} />
      </mesh>
      
      <mesh position={[14, -1.18, -16]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.08, 0.95, 0.08]} />
        <meshStandardMaterial color="#33674d" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Collectible Bottles */}
      <Bottles players={players} onCollectBottle={onCollectBottle} />
    </group>
  );
};

// Collectible bottles component
const Bottles = ({ players = [], onCollectBottle }) => {
  const nextIdRef = useRef(15);
  const lastCheckRef = useRef(0);

  // Generate random bottle position - spread out across play area
  const generateRandomBottle = () => {
    const id = nextIdRef.current++;
    const x = (Math.random() - 0.5) * 38; // -19 to 19
    const z = (Math.random() - 0.5) * 38; // -19 to 19
    return { id, pos: [x, -1.35, z] };
  };

  // Initial bottle positions on the floor - more spread out
  const initialBottles = [
    { id: 0, pos: [-10, -1.35, -6] },
    { id: 1, pos: [12, -1.35, 8] },
    { id: 2, pos: [-6, -1.35, 12] },
    { id: 3, pos: [14, -1.35, -10] },
    { id: 4, pos: [-14, -1.35, 14] },
    { id: 5, pos: [8, -1.35, -14] },
    { id: 6, pos: [16, -1.35, 4] },
    { id: 7, pos: [-16, -1.35, -12] },
    { id: 8, pos: [4, -1.35, 16] },
    { id: 9, pos: [-12, -1.35, -16] },
    { id: 10, pos: [14, -1.35, 14] },
    { id: 11, pos: [-18, -1.35, 0] },
    { id: 12, pos: [6, -1.35, -18] },
    { id: 13, pos: [-8, -1.35, 10] },
    { id: 14, pos: [18, -1.35, -6] }
  ];

  const [bottles, setBottles] = useState(initialBottles);

  // Spawn new bottles periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      // Spawn 2 bottles at a time, max 35 bottles
      setBottles(prev => {
        if (prev.length < 35) {
          const newBottles = [generateRandomBottle(), generateRandomBottle()];
          return [...prev, ...newBottles];
        }
        return prev;
      });
    }, 800); // Spawn every 0.8 seconds

    return () => clearInterval(spawnInterval);
  }, []);

  const colors = [
    '#a8e6a3', '#b5e7b8', '#f0f0a8', '#e8f0b0', 
    '#e8b0e0', '#d0b8e8', '#9de0d0', '#a0d0e0',
    '#b0e0f0', '#90c0d0', '#c0f0e0', '#e0f0c0',
    '#f0d0e0', '#d0e0f0', '#f0e0d0'
  ];

  // Optimized collision: only check for local player, throttle to every 100ms
  useFrame(() => {
    const now = performance.now();
    if (now - lastCheckRef.current < 100) return;
    lastCheckRef.current = now;

    const localPlayerId = myPlayer()?.id;
    if (!localPlayerId) return;
    const localPlayer = players.find(p => p.state.id === localPlayerId);
    if (!localPlayer) return;
    const playerPos = localPlayer.state.getState("pos");
    const playerHp = localPlayer.state.getState("hp") ?? 100;
    if (!playerPos || playerHp <= 0) return;

    // Find all bottles within collection radius
    const collectedIds = bottles.filter(bottle => {
      const dx = playerPos.x - bottle.pos[0];
      const dz = playerPos.z - bottle.pos[2];
      const distance = Math.sqrt(dx * dx + dz * dz);
      return distance < 1.5;
    }).map(b => b.id);

    if (collectedIds.length > 0) {
      setBottles(prev => prev.filter(b => !collectedIds.includes(b.id)));
      if (onCollectBottle) {
        collectedIds.forEach(() => onCollectBottle(localPlayer.state, 10));
      }
    }
  });

  return (
    <>
      {bottles.map((bottle) => {
        // Fixed rotation to lay flat on the floor
        const rotY = (bottle.id * 0.7) % (Math.PI * 2); // Different orientations per bottle
        
        return (
          <group key={bottle.id} position={bottle.pos} rotation={[Math.PI / 2, 0, rotY]}>
            {/* Main bottle body - laying flat, BIGGER */}
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 1.2, 12]} />
              <meshStandardMaterial 
                color={colors[bottle.id % colors.length]} 
                opacity={0.7} 
                transparent 
                roughness={0.1} 
                metalness={0.3} 
              />            </mesh>
            {/* Bottle neck */}
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.12, 0.2, 0.25, 12]} />
              <meshStandardMaterial 
                color={colors[bottle.id % colors.length]} 
                opacity={0.7} 
                transparent 
                roughness={0.1} 
                metalness={0.3} 
              />
            </mesh>
            {/* Bottle cap */}
            <mesh position={[0, 0.9, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.12, 12]} />
              <meshStandardMaterial 
                color="#ffffff" 
                roughness={0.3} 
                metalness={0.1} 
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
};
