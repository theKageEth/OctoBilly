"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function LandingPage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Helper to split words while preserving HTML
      const splitWords = (el) => {
        if (!el) return [];
        
        // Get all child nodes (text and elements)
        const childNodes = Array.from(el.childNodes);
        const words = [];
        
        // Process each node
        childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            // Split text nodes by spaces
            const textWords = node.textContent.split(" ").filter(w => w.trim());
            textWords.forEach(word => {
              words.push(`<span class="inline-block">${word}</span>`);
            });
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Preserve element nodes (like our colored spans)
            const nodeWords = node.textContent.split(" ").filter(w => w.trim());
            nodeWords.forEach(word => {
              const clone = node.cloneNode(false);
              clone.textContent = word;
              clone.classList.add('inline-block');
              words.push(clone.outerHTML);
            });
          }
        });
        
        el.innerHTML = words.join(" ");
        return el.querySelectorAll("span");
      };

      // title
      gsap.from(splitWords(titleRef.current), {
        y: -100,
        opacity: 0,
        rotation: () => gsap.utils.random(-60, 60),
        duration: 0.8,
        ease: "back.out",
        stagger: 0.12,
        delay: 0.2,
      });

      // subtitle
      gsap.from(splitWords(subtitleRef.current), {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.9,
      });

      // description
      gsap.from(splitWords(descriptionRef.current), {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: "back.out",
        stagger: 0.06,
        delay: 1.4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-container relative w-full h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center px-6 overflow-hidden">
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
          z-index: 5;
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
      
      {/* background bubbles at edges */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-white rounded-full opacity-5 animate-pulse" />
      <div className="absolute top-16 right-12 w-16 h-16 bg-white rounded-full opacity-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-16 w-14 h-14 bg-white rounded-full opacity-3 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-24 right-20 w-18 h-18 bg-white rounded-full opacity-3 animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="text-center max-w-3xl z-10">
        <h1
          ref={titleRef}
          className="text-7xl font-black text-white mb-6 leading-tight"
        >
          A <span className="text-yellow-200">Reef</span> Worth <span className="text-yellow-200">Saving</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-3xl text-white/95 mb-8 font-bold"
        >
          Follow <span className="text-pink-500 font-bold">Billy's</span> journey
        </p>

        <p
          ref={descriptionRef}
          className="text-xl text-white/80 leading-relaxed mb-12"
        >
          Pollution spreads. The ocean grows quiet. The reef needs its community.
        </p>

        {/* scroll hint */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-8 h-8 mx-auto text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}