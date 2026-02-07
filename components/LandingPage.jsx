"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function LandingPage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // helper → split words
      const splitWords = (el) => {
        const words = el.innerText.split(" ");
        el.innerHTML = words
          .map((w) => `<span class="inline-block">${w}</span>`)
          .join(" ");
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

      // floating whole section
      gsap.to(".landing-container", {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-container relative w-full h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 flex items-center justify-center px-6 overflow-hidden">
      {/* background bubbles */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse" />

      <div className="text-center max-w-3xl z-10">
        <h1
          ref={titleRef}
          className="text-7xl font-black text-white mb-6 leading-tight"
        >
          A Reef Worth Saving
        </h1>

        <p
          ref={subtitleRef}
          className="text-2xl text-white/95 mb-8 font-bold"
        >
          Follow Billy’s journey
        </p>

        <p
          ref={descriptionRef}
          className="text-lg text-white/80 leading-relaxed mb-12"
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