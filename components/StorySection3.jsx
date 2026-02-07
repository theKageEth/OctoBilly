'use client';

import OctopusProfile from "@/components/OctoProfile";

export default function StorySection3() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-blue-600 to-blue-700 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl z-10">
        <h2 className="text-5xl font-bold text-white mb-8">Billy Needs Our Help</h2>
        <p className="text-lg text-white/90 leading-relaxed mb-12">
          Billy's home is destroyed. His ocean is polluted, his food sources are contaminated, and his family is in danger. But there's hope...
        </p>
        
        <div className="mt-16">
          <OctopusProfile
            body="blue-octopi"
            face="cry"
          />
        </div>
      </div>
    </section>
  );
}
