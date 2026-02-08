'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plasticBag from "@/components/plastics/bag.png";
import bottle1 from "@/components/plastics/bottle1.png";
import bottle2 from "@/components/plastics/bottle2.png";
import bottle3 from "@/components/plastics/bottle3.png";
import bottle4 from "@/components/plastics/bottle4.png";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function BillyStory() {
  const router = useRouter();
  const containerRef = useRef(null);
  const billyRef = useRef(null);
  const [currentFace, setCurrentFace] = useState('neutral3');
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState('meet'); // 'meet', 'help', 'action'
  const [billyPosition, setBillyPosition] = useState({ x: 0, y: 0 });
  const [billyRotation, setBillyRotation] = useState(0);
  const [billyRotation3D, setBillyRotation3D] = useState(0);
  const [faceIndex, setFaceIndex] = useState(0);
  
  // Cycle through multiple faces in Meet Billy section
  useEffect(() => {
    if (currentSection !== 'meet') return;
    
    const meetFaces = ['neutral2', 'neutral4', 'neutral3'];
    const interval = setInterval(() => {
      setFaceIndex(prev => {
        const nextIndex = (prev + 1) % meetFaces.length;
        setCurrentFace(meetFaces[nextIndex]);
        return nextIndex;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSection]);
  
  // Cycle through multiple faces in Help Billy section
  useEffect(() => {
    if (currentSection !== 'help') return;
    
    const helpFaces = ['neutral5', 'pout', 'cry'];
    const interval = setInterval(() => {
      setFaceIndex(prev => {
        const nextIndex = (prev + 1) % helpFaces.length;
        setCurrentFace(helpFaces[nextIndex]);
        return nextIndex;
      });
    }, 900);
    
    return () => clearInterval(interval);
  }, [currentSection]);
  
  // Cycle between Love and laugh in Action section
  useEffect(() => {
    if (currentSection !== 'action') return;
    
    const actionFaces = ['love', 'neutral3', 'laugh'];
    const interval = setInterval(() => {
      setFaceIndex(prev => {
        const nextIndex = (prev + 1) % actionFaces.length;
        setCurrentFace(actionFaces[nextIndex]);
        return nextIndex;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSection]);
  
  // Spin Billy every 5 seconds
  useEffect(() => {
    const spinInterval = setInterval(() => {
      gsap.to({}, {
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          setBillyRotation3D(progress * Math.PI * 2); // Full rotation in radians
        },
        onComplete: () => {
          setBillyRotation3D(0); // Reset to 0 after complete rotation
        }
      });
    }, 5000);
    
    return () => clearInterval(spinInterval);
  }, []);
  
  // Animate Billy when section changes
  useEffect(() => {
    if (!billyRef.current) return;
    
    if (currentSection === 'meet') {
      // Meet Billy - center
      gsap.to({}, {
        duration: 1.5,
        onUpdate: function() {
          setBillyPosition({ x: 0, y: 0 });
          setBillyRotation(0);
          setBillyRotation3D(0);
        }
      });
    } else if (currentSection === 'help') {
      // Help Billy - move to left
      gsap.to({}, {
        duration: 1.5,
        onUpdate: function() {
          const progress = this.progress();
          setBillyPosition({ x: -400 * progress, y: -200 * progress });
        }
      });
    } else if (currentSection === 'action') {
      // Action - move to top-left and rotate smoothly
      gsap.to({}, {
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          // Smoothly animate from (-400, -200) to (-600, -400)
          setBillyPosition({ 
            x: -400 + (-200 * progress), 
            y: -200 + (-200 * progress) 
          });
          setBillyRotation3D(progress * Math.PI * 2); // Full rotation in radians
        }
      });
    }
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

    // Split all text elements
    const title1Words = splitWords(title1Ref.current);
    const title2Words = splitWords(title2Ref.current);
    const title3Words = splitWords(title3Ref.current);
    const desc1Words = splitWords(desc1Ref.current);
    const plasticWords = splitWords(plasticTextRef.current);
    const desc2Words = splitWords(desc2Ref.current);

    // Track scroll progress for face changes only
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Change face and section based on scroll progress
          if (progress < 0.25) {
            // Meet Billy section
            if (currentSection !== 'meet') {
              setCurrentSection('meet');
              setFaceIndex(0);
            }
          } else if (progress < 0.9) {
            // Help Billy section
            if (currentSection !== 'help') {
              setCurrentSection('help');
              setFaceIndex(0);
            }
          } else {
            // Action section
            if (currentSection !== 'action') {
              setCurrentSection('action');
              setFaceIndex(0);
              setCurrentFace('love');
            }
          }
        }
      }
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
      {/* Animated Bubbles - change color based on section */}
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
        .bubble-animated {
          position: fixed;
          bottom: -100px;
          border-radius: 50%;
          animation: float-up linear infinite;
          pointer-events: none;
          z-index: 40;
          transition: background 0.8s ease;
        }
        .bubble-white {
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
        }
        .bubble-green {
          background: radial-gradient(circle at 30% 30%, rgba(74, 222, 128, 0.8), rgba(34, 197, 94, 0.2));
        }
      `}</style>
      
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '10%', width: '20px', height: '20px', animationDuration: '8s', animationDelay: '0s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '20%', width: '15px', height: '15px', animationDuration: '10s', animationDelay: '2s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '30%', width: '25px', height: '25px', animationDuration: '7s', animationDelay: '4s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '40%', width: '18px', height: '18px', animationDuration: '9s', animationDelay: '1s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '50%', width: '22px', height: '22px', animationDuration: '11s', animationDelay: '3s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '60%', width: '16px', height: '16px', animationDuration: '8s', animationDelay: '5s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '70%', width: '20px', height: '20px', animationDuration: '10s', animationDelay: '2s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '80%', width: '24px', height: '24px', animationDuration: '9s', animationDelay: '0s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '90%', width: '18px', height: '18px', animationDuration: '7s', animationDelay: '4s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '15%', width: '14px', height: '14px', animationDuration: '12s', animationDelay: '6s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '75%', width: '21px', height: '21px', animationDuration: '8s', animationDelay: '3s' }}></div>
      <div className={`bubble-animated ${currentSection === 'help' ? 'bubble-green' : 'bubble-white'}`} style={{ left: '35%', width: '17px', height: '17px', animationDuration: '10s', animationDelay: '1s' }}></div>
      
      {/* Billy - fixed position, moves with scroll */}
      <div 
        ref={billyRef}
        className="w-[100dvw] h-[100dvh] fixed top-0 left-0 z-50 pointer-events-none overflow-hidden"
        style={{ 
          transform: `translate(${billyPosition.x}px, ${billyPosition.y}px)` 
        }}
      >
        <Scene characterConfig={{ body: 'pink-octopi', face: currentFace }} rotation3D={billyRotation3D} />
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
            Meet <span className="text-pink-300 font-bold">Billy</span> the <span className="text-pink-400">Octopus</span>
          </h2>

          <p
            ref={desc1Ref}
            className="text-xl text-white/95 leading-relaxed font-medium mb-8"
          >
            <span className="text-pink-300 font-bold">Billy</span> lives in a healthy marine ecosystem. Watch as his world changes when pollution arrives. His story reflects what's happening in our oceans.
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
            <span className="text-pink-300 font-bold">Billy</span> Needs Our Help
          </h2>
          <p
            ref={desc2Ref}
            className="text-lg text-white/90 leading-relaxed"
          >
            <span className="text-pink-300 font-bold">Billy</span>'s home is destroyed. His ocean is polluted, his food sources are contaminated, and his family is in danger. But there's hope...
          </p>
        </div>
      </section>

      {/* Section 3: You Can Help */}
      <section
        ref={section3Ref}
        className="relative w-full h-[180vh] bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center px-6 pt-96 pb-20 overflow-hidden"
      >
        {/* Bubbles throughout entire section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bottom layer bubbles */}
          <div className="absolute bottom-0 left-[8%] w-8 h-8 bg-cyan-400/30 rounded-full animate-bubble" style={{ animationDelay: '0s', animationDuration: '5s' }} />
          <div className="absolute bottom-0 left-[15%] w-6 h-6 bg-blue-400/25 rounded-full animate-bubble" style={{ animationDelay: '0.7s', animationDuration: '5.5s' }} />
          <div className="absolute bottom-0 left-[23%] w-10 h-10 bg-cyan-300/20 rounded-full animate-bubble" style={{ animationDelay: '1.2s', animationDuration: '6s' }} />
          <div className="absolute bottom-0 left-[34%] w-7 h-7 bg-blue-300/30 rounded-full animate-bubble" style={{ animationDelay: '1.8s', animationDuration: '5.2s' }} />
          <div className="absolute bottom-0 left-[45%] w-5 h-5 bg-cyan-500/25 rounded-full animate-bubble" style={{ animationDelay: '2.5s', animationDuration: '5.8s' }} />
          <div className="absolute bottom-0 left-[56%] w-9 h-9 bg-blue-400/20 rounded-full animate-bubble" style={{ animationDelay: '0.9s', animationDuration: '6.3s' }} />
          <div className="absolute bottom-0 left-[67%] w-6 h-6 bg-cyan-400/30 rounded-full animate-bubble" style={{ animationDelay: '1.5s', animationDuration: '5.7s' }} />
          <div className="absolute bottom-0 left-[78%] w-8 h-8 bg-blue-300/25 rounded-full animate-bubble" style={{ animationDelay: '0.4s', animationDuration: '6.2s' }} />
          <div className="absolute bottom-0 left-[88%] w-7 h-7 bg-cyan-300/30 rounded-full animate-bubble" style={{ animationDelay: '2.1s', animationDuration: '5.5s' }} />
          <div className="absolute bottom-0 left-[93%] w-5 h-5 bg-blue-400/20 rounded-full animate-bubble" style={{ animationDelay: '2.8s', animationDuration: '5.6s' }} />
          
          {/* Middle layer bubbles */}
          <div className="absolute bottom-0 left-[12%] w-7 h-7 bg-cyan-500/25 rounded-full animate-bubble" style={{ animationDelay: '0.3s', animationDuration: '6.1s' }} />
          <div className="absolute bottom-0 left-[28%] w-6 h-6 bg-blue-300/30 rounded-full animate-bubble" style={{ animationDelay: '2.0s', animationDuration: '5.4s' }} />
          <div className="absolute bottom-0 left-[41%] w-8 h-8 bg-cyan-400/28 rounded-full animate-bubble" style={{ animationDelay: '1.1s', animationDuration: '5.9s' }} />
          <div className="absolute bottom-0 left-[52%] w-5 h-5 bg-blue-400/22 rounded-full animate-bubble" style={{ animationDelay: '3.0s', animationDuration: '6.4s' }} />
          <div className="absolute bottom-0 left-[63%] w-9 h-9 bg-cyan-300/26 rounded-full animate-bubble" style={{ animationDelay: '0.6s', animationDuration: '5.3s' }} />
          <div className="absolute bottom-0 left-[75%] w-6 h-6 bg-blue-300/24 rounded-full animate-bubble" style={{ animationDelay: '1.9s', animationDuration: '6.5s' }} />
          <div className="absolute bottom-0 left-[84%] w-7 h-7 bg-cyan-500/27 rounded-full animate-bubble" style={{ animationDelay: '2.4s', animationDuration: '5.1s' }} />
          
          {/* Top layer bubbles */}
          <div className="absolute bottom-0 left-[5%] w-6 h-6 bg-blue-400/23 rounded-full animate-bubble" style={{ animationDelay: '1.4s', animationDuration: '6.6s' }} />
          <div className="absolute bottom-0 left-[19%] w-8 h-8 bg-cyan-400/29 rounded-full animate-bubble" style={{ animationDelay: '0.2s', animationDuration: '5.8s' }} />
          <div className="absolute bottom-0 left-[32%] w-5 h-5 bg-blue-300/21 rounded-full animate-bubble" style={{ animationDelay: '2.7s', animationDuration: '6.2s' }} />
          <div className="absolute bottom-0 left-[48%] w-9 h-9 bg-cyan-300/25 rounded-full animate-bubble" style={{ animationDelay: '0.8s', animationDuration: '5.4s' }} />
          <div className="absolute bottom-0 left-[61%] w-6 h-6 bg-blue-400/28 rounded-full animate-bubble" style={{ animationDelay: '1.6s', animationDuration: '6.1s' }} />
          <div className="absolute bottom-0 left-[72%] w-7 h-7 bg-cyan-500/24 rounded-full animate-bubble" style={{ animationDelay: '2.9s', animationDuration: '5.7s' }} />
          <div className="absolute bottom-0 left-[82%] w-8 h-8 bg-blue-300/26 rounded-full animate-bubble" style={{ animationDelay: '0.5s', animationDuration: '6.4s' }} />
          <div className="absolute bottom-0 left-[91%] w-6 h-6 bg-cyan-400/22 rounded-full animate-bubble" style={{ animationDelay: '2.2s', animationDuration: '5.9s' }} />
        </div>
        
        <div className="text-center max-w-2xl z-10">
          <h2
            ref={title3Ref}
            className="text-5xl font-bold text-white mb-8"
          >
            You Can Help <span className="text-pink-300 font-bold">Billy</span>
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
              Get Started 
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
