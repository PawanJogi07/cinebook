import { useEffect, useState } from "react"

import axios from "axios"

function MyBookings() {

  const [bookings, setBookings] =
    useState([])

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        ) || {}

      const { data } =
        await axios.get(

          `http://localhost:5000/api/bookings/user/${userInfo._id}`

        )

      setBookings(data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold text-center mb-12">

        My Bookings

      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {
          bookings.map(
            (booking, index) => (

              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-2xl"
              >

                <h2 className="text-3xl font-bold mb-4">

                  Ticket #{index + 1}

                </h2>

                <p className="text-xl mb-3">

                  Movie ID :
                  {" "}
                  {booking.movieId}

                </p>

                <p className="text-xl mb-3">

                  Seats :
                  {" "}
                  {
                    booking.seats.join(
                      ", "
                    )
                  }

                </p>

                <p className="text-xl mb-6">

                  Total :
                  {" "}
                  ₹{booking.total}

                </p>

                <button
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg"
                >

                  Download Ticket

                </button>

              </div>
            )
          )
        }

      </div>

    </div>
  )
}

export default MyBookings