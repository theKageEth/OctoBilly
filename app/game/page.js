'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { insertCoin, myPlayer, getRoomCode, usePlayersList } from 'playroomkit';
import { Experience } from '@/components/GameScene';
import QRCode from "react-qr-code";
import Image from 'next/image';

// Import face images
import neutral1 from '@/components/octopus/face/neutral1.png';
import neutral2 from '@/components/octopus/face/neutral2.png';
import neutral3 from '@/components/octopus/face/neutral3.png';
import neutral4 from '@/components/octopus/face/neutral4.png';
import neutral5 from '@/components/octopus/face/neutral5.png';
import cry from '@/components/octopus/face/cry.png';
import laugh from '@/components/octopus/face/laugh.png';
import shock from '@/components/octopus/face/shock.png';
import pout from '@/components/octopus/face/pout.png';
import Love from '@/components/octopus/face/Love.png';

const faceImages = {
  neutral: neutral1,
  neutral2,
  neutral3,
  neutral4,
  neutral5,
  cry,
  laugh,
  shock,
  pout,
  love: Love
};

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

const bodyOptions = ['blue-octopi', 'green-octopi', 'pink-octopi', 'orange-octopi', 'purple-octopi', 'yellow-octopi', 'red-octopi', 'teal-octopi'];
const faceOptions = ['neutral', 'neutral2', 'neutral3', 'neutral4', 'neutral5', 'laugh', 'love', 'pout'];

const CharacterPreviewScene = dynamic(() => import('@/components/CharacterPreviewScene'), {
  ssr: false,
});

