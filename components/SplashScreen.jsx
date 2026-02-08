"use client";

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create water splash animation
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    // Animate splash ripples expanding
    tl.to('.splash-ripple', {
      scale: 8,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.2
    })
    // Animate water droplets
    .to('.water-drop', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      stagger: 0.1
    }, 0.3)
    // Fade out entire splash screen
    .to('.splash-container', {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, 1.5);

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="splash-container fixed inset-0 z-50 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center overflow-hidden">
      {/* Water splash ripples */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="splash-ripple absolute w-32 h-32 border-8 border-white/40 rounded-full" />
        <div className="splash-ripple absolute w-32 h-32 border-8 border-cyan-300/40 rounded-full" />
        <div className="splash-ripple absolute w-32 h-32 border-8 border-blue-300/40 rounded-full" />
      </div>

      {/* Water droplets */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="water-drop absolute top-[30%] left-[20%] w-6 h-6 bg-cyan-300/60 rounded-full blur-sm" />
        <div className="water-drop absolute top-[25%] left-[35%] w-8 h-8 bg-blue-200/70 rounded-full blur-sm" />
        <div className="water-drop absolute top-[35%] left-[50%] w-7 h-7 bg-cyan-400/60 rounded-full blur-sm" />
        <div className="water-drop absolute top-[28%] left-[65%] w-5 h-5 bg-blue-300/60 rounded-full blur-sm" />
        <div className="water-drop absolute top-[40%] left-[80%] w-9 h-9 bg-cyan-200/70 rounded-full blur-sm" />
        <div className="water-drop absolute top-[32%] left-[15%] w-6 h-6 bg-blue-400/60 rounded-full blur-sm" />
        <div className="water-drop absolute top-[38%] left-[75%] w-7 h-7 bg-cyan-300/60 rounded-full blur-sm" />
      </div>

      {/* Center splash icon */}
      <div className="relative z-10 text-center">
        <div className="text-9xl mb-4 animate-bounce"></div>
        <h1 className="text-6xl font-black text-white drop-shadow-lg">
          Octo <span className="text-pink-400">Billy</span>
        </h1>
        <p className="text-2xl text-white/90 mt-4 font-semibold">Dive into the Ocean...</p>
      </div>

      {/* Background bubbles */}
      <div className="absolute bottom-0 left-[10%] w-12 h-12 bg-white/20 rounded-full animate-bubble" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-0 left-[25%] w-8 h-8 bg-white/15 rounded-full animate-bubble" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
      <div className="absolute bottom-0 left-[45%] w-14 h-14 bg-white/20 rounded-full animate-bubble" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-[65%] w-10 h-10 bg-white/15 rounded-full animate-bubble" style={{ animationDuration: '3.8s', animationDelay: '0.8s' }} />
      <div className="absolute bottom-0 left-[85%] w-9 h-9 bg-white/20 rounded-full animate-bubble" style={{ animationDuration: '3.3s', animationDelay: '0.3s' }} />
    </div>
  );
}
