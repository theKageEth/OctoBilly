"use client";

export default function StorySection1() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Statistics Content */}
      <div className="max-w-4xl text-center z-10">
        <h2 className="text-5xl font-bold text-white mb-12">The Reality of Ocean Pollution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <p className="text-6xl font-bold text-yellow-300 mb-4">8M</p>
            <p className="text-xl text-white font-semibold">Tonnes of plastic</p>
            <p className="text-white/80">enter our oceans every year</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <p className="text-6xl font-bold text-red-300 mb-4">100K</p>
            <p className="text-xl text-white font-semibold">Marine animals</p>
            <p className="text-white/80">die annually from plastic pollution</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <p className="text-6xl font-bold text-orange-300 mb-4">450</p>
            <p className="text-xl text-white font-semibold">Years</p>
            <p className="text-white/80">for a plastic bottle to decompose</p>
          </div>
        </div>

        <p className="text-2xl text-white/90 mt-12">
          Every bottle we use impacts Billy's home
        </p>
      </div>

      {/* Ocean floor gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-yellow-600/30 to-transparent" />
    </section>
  );
}