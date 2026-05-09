import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"
import HeroBanner from "../components/HeroBanner"
import MovieCard from "../components/MovieCard"

import { getTrendingMovies } from "../services/movieService"

function Home() {

  const [movies, setMovies] = useState([])

  useEffect(() => {

    fetchMovies()

  }, [])

  const fetchMovies = async () => {

    const data = await getTrendingMovies()

    setMovies(data)

  }

  return (

    <div className="bg-black min-h-screen">

      <Navbar />

      <HeroBanner />

      <div className="px-4 md:px-10 py-10">

        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          Trending Movies
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {movies.map((movie) => (

            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />

          ))}

        </div>

      </div>

    </div>
  )
}

export default Home