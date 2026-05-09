import { Link, useNavigate } from "react-router-dom"

import { useState } from "react"

import {
  FaSearch,
  FaUserCircle,
} from "react-icons/fa"

import { searchMovies } from "../services/movieService"

function Navbar({
  darkMode,
  setDarkMode,
}) {

  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    window.location.reload()

  }

  const handleSearch = async (e) => {

    if (e.key === "Enter") {

      const movies = await searchMovies(search)

      if (movies.length > 0) {

        navigate(`/movie/${movies[0].id}`)

      }
    }
  }

  return (

    <nav className="bg-zinc-900 px-4 md:px-10 py-4 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">

      <Link
        to="/"
        className="text-red-500 text-2xl md:text-3xl font-bold"
      >
        CineBook
      </Link>

      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-center">

        <div className="bg-zinc-800 px-4 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search Movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent outline-none text-white w-full md:w-[250px]"
          />

        </div>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="text-2xl"
        >

          {
            darkMode
              ? "☀️"
              : "🌙"
          }

        </button>

        {
          userInfo ? (

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2">

                <FaUserCircle className="text-white text-3xl" />

                <p className="text-white font-semibold">
                  {userInfo.name}
                </p>

              </div>

              <Link
                to="/my-bookings"
                className="text-white hover:text-red-500"
              >

                My Bookings

              </Link>

              <Link
                to="/admin"
                className="text-white hover:text-red-500"
              >

                Admin

              </Link>

              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
              >

                Logout

              </button>

            </div>

          ) : (

            <div className="flex items-center gap-4">

              <Link
                to="/login"
                className="text-white hover:text-red-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
              >
                Register
              </Link>

            </div>

          )
        }

      </div>

    </nav>
  )
}

export default Navbar