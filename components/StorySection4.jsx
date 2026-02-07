'use client';

export default function StorySection4() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-blue-700 to-blue-800 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl z-10">
        <h2 className="text-5xl font-bold text-white mb-8">You Can Help Billy</h2>
        <div className="space-y-6 text-lg text-white/90 mt-12">
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl font-bold text-green-300 mb-2">🌱 Reduce Plastic Use</p>
            <p>Choose reusable bags, bottles, and containers</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl font-bold text-green-300 mb-2">♻️ Recycle Properly</p>
            <p>Ensure your waste doesn't end up in the ocean</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
            <p className="text-2xl font-bold text-green-300 mb-2">🌊 Support Ocean Conservation</p>
            <p>Join beach cleanups and support marine protection organizations</p>
          </div>
        </div>
        <p className="text-3xl text-yellow-300 font-bold mt-16 animate-bounce">Together, we can save Billy's home 🐙💙</p>
      </div>
    </section>
  );
}
