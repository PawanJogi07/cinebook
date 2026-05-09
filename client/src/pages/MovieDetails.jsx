import { useEffect, useState } from "react"

import {
  useParams,
  useNavigate,
} from "react-router-dom"

import {
  getMovieDetails,
  getMovieTrailer,
  getRecommendedMovies,
} from "../services/movieService"

function MovieDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)

  const [trailer, setTrailer] =
    useState(null)

  const [showTrailer, setShowTrailer] =
    useState(false)

  const [
    recommendedMovies,
    setRecommendedMovies,
  ] = useState([])

  useEffect(() => {

    fetchMovie()

  }, [id])

  const fetchMovie = async () => {

    const data = await getMovieDetails(id)

    setMovie(data)

    const trailerData =
      await getMovieTrailer(id)

    setTrailer(trailerData)

    const recommended =
      await getRecommendedMovies(id)

    setRecommendedMovies(recommended)

  }

  if (!movie) {

    return (

      <div className="bg-black min-h-screen flex items-center justify-center text-white text-4xl">

        Loading...

      </div>

    )
  }

  return (

    <div className="bg-black min-h-screen text-white">

      <div
        className="h-[70vh] bg-cover bg-center flex items-end"
        style={{
          backgroundImage:
            `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >

        <div className="bg-gradient-to-t from-black to-transparent w-full p-10">

          <div className="flex gap-10">

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-[300px] rounded-xl"
            />

            <div>

              <h1 className="text-6xl font-bold mb-4">
                {movie.title}
              </h1>

              <p className="text-gray-300 max-w-3xl mb-6">
                {movie.overview}
              </p>

              <div className="flex gap-8 text-lg mb-6">

                <p>
                  ⭐ {movie.vote_average}
                </p>

                <p>
                  📅 {movie.release_date}
                </p>

              </div>

              <div className="flex gap-4">

                <button
                  onClick={() =>
                    navigate(
                      `/theatres?movieId=${movie.id}`
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg text-xl font-semibold"
                >

                  Book Tickets

                </button>

                {
                  trailer && (

                    <button
                      onClick={() =>
                        setShowTrailer(true)
                      }
                      className="bg-white text-black hover:bg-gray-300 px-8 py-3 rounded-lg text-xl font-semibold"
                    >

                      ▶ Watch Trailer

                    </button>

                  )
                }

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-8">

          You May Also Like

        </h1>

        <div className="flex gap-6 flex-wrap">

          {
            recommendedMovies
              .slice(0, 6)
              .map((movie) => (

                <div
                  key={movie.id}
                  onClick={() =>
                    navigate(
                      `/movie/${movie.id}`
                    )
                  }
                  className="w-[220px] cursor-pointer"
                >

                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-xl hover:scale-105 transition"
                  />

                  <h2 className="text-xl font-bold mt-4">

                    {movie.title}

                  </h2>

                </div>
              ))
          }

        </div>

      </div>

      {
        showTrailer && (

          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">

            <div className="relative w-[90%] md:w-[900px]">

              <button
                onClick={() =>
                  setShowTrailer(false)
                }
                className="absolute -top-12 right-0 text-white text-4xl"
              >

                ✕

              </button>

              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="rounded-2xl"
              />

            </div>

          </div>

        )
      }

    </div>
  )
}

export default MovieDetails