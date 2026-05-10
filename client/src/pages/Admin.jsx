import { useEffect, useState } from "react"

import axios from "axios"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

function Admin() {

  const [bookings, setBookings] =
    useState([])

  useEffect(() => {

    fetchBookings()

  }, [])

  const fetchBookings = async () => {

    try {

      const { data } =
        await axios.get(
          "https://cinebook-api-iifm.onrender.com/api/bookings/admin/all"
        )

      setBookings(data)

    } catch (error) {

      console.log(error)

    }
  }

  const totalRevenue =
    bookings.reduce(

      (acc, booking) =>
        acc + booking.total,

      0
    )

  const analyticsData = [

    {
      name: "Bookings",
      value: bookings.length,
    },

    {
      name: "Revenue",
      value: totalRevenue,
    },

    {
      name: "Users",
      value:
        new Set(
          bookings.map(
            (b) => b.userId
          )
        ).size,
    },

  ]

  const pieData = [

    {
      name: "Revenue",
      value: totalRevenue,
    },

    {
      name: "Bookings",
      value: bookings.length,
    },

  ]

  return (

    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold mb-10 text-center">

        Admin Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-10">

        <div className="bg-zinc-900 p-8 rounded-2xl">

          <h2 className="text-2xl mb-4">

            Total Bookings

          </h2>

          <p className="text-5xl font-bold text-red-500">

            {bookings.length}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl">

          <h2 className="text-2xl mb-4">

            Revenue

          </h2>

          <p className="text-5xl font-bold text-green-500">

            ₹{totalRevenue}

          </p>

        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl">

          <h2 className="text-2xl mb-4">

            Active Users

          </h2>

          <p className="text-5xl font-bold text-blue-500">

            {
              new Set(
                bookings.map(
                  (b) => b.userId
                )
              ).size
            }

          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-10">

        <div className="bg-zinc-900 p-8 rounded-2xl h-[400px]">

          <h2 className="text-3xl font-bold mb-8">

            Revenue Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={analyticsData}
            >

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#ef4444"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-zinc-900 p-8 rounded-2xl h-[400px]">

          <h2 className="text-3xl font-bold mb-8">

            Booking Distribution

          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >

                <Cell fill="#22c55e" />

                <Cell fill="#3b82f6" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-zinc-900 p-8 rounded-2xl">

        <h2 className="text-3xl font-bold mb-8">

          Recent Bookings

        </h2>

        <div className="space-y-6">

          {
            bookings.map(
              (booking, index) => (

                <div
                  key={index}
                  className="border-b border-zinc-700 pb-4"
                >

                  <p>
                    🎬 Movie ID:
                    {" "}
                    {booking.movieId}
                  </p>

                  <p>
                    🎟 Seats:
                    {" "}
                    {
                      booking.seats.join(", ")
                    }
                  </p>

                  <p>
                    💰 Total:
                    {" "}
                    ₹{booking.total}
                  </p>

                  <p>
                    👤 User:
                    {" "}
                    {booking.userId}
                  </p>

                </div>
              )
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Admin