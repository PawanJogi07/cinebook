import { useState } from "react"

import {
  useNavigate,
  useLocation,
} from "react-router-dom"

import theatres from "../data/theatres"

function Theatres() {

  const navigate = useNavigate()

  const location = useLocation()

  const queryParams =
    new URLSearchParams(location.search)

  const movieId =
    queryParams.get("movieId")

  const [city, setCity] =
    useState("Indore")

  return (

    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold text-center mb-10">

        Select Theatre

      </h1>

      <div className="flex justify-center mb-10">

        <select
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="bg-zinc-900 px-6 py-3 rounded-lg text-xl"
        >

          <option>
            Indore
          </option>

          <option>
            Bhopal
          </option>

          <option>
            Delhi
          </option>

        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {
          theatres[city].map(
            (theatre, index) => (

              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-2xl"
              >

                <h2 className="text-3xl font-bold mb-4">

                  {theatre.name}

                </h2>

                <p className="text-red-500 text-xl mb-6">

                  {theatre.type}

                </p>

                <div className="flex flex-wrap gap-4">

                  {
                    theatre.timings.map(
                      (time, i) => (

                        <button
                          key={i}
                          onClick={() =>
                            navigate(
                              `/seat/${movieId}`,
                              {
                                state: {
                                  theatre:
                                    theatre.name,

                                  timing: time,
                                },
                              }
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg"
                        >

                          {time}

                        </button>
                      )
                    )
                  }

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}

export default Theatres