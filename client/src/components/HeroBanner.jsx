function HeroBanner() {
  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="bg-gradient-to-t from-black to-transparent w-full p-10">
        
        <h1 className="text-white text-6xl font-bold mb-4">
          Avengers Endgame
        </h1>

        <p className="text-gray-300 max-w-2xl text-lg">
          The epic conclusion to the Infinity Saga where the Avengers assemble
          once again to reverse Thanos' snap.
        </p>

        <button className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-white font-semibold">
          Book Now
        </button>

      </div>
    </div>
  )
}

export default HeroBanner