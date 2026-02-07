'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OctopusProfile from "@/components/OctoProfile";
import plasticBag from "@/components/plastics/bag.png";
import bottle1 from "@/components/plastics/bottle1.png";
import bottle2 from "@/components/plastics/bottle2.png";
import bottle3 from "@/components/plastics/bottle3.png";
import bottle4 from "@/components/plastics/bottle4.png";

gsap.registerPlugin(ScrollTrigger);

export default function BillyStory() {
  const router = useRouter();
  const containerRef = useRef(null);
  const billyRef = useRef(null);
  const billyBounceRef = useRef(null);
  const [currentFace, setCurrentFace] = useState('neutral');
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState('meet'); // 'meet', 'help', 'action'
  
  // Cycle between neutral and neutral2 in Meet Billy section
  useEffect(() => {
    if (currentSection !== 'meet') return;
    
    const interval = setInterval(() => {
      setCurrentFace(prev => prev === 'neutral2' ? 'neutral4' : 'neutral2');
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSection]);
  
  // Cycle between cry and neutral5 in Help Billy section
  useEffect(() => {
    if (currentSection !== 'help') return;
    
    const interval = setInterval(() => {
      setCurrentFace(prev => prev === 'cry' ? 'neutral5' : 'cry');
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSection]);
  
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  
  const desc1Ref = useRef(null);
  const plasticTextRef = useRef(null);
  const desc2Ref = useRef(null);
  const desc3Ref = useRef(null);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const bottomTextRef = useRef(null);

  useGSAP(() => {
    // Helper to split words
    const splitWords = (el) => {
      if (!el) return [];
      const words = el.innerText.split(" ");
      el.innerHTML = words
        .map((w) => `<span class="inline-block">${w}</span>`)
        .join(" ");
      return el.querySelectorAll("span");
    };

    // Split all text elements
    const title1Words = splitWords(title1Ref.current);
    const title2Words = splitWords(title2Ref.current);
    const title3Words = splitWords(title3Ref.current);
    const desc1Words = splitWords(desc1Ref.current);
    const plasticWords = splitWords(plasticTextRef.current);
    const desc2Words = splitWords(desc2Ref.current);

    // Main scroll-triggered timeline for Billy's journey
    const billyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Change face and section based on scroll progress
          if (progress < 0.25) {
            // Meet Billy section - allow alternating faces
            setCurrentSection('meet');
          } else if (progress < 0.9) {
            // Help Billy section - cry and neutral5 alternating (extended)
            setCurrentSection('help');
          } else {
            // Action section - love face
            setCurrentSection('action');
            setCurrentFace('love');
          }
        }
      }
    });

    // Billy's movement through the story
    billyTimeline
      // Start - visible at bottom, moving a bit
      .fromTo(billyRef.current, 
        { y: 50, x: -50, scale: 0.8, rotation: 0 },
        { y: 30, x: 50, scale: 0.85, rotation: 5, duration: 0.05, ease: "power1.inOut" }
      )
      .to(billyRef.current, {
        x: -30,
        y: 20,
        rotation: -5,
        duration: 0.05
      })
      // Pop out when scrolling starts
      .to(billyRef.current, {
        y: -100,
        x: 0,
        scale: 1,
        rotation: 360,
        duration: 0.15,
        ease: "back.out(2)"
      })
      // Fly right
      .to(billyRef.current, {
        x: 300,
        y: -150,
        rotation: 15,
        duration: 0.2
      })
      // Fly left
      .to(billyRef.current, {
        x: -300,
        y: -200,
        rotation: -15,
        duration: 0.2
      })
      // Back to middle and stay
      .to(billyRef.current, {
        x: 0,
        y: -250,
        rotation: 0,
        duration: 0.15
      })
      // Stay in middle (longer duration for extended section)
      .to(billyRef.current, {
        y: -250,
        x: 0,
        duration: 0.5
      })
      // Move up for section 2
      .to(billyRef.current, {
        y: -400,
        x: 0,
        scale: 1.1,
        duration: 0.2
      })
      // Final position for section 3
      .to(billyRef.current, {
        y: -550,
        x: 0,
        scale: 1.2,
        duration: 0.2
      });

    // Constant bouncing animation for Billy (separate from scroll movement)
    gsap.to(billyBounceRef.current, {
      y: -25,
      duration: 0.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Floating plastic items - move from section 1 to section 2
    gsap.utils.toArray('.plastic-float').forEach((item, index) => {
      gsap.to(item, {
        y: -400,
        x: `+=${gsap.utils.random(-100, 100)}`,
        rotation: `+=${gsap.utils.random(-180, 180)}`,
        duration: 8,
        ease: "none",
        repeat: -1,
        delay: index * 0.5
      });
    });

    // Animate section 1 content
    gsap.timeline({
      scrollTrigger: {
        trigger: section1Ref.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })
    .from(title1Words, {
      y: -80,
      opacity: 0,
      rotation: () => gsap.utils.random(-40, 40),
      duration: 0.7,
      ease: "back.out",
      stagger: 0.1
    })
    .from(desc1Words, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04
    }, "-=0.3")
    .from(plasticWords, {
      y: 40,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05
    }, "-=0.2");

    // Animate section 2 content
    gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })
    .from(title2Words, {
      y: -80,
      opacity: 0,
      rotation: () => gsap.utils.random(-40, 40),
      duration: 0.7,
      ease: "back.out",
      stagger: 0.1
    })
    .from(desc2Words, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.04
    }, "-=0.3");

    // Animate section 3 content
    gsap.timeline({
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })
    .from(title3Words, {
      y: -100,
      opacity: 0,
      rotation: () => gsap.utils.random(-50, 50),
      duration: 0.7,
      ease: "back.out",
      stagger: 0.1
    })
    .from([card1Ref.current, card2Ref.current, card3Ref.current], {
      scale: 0,
      rotation: 180,
      duration: 0.8,
      ease: "back.out(1.5)",
      stagger: 0.15
    }, "-=0.2")
    .from(bottomTextRef.current, {
      y: 50,
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.5)"
    }, "-=0.3");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative">
      {/* Billy - fixed position, moves with scroll */}
      <div 
        ref={billyRef}
        className="fixed left-1/2 bottom-0 z-50 pointer-events-none"
        style={{ transform: 'translateX(-50%)' }}
      >
        <div ref={billyBounceRef}>
          <OctopusProfile
            body="blue-octopi"
            face={currentFace}
          />
        </div>
      </div>

      {/* Section 1: Meet Billy */}
      <section
        ref={section1Ref}
        className="relative w-full h-[250vh] bg-gradient-to-b from-blue-800 via-blue-900 to-teal-900 flex items-center justify-center px-6 pt-20 pb-96"
      >
        {/* Bubbles */}
        <div className="absolute top-12 left-8 w-14 h-14 bg-white rounded-full opacity-4 animate-pulse" />
        <div className="absolute top-20 right-10 w-12 h-12 bg-white rounded-full opacity-5 animate-pulse" style={{ animationDelay: '0.7s' }} />
        <div className="absolute bottom-16 left-12 w-18 h-18 bg-white rounded-full opacity-3 animate-pulse" style={{ animationDelay: '1.2s' }} />
        
        {/* Seashells - top */}
        <div className="absolute top-32 left-24 text-6xl opacity-30 rotate-12">🐚</div>
        <div className="absolute top-64 right-32 text-5xl opacity-25 -rotate-45">🐚</div>
        
        {/* Starfish - middle */}
        <div className="absolute top-[30vh] left-[35%] text-6xl opacity-35 rotate-[25deg]">⭐</div>
        <div className="absolute top-[60vh] left-[45%] text-5xl opacity-30 -rotate-[35deg]">⭐</div>
        <div className="absolute top-[90vh] right-[40%] text-6xl opacity-25 rotate-[15deg]">⭐</div>
        <div className="absolute top-[45vh] right-[30%] text-4xl opacity-20 rotate-[60deg]">🌟</div>
        <div className="absolute top-[75vh] left-[30%] text-5xl opacity-30 -rotate-[20deg]">🌟</div>
        <div className="absolute top-[110vh] left-[50%] text-6xl opacity-28 rotate-[40deg]">⭐</div>
        
        {/* Plastic Pollution - bottom area */}
        <Image src={bottle2} alt="" className="plastic-float absolute bottom-32 left-16 w-24 opacity-30 rotate-45" />
        <Image src={bottle3} alt="" className="plastic-float absolute bottom-48 right-24 w-18 opacity-40 -rotate-12" />
        <Image src={plasticBag} alt="" className="plastic-float absolute bottom-[20vh] left-[25%] w-22 opacity-35 rotate-[30deg]" />
        <Image src={bottle4} alt="" className="plastic-float absolute bottom-[15vh] right-[20%] w-24 opacity-32 -rotate-[25deg]" />
        <Image src={bottle1} alt="" className="plastic-float absolute bottom-[35vh] left-[40%] w-16 opacity-38 rotate-[15deg]" />
        <Image src={bottle2} alt="" className="plastic-float absolute bottom-[28vh] right-[35%] w-20 opacity-34 -rotate-[40deg]" />
        <Image src={bottle3} alt="" className="plastic-float absolute bottom-[25vh] left-[15%] w-20 opacity-42 rotate-[50deg]" />
        <Image src={bottle4} alt="" className="plastic-float absolute bottom-[18vh] right-[18%] w-16 opacity-38 -rotate-[30deg]" />
        <Image src={plasticBag} alt="" className="plastic-float absolute bottom-[40vh] left-[35%] w-24 opacity-36 rotate-[70deg]" />
        <Image src={bottle1} alt="" className="plastic-float absolute bottom-[32vh] right-[25%] w-20 opacity-40 -rotate-[45deg]" />
        <Image src={bottle2} alt="" className="plastic-float absolute bottom-[12vh] left-[45%] w-16 opacity-35 rotate-[20deg]" />
        
        <div className="text-center max-w-3xl z-10">
          <h2
            ref={title1Ref}
            className="text-6xl font-black text-white mb-10 leading-tight drop-shadow-lg"
          >
            Meet Billy the Octopus
          </h2>

          <p
            ref={desc1Ref}
            className="text-xl text-white/95 leading-relaxed font-medium mb-8"
          >
            Billy lives in a healthy marine ecosystem. Watch as his world changes when pollution arrives. His story reflects what's happening in our oceans.
          </p>
          
        </div>
      </section>

      {/* Section 2: Billy Needs Help */}
      <section
        ref={section2Ref}
        className="relative w-full h-[250vh] bg-gradient-to-b from-teal-900 via-emerald-900/80 to-slate-900 flex items-center justify-center px-6 py-96 overflow-hidden"
      >
        {/* More floating plastic in polluted section */}
        <Image src={plasticBag} alt="" className="plastic-float absolute top-20 left-[20%] w-20 opacity-40 rotate-12" />
        <Image src={bottle1} alt="" className="plastic-float absolute top-40 right-[25%] w-16 opacity-35 -rotate-30" />
        <Image src={bottle3} alt="" className="plastic-float absolute top-[30vh] left-[15%] w-18 opacity-38 rotate-45" />
        <Image src={bottle4} alt="" className="plastic-float absolute top-[50vh] right-[20%] w-20 opacity-32 -rotate-20" />
        <Image src={bottle2} alt="" className="plastic-float absolute top-[70vh] left-[30%] w-16 opacity-40 rotate-60" />
        
        <div className="text-center max-w-2xl z-10">
          <h2
            ref={title2Ref}
            className="text-5xl font-bold text-white mb-8"
          >
            Billy Needs Our Help
          </h2>
          <p
            ref={desc2Ref}
            className="text-lg text-white/90 leading-relaxed"
          >
            Billy's home is destroyed. His ocean is polluted, his food sources are contaminated, and his family is in danger. But there's hope...
          </p>
        </div>
      </section>

      {/* Section 3: You Can Help */}
      <section
        ref={section3Ref}
        className="relative w-full h-[180vh] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center px-6 pt-96 pb-20"
      >
        <div className="text-center max-w-2xl z-10">
          <h2
            ref={title3Ref}
            className="text-5xl font-bold text-white mb-8"
          >
            You Can Help Billy
          </h2>
          <div className="space-y-6 text-lg text-white/90 mt-12">
            <div
              ref={card1Ref}
              className="bg-white/10 backdrop-blur p-6 rounded-lg hover:bg-white/20 transition-all"
            >
              <p className="text-2xl font-bold text-green-300 mb-2">🌱 Reduce Plastic Use</p>
              <p>Choose reusable bags, bottles, and containers</p>
            </div>
            <div
              ref={card2Ref}
              className="bg-white/10 backdrop-blur p-6 rounded-lg hover:bg-white/20 transition-all"
            >
              <p className="text-2xl font-bold text-green-300 mb-2">♻️ Recycle Properly</p>
              <p>Ensure your waste doesn't end up in the ocean</p>
            </div>
            <div
              ref={card3Ref}
              className="bg-white/10 backdrop-blur p-6 rounded-lg hover:bg-white/20 transition-all"
            >
              <p className="text-2xl font-bold text-green-300 mb-2">🌊 Support Ocean Conservation</p>
              <p>Join beach cleanups and support marine protection organizations</p>
            </div>
          </div>
          <div
            ref={bottomTextRef}
            className="mt-20 relative"
          >
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 leading-tight">
              Join the Octopus Community 🐙
            </div>
            <p className="text-3xl font-bold text-white/90 mb-6">
              & Save Our Ocean Together!
            </p>
            <button 
              onClick={() => router.push('/game')}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-blue-500/50"
            >
              Get Started 🌊
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
