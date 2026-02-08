'use client';

import { Environment, Lightformer, Float, Text, Sky } from "@react-three/drei";
import { onPlayerJoin, myPlayer, isHost, Joystick } from "playroomkit";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GameArea } from "./GameArea";
import { GameOctopi } from "./octopus/GameOctopi";
import * as THREE from "three";

// Camera follow component
const CameraFollow = ({ players }) => {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 3, 12));
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((_, delta) => {
    const localPlayer = players.find(p => p.state.id === myPlayer()?.id);
    if (localPlayer) {
      const pos = localPlayer.state.getState("pos");
      if (pos) {
        // Camera follows player from behind and above
        targetRef.current.set(pos.x, pos.y + 5, pos.z + 12);
        // Smoother camera movement with delta-based damping
        const smoothness = 1 - Math.pow(0.001, delta);
        camera.position.lerp(targetRef.current, smoothness * 0.8);
        // Smooth look-at target
        lookAtRef.current.set(pos.x, pos.y, pos.z);
        const currentLookAt = new THREE.Vector3();
        camera.getWorldDirection(currentLookAt);
        camera.lookAt(lookAtRef.current);
      }
    }
  });
  
  return null;
};

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

export const Game = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    onPlayerJoin((state) => {
      // Check if player already exists to prevent duplicates
      setPlayers((currentPlayers) => {
        const exists = currentPlayers.find(p => p.state.id === state.id);
        if (exists) {
          return currentPlayers;
        }
        
        // Random spawn position
        const spawnX = (Math.random() - 0.5) * 10;
        const spawnZ = (Math.random() - 0.5) * 10;
        
        state.setState("pos", { x: spawnX, y: 0, z: spawnZ });
        state.setState("score", 0);
        state.setState("hp", 100);
        
        // Create joystick for mobile controls
        const joystick = new Joystick(state, {
          type: "dpad",
          buttons: [],
        });
        
        const newPlayer = { state, joystick };
        
        state.onQuit(() => {
          setPlayers((players) => players.filter((p) => p.state.id !== state.id));
        });
        
        return [...currentPlayers, newPlayer];
      });
    });
  }, []);

  return (
    <group>
      <CameraFollow players={players} />
      
      {/* Ocean sky */}
      <Sky 
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={10}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      
      {/* Fog for underwater atmosphere */}
      <fog attach="fog" args={['#0a4a6e', 15, 60]} />
      
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.6} color="#87ceeb" />
      
      {/* Main directional light with expanded shadow coverage */}
      <directionalLight 
        position={[15, 25, 15]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
        color="#fff5e6"
      />
      
      {/* Secondary directional light for fill */}
      <directionalLight 
        position={[-10, 15, -10]} 
        intensity={0.4} 
        color="#4a9eff"
      />
      
      {/* Underwater caustics light effect */}
      <spotLight 
        position={[0, 20, 0]} 
        intensity={2} 
        angle={Math.PI / 3}
        penumbra={1}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        color="#00bfff"
      />
      
      <Environment>
        <Lightformer
          position={[5, 10, 5]}
          form="rect"
          intensity={0.8}
          color="#87ceeb"
          scale={[20, 20]}
          target={[0, 0, 0]}
        />
        <Lightformer
          position={[-5, 8, -5]}
          form="circle"
          intensity={0.5}
          color="#4a9eff"
          scale={15}
        />
      </Environment>
      
      {/* Rim lights for depth */}
      <pointLight position={[0, 10, 0]} intensity={2} distance={30} color="#ffffff" />
      <pointLight position={[15, 5, 15]} intensity={1.5} distance={25} color="#f0e68c" />
      <pointLight position={[-15, 5, -15]} intensity={1.5} distance={25} color="#add8e6" />
      <pointLight position={[15, 5, -15]} intensity={1} distance={20} color="#98fb98" />
      <pointLight position={[-15, 5, 15]} intensity={1} distance={20} color="#dda0dd" />
      
      {/* Players */}
      {players.map(({ state, joystick }) => (
        <OctopiController 
          key={state.id} 
          state={state}
          joystick={joystick}
          userPlayer={state.id === myPlayer()?.id}
        />
      ))}
      
      {/* Game Area - Ocean floor and environment */}
      <GameArea 
        players={players}
        onCollectBottle={(playerState, points) => {
          const currentScore = playerState.getState("score") || 0;
          playerState.setState("score", currentScore + points);
          // Heal and trigger happy face
          const currentHp = playerState.getState("hp") ?? 100;
          playerState.setState("hp", Math.min(100, currentHp + 15)); // +15 HP per bottle
          // Random chance for love face, otherwise neutral6
          const happyFace = Math.random() < 0.3 ? 'love' : 'neutral6';
          playerState.setState("collectFace", happyFace);
        }}
      />
    </group>
  );
};

