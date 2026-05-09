import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const BASE_URL = "https://api.themoviedb.org/3"

export const getTrendingMovies = async () => {

  try {

    const response = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    )

    return response.data.results

  } catch (error) {

    console.log(error)

  }
}

export const getMovieDetails = async (id) => {

  try {

    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
    )

    return response.data

  } catch (error) {

    console.log(error)

  }
}

export const searchMovies = async (query) => {

  try {

    const response = await axios.get(

      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`

    )

    return response.data.results

  } catch (error) {

    console.log(error)

  }
}

export const getMovieTrailer =
  async (id) => {

    try {

      const response =
        await axios.get(

          `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`

        )

      const trailer =
        response.data.results.find(

          (video) =>
            video.type ===
            "Trailer"

        )

      return trailer

    } catch (error) {

      console.log(error)

    }
}

export const getRecommendedMovies =
  async (id) => {

    try {

      const response =
        await axios.get(

          `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`

        )

      return response.data.results

    } catch (error) {

      console.log(error)

    }
}