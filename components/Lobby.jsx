import { Float, Html, OrbitControls } from "@react-three/drei";
import { myPlayer, usePlayersList, useMultiplayerState } from "playroomkit";
import { GameOctopi } from "./octopus/GameOctopi";

const CAR_SPACING = 3.5;

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

export const Lobby = ({ onStartGame }) => {
  const me = myPlayer();
  const players = usePlayersList(true);
  const [gameState, setGameState] = useMultiplayerState("gameState", "lobby");
  players.sort((a, b) => a.id.localeCompare(b.id));

  const handleStartGame = () => {
    setGameState("game");
    if (onStartGame) onStartGame();
  };

  return (
    <>
      {/* UI Overlay - Player Count and Start Button */}
      <Html fullscreen>
        {/* Player Count */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px 16px',
          borderRadius: '12px',
          border: '2px solid rgba(0, 255, 255, 0.5)',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
          textShadow: '0 0 10px cyan, 2px 2px 4px rgba(0,0,0,0.8)'
        }}>
          Players in Lobby: {players.length}
        </div>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          disabled={players.length < 1}
          style={{
            position: 'absolute',
            top: '70px',
            left: '50%',
            zIndex: 1000,
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: players.length >= 1 ? '#10b981' : '#6b7280',
            border: 'none',
            borderRadius: '12px',
            cursor: players.length >= 1 ? 'pointer' : 'not-allowed',
            boxShadow: players.length >= 1 ? '0 0 20px rgba(16, 185, 129, 0.6)' : 'none',
            transition: 'all 0.3s ease',
            transform: players.length >= 1 ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.95)',
            opacity: players.length >= 1 ? 1 : 0.5
          }}
          onMouseEnter={(e) => {
            if (players.length >= 1) {
              e.target.style.transform = 'translateX(-50%) scale(1.05)';
              e.target.style.backgroundColor = '#059669';
            }
          }}
          onMouseLeave={(e) => {
            if (players.length >= 1) {
              e.target.style.transform = 'translateX(-50%) scale(1)';
              e.target.style.backgroundColor = '#10b981';
            }
          }}
        >
          START GAME
        </button>
      </Html>

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-5, 5, 0]} intensity={1} color="#60a5fa" />

      {/* Players in lobby */}
      <group>
        {players.map((player, idx) => {
          const character = player.getState("character") || { body: 'blue-octopi', face: 'neutral' };
          const color = bodyColors[character.body] || bodyColors['blue-octopi'];
          const isMe = player.id === me?.id;

          return (
            <group
              key={player.id}
              position-x={idx * CAR_SPACING - ((players.length - 1) * CAR_SPACING) / 2}
            >
              {/* Player name */}
              <Html position-y={2.2} center>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: isMe 
                    ? '0 0 10px cyan, 0 0 20px cyan, 2px 2px 4px rgba(0,0,0,0.8)'
                    : '2px 2px 4px rgba(0,0,0,0.8)',
                  backgroundColor: isMe ? 'rgba(0,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isMe ? '2px solid cyan' : '2px solid rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  {player.getState("name") || "Player"}
                </div>
              </Html>

              {/* Octopus character */}
              <Float speed={5} rotationIntensity={1} floatIntensity={3}>
                <GameOctopi 
                  position={[0, -0.3, 0]} 
                  rotation={[0, 0, 0]}
                  color={color}
                  currentFace={character.face || 'neutral'}
                  scale={isMe ? 0.7 : 0.6}
                />
              </Float>

              {/* Highlight for current player */}
              {isMe && (
                <mesh position-y={-1.2} rotation-x={-Math.PI / 2}>
                  <circleGeometry args={[1.5, 32]} />
                  <meshStandardMaterial
                    color="cyan"
                    emissive="cyan"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                  />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
      
      {/* Rock decorations */}
      <group>
        {/* Large rocks */}
        <mesh position={[-6, -1.4, -2]} rotation={[0.3, 0.5, 0.2]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.95} metalness={0.05} />
        </mesh>
        
        <mesh position={[7, -1.35, -1]} rotation={[0.8, 1.2, 0.4]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#525252" roughness={0.9} metalness={0.05} />
        </mesh>
        
        {/* Medium rocks */}
        <mesh position={[-5, -1.5, 1.5]} rotation={[0.5, 0.9, 0.1]}>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.95} metalness={0.05} />
        </mesh>
        
        <mesh position={[6, -1.45, 2]} rotation={[0.2, 1.5, 0.6]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#4f4f4f" roughness={0.9} metalness={0.05} />
        </mesh>
        
        <mesh position={[-7, -1.4, 0.5]} rotation={[1.2, 0.3, 0.8]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#4d4d4d" roughness={0.95} metalness={0.05} />
        </mesh>
        
        {/* Small rocks scattered */}
        <mesh position={[-4, -1.55, -0.5]} rotation={[0.6, 0.4, 0.2]}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#505050" roughness={0.9} metalness={0.05} />
        </mesh>
        
        <mesh position={[5, -1.52, 0.8]} rotation={[0.9, 1.1, 0.5]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#484848" roughness={0.95} metalness={0.05} />
        </mesh>
        
        <mesh position={[4, -1.5, -1.8]} rotation={[0.3, 0.8, 0.4]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#535353" roughness={0.9} metalness={0.05} />
        </mesh>
        
        <mesh position={[-3.5, -1.55, 2]} rotation={[0.7, 0.2, 0.9]}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#4b4b4b" roughness={0.95} metalness={0.05} />
        </mesh>
        
        {/* Additional rocks for realism */}
        <mesh position={[-2.5, -1.53, -2.5]} rotation={[0.4, 0.7, 0.3]}>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#4e4e4e" roughness={0.95} metalness={0.05} />
        </mesh>
        
        <mesh position={[3, -1.54, 2.5]} rotation={[0.9, 0.5, 0.6]}>
          <dodecahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#515151" roughness={0.9} metalness={0.05} />
        </mesh>
        
        <mesh position={[-6.5, -1.48, -1]} rotation={[0.6, 1.0, 0.2]}>
          <icosahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#4c4c4c" roughness={0.95} metalness={0.05} />
        </mesh>
      </group>
      
      {/* Coral tubes - orange */}
      <group>
        <mesh position={[-5.5, -1.1, -1.5]} rotation={[0.1, 0, 0.15]}>
          <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#ff6b35" roughness={0.7} metalness={0.1} />
        </mesh>
        
        <mesh position={[-5.3, -1.15, -1.6]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.06, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#ff8c42" roughness={0.7} metalness={0.1} />
        </mesh>
        
        <mesh position={[6.5, -1.2, 1.5]} rotation={[0.08, 0, 0.12]}>
          <cylinderGeometry args={[0.1, 0.14, 0.7, 8]} />
          <meshStandardMaterial color="#ff7043" roughness={0.7} metalness={0.1} />
        </mesh>
        
        <mesh position={[6.7, -1.25, 1.3]} rotation={[0, 0, -0.08]}>
          <cylinderGeometry args={[0.07, 0.11, 0.5, 8]} />
          <meshStandardMaterial color="#ff9f5a" roughness={0.7} metalness={0.1} />
        </mesh>
        
        <mesh position={[-6.8, -1.18, 0.8]} rotation={[0.12, 0, 0.1]}>
          <cylinderGeometry args={[0.09, 0.13, 0.65, 8]} />
          <meshStandardMaterial color="#ff7a4d" roughness={0.7} metalness={0.1} />
        </mesh>
        
        <mesh position={[4.5, -1.22, -2]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
          <meshStandardMaterial color="#ff8557" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Seaweed - flat rectangles */}
      <group>
        <mesh position={[-4.5, -1.1, -1.8]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.08, 0.9, 0.3]} />
          <meshStandardMaterial color="#2d5f3f" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[-4.3, -1.15, -1.7]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.06, 0.75, 0.25]} />
          <meshStandardMaterial color="#3a7350" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[-4.6, -1.12, -1.9]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.07, 0.8, 0.28]} />
          <meshStandardMaterial color="#2a5738" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[5.5, -1.2, 1.8]} rotation={[0, 0.6, 0]}>
          <boxGeometry args={[0.08, 0.85, 0.3]} />
          <meshStandardMaterial color="#2f6342" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[5.7, -1.18, 1.9]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.07, 0.7, 0.27]} />
          <meshStandardMaterial color="#35694a" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[5.3, -1.22, 1.7]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.06, 0.78, 0.26]} />
          <meshStandardMaterial color="#2b5d3c" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[-6.2, -1.25, 1.2]} rotation={[0, 0.7, 0]}>
          <boxGeometry args={[0.08, 0.8, 0.29]} />
          <meshStandardMaterial color="#326b47" roughness={0.8} metalness={0.05} />
        </mesh>
        
        <mesh position={[-6, -1.23, 1.3]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.07, 0.72, 0.27]} />
          <meshStandardMaterial color="#2e6240" roughness={0.8} metalness={0.05} />
        </mesh>
      </group>
      
      {/* Ocean floor plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#4a90b8" 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Floating particles - stars and bottles */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[-3, 1.5, -3]}>
          <octahedronGeometry args={[0.15]} />
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={2.5}>
        <mesh position={[4, 0.8, -2]}>
          <octahedronGeometry args={[0.12]} />
          <meshStandardMaterial color="#ffffff" opacity={0.6} transparent emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={2.2}>
        <mesh position={[-5, 2, 1]}>
          <octahedronGeometry args={[0.18]} />
          <meshStandardMaterial color="#e0e0e0" opacity={0.7} transparent emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={2.8}>
        <mesh position={[6, 1.2, 2]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial color="#ffffff" opacity={0.65} transparent emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      
      {/* Floating bottle shapes */}
      <Float speed={1.2} rotationIntensity={1} floatIntensity={1.5}>
        <group position={[-2, 0.5, 2]} rotation={[0.5, 0.3, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#a0d0e0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#a0d0e0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
        <group position={[3, 1.8, -1]} rotation={[0.3, 0.8, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#b0e0f0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#b0e0f0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1.8}>
        <group position={[-6, 0.3, -1.5]} rotation={[0.8, 0.2, 0.6]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#90c0d0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#90c0d0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      {/* Additional bottles - light green */}
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.7}>
        <group position={[-8, 1.2, 2]} rotation={[0.4, 0.6, 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#a8e6a3" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#a8e6a3" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={2.3}>
        <group position={[8, 0.9, -2.5]} rotation={[0.6, 0.4, 0.7]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#b5e7b8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#b5e7b8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      {/* Light yellow bottles */}
      <Float speed={1.35} rotationIntensity={0.75} floatIntensity={2.0}>
        <group position={[-7, 1.6, -3]} rotation={[0.7, 0.9, 0.4]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#f0f0a8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#f0f0a8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      <Float speed={1.25} rotationIntensity={0.85} floatIntensity={1.6}>
        <group position={[9, 1.4, 1]} rotation={[0.5, 0.7, 0.6]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#e8f0b0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#e8f0b0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      {/* Pink/Purple tinted bottles */}
      <Float speed={1.45} rotationIntensity={0.7} floatIntensity={2.1}>
        <group position={[1, 2.2, -4]} rotation={[0.9, 0.5, 0.8]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#e8b0e0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#e8b0e0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      <Float speed={1.55} rotationIntensity={0.8} floatIntensity={1.9}>
        <group position={[-9, 0.7, -1]} rotation={[0.6, 0.3, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#d0b8e8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#d0b8e8" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      {/* More spread out bottles */}
      <Float speed={1.38} rotationIntensity={0.65} floatIntensity={2.4}>
        <group position={[7, 2, 3.5]} rotation={[0.4, 0.8, 0.3]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
            <meshStandardMaterial color="#9de0d0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
            <meshStandardMaterial color="#9de0d0" opacity={0.5} transparent roughness={0.1} metalness={0.3} />
          </mesh>
        </group>
      </Float>
      
      {/* More star particles */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={2.4}>
        <mesh position={[2, 2.5, 1]}>
          <octahedronGeometry args={[0.16]} />
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={1.7} rotationIntensity={0.4} floatIntensity={2.1}>
        <mesh position={[-4, 1, -2]}>
          <octahedronGeometry args={[0.13]} />
          <meshStandardMaterial color="#f0f0f0" opacity={0.65} transparent emissive="#ffffff" emissiveIntensity={0.25} />
        </mesh>
      </Float>
      
      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
      />
    </>
  );
};

export default Lobby;