// Octopi controller with movement
const OctopiController = ({ state, joystick, userPlayer }) => {
  const groupRef = useRef();
  const octopiRef = useRef();
  const velocityRef = useRef([0, 0, 0]);
  const keysPressed = useRef({});
  const spinTimerRef = useRef(0);
  const spinAngleRef = useRef(0);
  const isSpinningRef = useRef(false);
  const faceTimerRef = useRef(null);
  const hpTimerRef = useRef(0);
  const [tempFace, setTempFace] = useState(null);

  useEffect(() => {
    // Only set up keyboard controls for the local player
    if (!userPlayer) return;

    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [userPlayer]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // HP decay every 2 seconds (only for user player to avoid duplication)
    if (userPlayer) {
      const currentHp = state.getState("hp") ?? 100;
      if (currentHp > 0) { // Only decay if alive
        hpTimerRef.current += delta;
        if (hpTimerRef.current >= 2) {
          hpTimerRef.current = 0;
          const newHp = Math.max(0, currentHp - 10);
          state.setState("hp", newHp);
          // Show shock face when losing HP
          if (newHp < currentHp) {
            setTempFace('shock');
            if (faceTimerRef.current) clearTimeout(faceTimerRef.current);
            faceTimerRef.current = setTimeout(() => {
              setTempFace(null);
            }, 300);
          }
        }
      }
    }

    // Check if player just collected a bottle (happy face)
    const collectFace = state.getState("collectFace");
    if (collectFace) {
      setTempFace(collectFace);
      state.setState("collectFace", null);
      if (faceTimerRef.current) clearTimeout(faceTimerRef.current);
      faceTimerRef.current = setTimeout(() => {
        setTempFace(null);
      }, 800);
    }

    // Spin effect every 2 seconds (only when alive)
    const currentHpCheck = state.getState("hp") ?? 100;
    const isDead = currentHpCheck <= 0;
    
    if (!isDead) {
      spinTimerRef.current += delta;
      if (spinTimerRef.current >= 2) {
        spinTimerRef.current = 0;
        isSpinningRef.current = true;
        spinAngleRef.current = 0;
      }
      
      // Animate the spin
      if (isSpinningRef.current && octopiRef.current) {
        spinAngleRef.current += delta * 12; // Fast spin speed
        octopiRef.current.rotation.y = spinAngleRef.current;
        if (spinAngleRef.current >= Math.PI * 2) {
          isSpinningRef.current = false;
          octopiRef.current.rotation.y = 0;
        }
      }
    } else {
      // Stop spinning when dead
      isSpinningRef.current = false;
      if (octopiRef.current) {
        octopiRef.current.rotation.y = 0;
      }
    }

    const speed = 5;
    const acceleration = speed * delta;

    if (userPlayer && !isDead) {
      // Local player - control with keyboard and joystick
      let moveX = 0;
      let moveZ = 0;

      // Arrow key controls
      if (keysPressed.current['ArrowUp']) moveZ -= 1;
      if (keysPressed.current['ArrowDown']) moveZ += 1;
      if (keysPressed.current['ArrowLeft']) moveX -= 1;
      if (keysPressed.current['ArrowRight']) moveX += 1;

      // Joystick controls (for mobile)
      if (joystick) {
        const dpad = joystick.dpad();
        if (dpad.x === 'left') moveX -= 1;
        if (dpad.x === 'right') moveX += 1;
        if (dpad.y === 'up') moveZ -= 1;
        if (dpad.y === 'down') moveZ += 1;
      }

      // Normalize diagonal movement
      if (moveX !== 0 && moveZ !== 0) {
        moveX *= 0.707;
        moveZ *= 0.707;
      }

      velocityRef.current[0] = moveX * acceleration;
      velocityRef.current[2] = moveZ * acceleration;

      // Get current position
      const currentPos = groupRef.current.position;
      const newX = currentPos.x + velocityRef.current[0];
      const newZ = currentPos.z + velocityRef.current[2];

      // Boundary check
      const boundaryLimit = 20;
      const clampedX = Math.max(-boundaryLimit, Math.min(boundaryLimit, newX));
      const clampedZ = Math.max(-boundaryLimit, Math.min(boundaryLimit, newZ));

      // Update visual position
      groupRef.current.position.set(clampedX, currentPos.y, clampedZ);

      // Sync to network
      state.setState("pos", { x: clampedX, y: currentPos.y, z: clampedZ });

      // Rotate to face movement direction
      if (moveX !== 0 || moveZ !== 0) {
        const angle = Math.atan2(moveX, moveZ);
        groupRef.current.rotation.y = angle;
      }
    } else {
      // Remote player - read from synced state
      const pos = state.getState("pos");
      if (pos) {
        groupRef.current.position.set(pos.x, pos.y, pos.z);
      }
    }
  });

  const character = state.getState("character") || { body: 'blue-octopi', face: 'neutral' };
  const color = bodyColors[character.body] || bodyColors['blue-octopi'];
  const pos = state.getState("pos") || { x: 0, y: 0, z: 0 };
  const playerName = state.getState("name") || "Player";
  const hp = state.getState("hp") ?? 100;
  
  // Face priority: dead > tempFace > low HP shock > default
  let displayFace = character.face || 'neutral';
  if (hp <= 0) {
    displayFace = 'dead'; // Dead face
  } else if (hp < 50) {
    displayFace = 'shock2'; // Keep shock2 face when HP below 50
  }
  if (tempFace && hp > 0) {
    displayFace = tempFace; // Temporary face overrides everything (only if alive)
  }

  return (
    <group ref={groupRef} position={[pos.x, pos.y, pos.z]}>
      <Float speed={3} rotationIntensity={1.5} floatIntensity={3} floatingRange={[0.1, 0.5]}>
        {/* HP Bar above player */}
        <group position={[0, 1.9, 0]}>
          {/* HP bar background */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[1, 0.12]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          {/* HP bar fill */}
          <mesh position={[(hp - 100) / 200, 0, 0.01]}>
            <planeGeometry args={[hp / 100, 0.08]} />
            <meshBasicMaterial color={hp > 50 ? "#4ade80" : hp > 25 ? "#fbbf24" : "#ef4444"} />
          </mesh>
        </group>
        {/* Player name above octopus */}
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#000000"
        >
          {playerName}
        </Text>
        <group ref={octopiRef}>
          <GameOctopi 
            position={[0, -1, 0]} 
            rotation={[0, 0, 0]}
            color={color}
            currentFace={displayFace}
            scale={0.5}
          />
        </group>
      </Float>
    </group>
  );
};


