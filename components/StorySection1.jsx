"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

export default function StorySection1() {
  const titleRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);
  const bottomTextRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // helper → split words
    const splitWords = (el) => {
      const words = el.innerText.split(" ");
      el.innerHTML = words
        .map((w) => `<span class="inline-block">${w}</span>`)
        .join(" ");
      return el.querySelectorAll("span");
    };

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // title with split word effect (like landing page)
    tl.from(splitWords(titleRef.current), {
      y: -100,
      opacity: 0,
      rotation: () => gsap.utils.random(-60, 60),
      duration: 0.8,
      ease: "back.out",
      stagger: 0.12,
    });

    // scramble stat numbers (cards always visible)
    tl.to(stat1Ref.current.querySelector('.stat-number'), {
      scrambleText: {
        text: "8M",
        chars: "0123456789KMBT",
        speed: 0.3
      },
      duration: 3
    }, "-=0.3")
    .to(stat2Ref.current.querySelector('.stat-number'), {
      scrambleText: {
        text: "100K",
        chars: "0123456789KMBT",
        speed: 0.3
      },
      duration: 3
    }, "-=2.5")
    .to(stat3Ref.current.querySelector('.stat-number'), {
      scrambleText: {
        text: "450",
        chars: "0123456789KMBT",
        speed: 0.3
      },
      duration: 3
    }, "-=2.5");

    // bottom text with split words
    tl.from(splitWords(bottomTextRef.current), {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: "back.out",
      stagger: 0.03,
    }, "-=1.5");

    // stat numbers pulse
    gsap.to('.stat-number', {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* background bubbles at edges */}
      <div className="absolute top-10 left-10 w-12 h-12 bg-white rounded-full opacity-5 animate-pulse" />
      <div className="absolute top-16 right-12 w-16 h-16 bg-white rounded-full opacity-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-16 w-14 h-14 bg-white rounded-full opacity-3 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-24 right-20 w-18 h-18 bg-white rounded-full opacity-3 animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="max-w-5xl text-center z-10">
        <h2 
          ref={titleRef}
          className="text-6xl font-black text-white mb-16 leading-tight drop-shadow-lg"
        >
          The Reality of Ocean Pollution
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div 
            ref={stat1Ref}
            className="bg-white/15 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/25 transition-all duration-300"
          >
            <p className="stat-number text-7xl font-black text-cyan-200 mb-4 drop-shadow-md">8M</p>
            <p className="text-2xl text-white font-bold mb-2">Tonnes of plastic</p>
            <p className="text-white/90 text-lg">enter our oceans every year</p>
          </div>
          
          <div 
            ref={stat2Ref}
            className="bg-white/15 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/25 transition-all duration-300"
          >
            <p className="stat-number text-7xl font-black text-blue-200 mb-4 drop-shadow-md">100K</p>
            <p className="text-2xl text-white font-bold mb-2">Marine animals</p>
            <p className="text-white/90 text-lg">die annually from plastic pollution</p>
          </div>
          
          <div 
            ref={stat3Ref}
            className="bg-white/15 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 hover:bg-white/25 transition-all duration-300"
          >
            <p className="stat-number text-7xl font-black text-teal-200 mb-4 drop-shadow-md">450</p>
            <p className="text-2xl text-white font-bold mb-2">Years</p>
            <p className="text-white/90 text-lg">for a plastic bottle to decompose</p>
          </div>
        </div>

        <p 
          ref={bottomTextRef}
          className="text-2xl text-white/95 mt-16 font-semibold"
        >
          Every bottle we use impacts Billy's home
        </p>
      </div>
    </section>
  );
}