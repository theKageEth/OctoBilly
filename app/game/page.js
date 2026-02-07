'use client';

import { useState, useEffect } from 'react';
import { insertCoin, isHost, isStreamScreen, myPlayer, onPlayerJoin } from 'playroomkit';
import OctopusProfile from '@/components/OctoProfile';

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [characterConfig, setCharacterConfig] = useState({
    body: 'blue-octopi',
    face: 'neutral'
  });
  const [score, setScore] = useState(0);
  const [plasticItems, setPlasticItems] = useState([]);

  const bodyOptions = ['blue-octopi', 'green-octopi', 'pink-octopi', 'orange-octopi'];
  const faceOptions = ['neutral', 'neutral2', 'neutral3', 'neutral4', 'neutral5', 'laugh', 'love', 'pout'];

  // Initialize Playroom
  useEffect(() => {
    const initPlayroom = async () => {
      await insertCoin({
        skipLobby: false,
        gameId: "blueiblly-ocean-cleanup"
      });
      
      onPlayerJoin((player) => {
        setPlayers((prev) => [...prev, player]);
        player.onQuit(() => {
          setPlayers((prev) => prev.filter((p) => p.id !== player.id));
        });
      });
    };

    initPlayroom();
  }, []);

  // Generate plastic items for cleanup game
  const startGame = () => {
    setGameStarted(true);
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      type: Math.random() > 0.5 ? 'bottle' : 'bag',
      collected: false
    }));
    setPlasticItems(items);
  };

  const collectPlastic = (id) => {
    setPlasticItems(prev => 
      prev.map(item => item.id === id ? { ...item, collected: true } : item)
    );
    setScore(prev => prev + 10);
    
    if (myPlayer()) {
      myPlayer().setState('score', score + 10);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-teal-900 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h1 className="text-6xl font-black text-white mb-8 text-center">
            Create Your Octopus! 🐙
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Character Preview */}
            <div className="flex items-center justify-center bg-blue-500/20 rounded-2xl p-8">
              <div className="transform scale-75">
                <OctopusProfile
                  body={characterConfig.body}
                  face={characterConfig.face}
                />
              </div>
            </div>

            {/* Character Customization */}
            <div className="space-y-6">
              <div>
                <label className="text-white text-xl font-bold mb-3 block">
                  Choose Body Color
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {bodyOptions.map((body) => (
                    <button
                      key={body}
                      onClick={() => setCharacterConfig(prev => ({ ...prev, body }))}
                      className={`p-4 rounded-xl transition-all ${
                        characterConfig.body === body
                          ? 'bg-cyan-500 scale-105 shadow-lg'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <span className="text-white font-semibold capitalize">
                        {body.split('-')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white text-xl font-bold mb-3 block">
                  Choose Expression
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {faceOptions.map((face) => (
                    <button
                      key={face}
                      onClick={() => setCharacterConfig(prev => ({ ...prev, face }))}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        characterConfig.face === face
                          ? 'bg-cyan-500 scale-105'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      <span className="text-white font-medium capitalize">
                        {face}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="mt-8 w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full text-white font-black text-2xl hover:scale-105 transition-transform shadow-xl"
          >
            Start Ocean Cleanup! 🌊
          </button>

          <p className="text-center text-white/70 mt-4">
            {players.length} player{players.length !== 1 ? 's' : ''} connected
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-teal-600 to-cyan-700 p-6 relative overflow-hidden">
      {/* Score Display */}
      <div className="fixed top-6 left-6 bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 z-50">
        <div className="text-white font-black text-3xl">
          Score: {score}
        </div>
      </div>

      {/* Player Character */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="transform scale-50">
          <OctopusProfile
            body={characterConfig.body}
            face={characterConfig.face}
          />
        </div>
      </div>

      {/* Game Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-white drop-shadow-lg">
          Ocean Cleanup Challenge! 🌊
        </h1>
        <p className="text-xl text-white/90 mt-2">
          Click on plastic items to clean the ocean
        </p>
      </div>

      {/* Plastic Items */}
      <div className="relative h-[80vh] mt-8">
        {plasticItems.map((item) => (
          !item.collected && (
            <button
              key={item.id}
              onClick={() => collectPlastic(item.id)}
              className="absolute transition-all hover:scale-110 animate-pulse"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              <div className="text-6xl opacity-70 hover:opacity-100 cursor-pointer transform hover:rotate-12 transition-all">
                {item.type === 'bottle' ? '🍾' : '🛍️'}
              </div>
            </button>
          )
        ))}
      </div>

      {/* Win Condition */}
      {plasticItems.every(item => item.collected) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 text-center max-w-md">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-5xl font-black text-white mb-4">
              Ocean Saved!
            </h2>
            <p className="text-2xl text-white/90 mb-2">
              Final Score: {score}
            </p>
            <p className="text-lg text-white/70 mb-6">
              You cleaned up the entire ocean!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform"
            >
              Back to Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