export default function GamePage() {
  const [inLobby, setInLobby] = useState(false);
  const [lobbyReady, setLobbyReady] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [characterConfig, setCharacterConfig] = useState({
    body: 'blue-octopi',
    face: 'neutral'
  });
  const [leaderboardExpanded, setLeaderboardExpanded] = useState(false);
  const [lastLeaderboardUpdate, setLastLeaderboardUpdate] = useState(0);

  const players = usePlayersList(true);

  // Memoize sorted players to reduce re-computation
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const scoreA = a.getState('score') || 0;
      const scoreB = b.getState('score') || 0;
      return scoreB - scoreA;
    });
  }, [players]);

  // Throttle leaderboard updates
  const [throttledSortedPlayers, setThrottledSortedPlayers] = useState(sortedPlayers);
  
  useEffect(() => {
    const now = Date.now();
    if (now - lastLeaderboardUpdate > 200) { // Update every 200ms
      setThrottledSortedPlayers(sortedPlayers);
      setLastLeaderboardUpdate(now);
    }
  }, [sortedPlayers, lastLeaderboardUpdate]);

  // Initialize Playroom
  useEffect(() => {
    const initPlayroom = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const joinCode = urlParams.get('room');

      await insertCoin({
        skipLobby: true,
        gameId: "blueiblly-ocean-cleanup",
        roomCode: joinCode || undefined,
      });
      
      const code = getRoomCode();
      setRoomCode(code);
      setLobbyReady(true);
    };

    initPlayroom();
  }, []);

  const joinLobby = () => {
    if (!myPlayer()) return;
    
    const finalName = playerName.trim() || `Player ${players.length}`;
    myPlayer().setState('name', finalName);
    myPlayer().setState('character', characterConfig);
    myPlayer().setState('ready', true);
    
    setInLobby(true);
  };

  const copyRoomCode = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!lobbyReady) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-teal-900 flex items-center justify-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Loading Ocean Cleanup...
        </div>
      </div>
    );
  }

  if (!inLobby) {
    const roomUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${typeof window !== 'undefined' ? window.location.pathname : ''}?room=${roomCode}`;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-500 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Sea Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)'
          }}></div>
        </div>
        
        {/* Animated Bubbles */}
        <style jsx>{`
          @keyframes float-up {
            0% {
              transform: translateY(100vh) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) scale(1);
              opacity: 0;
            }
          }
          .bubble {
            position: absolute;
            bottom: -100px;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
            border-radius: 50%;
            animation: float-up linear infinite;
            pointer-events: none;
            z-index: 50;
          }
        `}</style>
        
        <div className="bubble" style={{ left: '10%', width: '20px', height: '20px', animationDuration: '8s', animationDelay: '0s' }}></div>
        <div className="bubble" style={{ left: '20%', width: '15px', height: '15px', animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="bubble" style={{ left: '30%', width: '25px', height: '25px', animationDuration: '7s', animationDelay: '4s' }}></div>
        <div className="bubble" style={{ left: '40%', width: '18px', height: '18px', animationDuration: '9s', animationDelay: '1s' }}></div>
        <div className="bubble" style={{ left: '50%', width: '22px', height: '22px', animationDuration: '11s', animationDelay: '3s' }}></div>
        <div className="bubble" style={{ left: '60%', width: '16px', height: '16px', animationDuration: '8s', animationDelay: '5s' }}></div>
        <div className="bubble" style={{ left: '70%', width: '20px', height: '20px', animationDuration: '10s', animationDelay: '2s' }}></div>
        <div className="bubble" style={{ left: '80%', width: '24px', height: '24px', animationDuration: '9s', animationDelay: '0s' }}></div>
        <div className="bubble" style={{ left: '90%', width: '18px', height: '18px', animationDuration: '7s', animationDelay: '4s' }}></div>
        <div className="bubble" style={{ left: '15%', width: '14px', height: '14px', animationDuration: '12s', animationDelay: '6s' }}></div>
        <div className="bubble" style={{ left: '75%', width: '21px', height: '21px', animationDuration: '8s', animationDelay: '3s' }}></div>
        <div className="bubble" style={{ left: '35%', width: '17px', height: '17px', animationDuration: '10s', animationDelay: '1s' }}></div>
        
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-7xl font-black text-white mb-4 drop-shadow-2xl">
              Ocean Cleanup
            </h1>
            <p className="text-2xl text-white/90 font-bold">
              Customize your octopus and dive in
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-white/20 relative z-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              
              {/* Left: Character Preview */}
              <div className="space-y-4">
                <div className="relative h-96 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 rounded-2xl overflow-hidden border-4 border-white/30">
                  <CharacterPreviewScene characterConfig={characterConfig} />
                </div>
                
                {/* Players Online */}
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-lg">
                  <div className="text-white font-bold text-center mb-2 text-lg">
                    Players Online: {players.length}
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {players.map((player, idx) => (
                      <div key={player.id} className="text-white/80 text-sm text-center">
                        {player.getState('name') || `Player ${idx + 1}`}
                        {player.id === myPlayer()?.id && ' (You)'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center: Customization */}
              <div className="space-y-6">
                <div>
                  <label className="text-white text-2xl font-black mb-4 block text-center">
                    Octo Name
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name..."
                    maxLength={20}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-lg border-2 border-white/30 text-white placeholder-white/50 text-center text-lg font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:bg-white/30 transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-white text-2xl font-black mb-4 block text-center">
                    Octo Color
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {bodyOptions.map((body) => (
                      <button
                        key={body}
                        onClick={() => setCharacterConfig(prev => ({ ...prev, body }))}
                        className={`p-2 rounded-xl transition-all transform ${
                          characterConfig.body === body
                            ? 'bg-white scale-110 shadow-2xl ring-4 ring-yellow-300'
                            : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                        }`}
                      >
                        <div 
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: bodyColors[body],
                            margin: '0 auto',
                            border: '3px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white text-2xl font-black mb-4 block text-center">
                  Your Cute Face
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {faceOptions.map((face) => (
                      <button
                        key={face}
                        onClick={() => setCharacterConfig(prev => ({ ...prev, face }))}
                        className={`p-2 rounded-xl transition-all transform ${
                          characterConfig.face === face
                            ? 'bg-white scale-110 shadow-xl ring-4 ring-yellow-300'
                            : 'bg-white/20 hover:bg-white/30 hover:scale-105'
                        }`}
                      >
                        <div 
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#f5e6d3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            margin: '0 auto'
                          }}
                        >
                          {faceImages[face] && (
                            <Image 
                              src={faceImages[face]} 
                              alt={face} 
                              width={45}
                              height={45}
                              style={{ objectFit: 'contain' }}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={joinLobby}
                  disabled={!playerName.trim()}
                  className="w-full py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-full text-white font-black text-3xl hover:scale-105 disabled:hover:scale-100 transition-transform shadow-2xl"
                >
                  🌊 JOIN LOBBY 🌊
                </button>
              </div>

              {/* Right: QR Code & Room Info */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="text-center mb-4">
                    <p className="text-gray-700 font-bold text-lg mb-2">
                      Scan to Join
                    </p>
                  </div>
                  <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%", background: "white", padding: "16px", borderRadius: "12px" }}>
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={roomUrl}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-xs text-gray-600 mb-2">Room Code</p>
                    <p className="text-2xl font-black text-purple-600 tracking-wider">
                      {roomCode}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={copyRoomCode}
                    className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-bold transition-all"
                  >
                    Copy Room Link
                  </button>
                  
                  {copied && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg animate-bounce z-50">
                      Copied!
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-4 border-2 border-yellow-400/50">
                  <p className="text-white text-center text-sm font-semibold">
                    Arrow Keys / Joystick<br/>
                    Collect Bottles
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // In lobby/game - Show 3D scene with Experience managing state
  if (inLobby) {
    // Get player scores for leaderboard (now using throttled data)
    const myPlayerId = myPlayer()?.id;

    // Check if all players are dead
    const allPlayersDead = players.length > 0 && players.every(player => {
      const hp = player.getState('hp') ?? 100;
      return hp <= 0;
    });

    // Restart game function
    const restartGame = () => {
      players.forEach(player => {
        player.setState('hp', 100);
        player.setState('score', 0);
        const spawnX = (Math.random() - 0.5) * 10;
        const spawnZ = (Math.random() - 0.5) * 10;
        player.setState('pos', { x: spawnX, y: 0, z: spawnZ });
      });
    };

    // Go to home
    const goHome = () => {
      window.location.href = '/';
    };

    // Calculate total score to determine pollution level
    // More bottles collected = cleaner water (white bubbles)
    const totalScore = players.reduce((sum, player) => sum + (player.getState('score') || 0), 0);
    const isClean = totalScore >= 100; // After 10 bottles collected, water becomes cleaner

    return (
      <div style={{ position: 'fixed', inset: 0, margin: 0, padding: 0 }}>
        {/* Animated Bubbles - green (pollution) when dirty, white when clean */}
        <style jsx>{`
          @keyframes float-up-game {
            0% {
              transform: translateY(100vh) scale(0);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-100vh) scale(1);
              opacity: 0;
            }
          }
          .game-bubble {
            position: fixed;
            bottom: -100px;
            border-radius: 50%;
            animation: float-up-game linear infinite;
            pointer-events: none;
            z-index: 50;
            transition: background 1s ease;
          }
          .game-bubble-green {
            background: radial-gradient(circle at 30% 30%, rgba(74, 222, 128, 0.7), rgba(34, 197, 94, 0.2));
          }
          .game-bubble-white {
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
          }
        `}</style>
        
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '5%', width: '18px', height: '18px', animationDuration: '10s', animationDelay: '0s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '12%', width: '14px', height: '14px', animationDuration: '12s', animationDelay: '3s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '22%', width: '22px', height: '22px', animationDuration: '8s', animationDelay: '1s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '35%', width: '16px', height: '16px', animationDuration: '11s', animationDelay: '5s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '48%', width: '20px', height: '20px', animationDuration: '9s', animationDelay: '2s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '62%', width: '15px', height: '15px', animationDuration: '13s', animationDelay: '4s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '75%', width: '24px', height: '24px', animationDuration: '7s', animationDelay: '0s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '85%', width: '17px', height: '17px', animationDuration: '10s', animationDelay: '6s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '92%', width: '19px', height: '19px', animationDuration: '9s', animationDelay: '2s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '8%', width: '21px', height: '21px', animationDuration: '11s', animationDelay: '7s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '55%', width: '13px', height: '13px', animationDuration: '14s', animationDelay: '1s' }}></div>
        <div className={`game-bubble ${isClean ? 'game-bubble-white' : 'game-bubble-green'}`} style={{ left: '42%', width: '16px', height: '16px', animationDuration: '8s', animationDelay: '4s' }}></div>

        <Canvas
          shadows="soft"
          camera={{ position: [0, 3, 12], fov: 60 }}
          gl={{ antialias: true }}
          style={{
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(to bottom, #0a2540, #0c4a6e, #155e75)'
          }}
        >
          <Experience />
        </Canvas>
        
        {/* Leaderboard Overlay */}
        <div 
          onClick={() => setLeaderboardExpanded(!leaderboardExpanded)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '10px 12px',
            minWidth: leaderboardExpanded ? '180px' : '140px',
            maxWidth: '200px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            zIndex: 100,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
          <h3 style={{
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            paddingBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            🏆 Leaderboard
            <span style={{ 
              fontSize: '10px', 
              opacity: 0.7,
              transform: leaderboardExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }}>▼</span>
          </h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            maxHeight: leaderboardExpanded ? '200px' : 'none',
            overflowY: leaderboardExpanded ? 'auto' : 'visible'
          }}>
            {(() => {
              // Show all players when expanded, otherwise show leader + current player
              const myPlayerId = myPlayer()?.id;
              const myPlayerIndex = throttledSortedPlayers.findIndex(p => p.id === myPlayerId);
              
              let playersToShow = throttledSortedPlayers;
              if (!leaderboardExpanded) {
                // Collapsed: show leader and current player only
                const leader = throttledSortedPlayers[0];
                const currentPlayer = throttledSortedPlayers.find(p => p.id === myPlayerId);
                
                if (leader && currentPlayer && leader.id !== currentPlayer.id) {
                  playersToShow = [leader, currentPlayer];
                } else if (leader) {
                  playersToShow = [leader];
                } else {
                  playersToShow = [];
                }
              }
              
              return playersToShow.map((player) => {
                const playerIdx = throttledSortedPlayers.findIndex(p => p.id === player.id);
                const score = player.getState('score') || 0;
                const hp = player.getState('hp') ?? 100;
                const name = player.getState('name') || `Player ${playerIdx + 1}`;
                const isMe = player.id === myPlayerId;
                
                return (
                  <div
                    key={player.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '6px 8px',
                      background: isMe ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      border: isMe ? '1px solid #60a5fa' : 'none',
                      gap: '3px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'white', fontSize: '11px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {playerIdx === 0 ? '🥇' : playerIdx === 1 ? '🥈' : playerIdx === 2 ? '🥉' : `${playerIdx + 1}.`} {name}
                      </span>
                      <span style={{
                        color: '#4ade80',
                        fontWeight: 'bold',
                        fontSize: '11px'
                      }}>
                        {score}
                      </span>
                    </div>
                    {/* HP Bar */}
                    <div style={{ 
                      width: '100%', 
                      height: '4px', 
                      background: '#333', 
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${hp}%`,
                        height: '100%',
                        background: hp > 50 ? '#4ade80' : hp > 25 ? '#fbbf24' : '#ef4444',
                        transition: 'width 0.3s, background 0.3s'
                      }} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
          {!leaderboardExpanded && throttledSortedPlayers.length > 2 && (
            <div style={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '10px', 
              marginTop: '4px' 
            }}>
              +{throttledSortedPlayers.length - 2} more
            </div>
          )}
        </div>

        {/* Game Over Overlay */}
        {allPlayersDead && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200
          }}>
            <h1 style={{
              color: '#ef4444',
              fontSize: '64px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
            }}>
              GAME OVER
            </h1>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              minWidth: '350px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '30px'
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                Final Scores
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {throttledSortedPlayers.map((player, idx) => {
                  const score = player.getState('score') || 0;
                  const name = player.getState('name') || `Player ${idx + 1}`;
                  
                  return (
                    <div
                      key={player.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        background: idx === 0 ? 'rgba(250, 204, 21, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        border: idx === 0 ? '2px solid #fbbf24' : 'none'
                      }}
                    >
                      <span style={{ 
                        color: 'white', 
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ fontSize: '24px' }}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                        </span>
                        {name}
                      </span>
                      <span style={{
                        color: '#4ade80',
                        fontWeight: 'bold',
                        fontSize: '20px'
                      }}>
                        {score} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={restartGame}
                style={{
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(to right, #10b981, #059669)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Restart Game
              </button>
              
              <button
                onClick={goHome}
                style={{
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(to right, #6366f1, #4f46e5)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Back Home
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // This should never be reached, but just in case
  return null;
}