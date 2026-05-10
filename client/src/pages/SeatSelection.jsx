import { useState, useEffect } from "react"

import {
  useNavigate,
  useParams,
} from "react-router-dom"

import axios from "axios"

import socket from "../socket"

function SeatSelection() {

  const navigate = useNavigate()

  const { id } = useParams()

  const rows = ["A", "B", "C", "D", "E"]

  const seatsPerRow = 10

  const [selectedSeats, setSelectedSeats] =
    useState([])

  const [lockedSeats, setLockedSeats] =
    useState([])

  const [bookedSeats, setBookedSeats] =
    useState([])

  const [timer, setTimer] =
    useState(300)

  useEffect(() => {

    fetchBookedSeats()

    socket.on("initialSeats", (seats) => {

      setLockedSeats(seats)

    })

    socket.on("seatLocked", (seat) => {

      setLockedSeats((prev) => [
        ...prev,
        seat,
      ])

    })

    socket.on("seatUnlocked", (seat) => {

      setLockedSeats((prev) =>
        prev.filter((s) => s !== seat)
      )

    })

    return () => {

      socket.off("initialSeats")

      socket.off("seatLocked")

      socket.off("seatUnlocked")

    }

  }, [])

  useEffect(() => {

    let interval

    if (
      selectedSeats.length > 0 &&
      timer > 0
    ) {

      interval = setInterval(() => {

        setTimer(
          (prev) => prev - 1
        )

      }, 1000)

    }

    if (timer === 0) {

      selectedSeats.forEach((seat) => {

        socket.emit(
          "unlockSeat",
          seat
        )

      })

      setSelectedSeats([])

      alert(
        "Seat Hold Expired 😢"
      )

      setTimer(300)

    }

    return () =>
      clearInterval(interval)

  }, [selectedSeats, timer])

  const fetchBookedSeats = async () => {

    try {

      const { data } =
        await axios.get(
          `https://cinebook-api-iifm.onrender.com/api/bookings/${id}`
        )

      setBookedSeats(data)

    } catch (error) {

      console.log(error)

    }
  }

  const toggleSeat = (seat) => {

    if (
      bookedSeats.includes(seat)
    ) {

      return

    }

    if (
      lockedSeats.includes(seat) &&
      !selectedSeats.includes(seat)
    ) {

      return

    }

    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter(
          (s) => s !== seat
        )
      )

      socket.emit("unlockSeat", seat)

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat,
      ])

      setTimer(300)

      socket.emit("lockSeat", seat)

    }
  }

  const totalPrice =
    selectedSeats.length * 250

  return (

    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold mb-10 text-center">
        Select Seats
      </h1>

      <div className="flex flex-col items-center gap-4">

        {rows.map((row) => (

          <div
            key={row}
            className="flex gap-3"
          >

            {[...Array(seatsPerRow)].map(
              (_, index) => {

                const seat =
                  `${row}${index + 1}`

                const selected =
                  selectedSeats.includes(seat)

                const locked =
                  lockedSeats.includes(seat)

                const booked =
                  bookedSeats.includes(seat)

                return (

                  <button
                    key={seat}
                    onClick={() =>
                      toggleSeat(seat)
                    }
                    className={`w-12 h-12 rounded-lg font-semibold transition

                    ${
                      booked
                        ? "bg-gray-700 cursor-not-allowed"

                      : selected
                        ? "bg-red-500"

                      : locked
                        ? "bg-gray-500"

                      : "bg-zinc-800 hover:bg-zinc-700"
                    }
                    `}
                  >

                    {seat}

                  </button>
                )
              }
            )}

          </div>
        ))}

      </div>

      <div className="text-center mt-10">

        <h2 className="text-3xl font-bold mb-6 text-yellow-400">

          Seat Hold Time :

          {
            Math.floor(timer / 60)
          }:
          {
            String(timer % 60)
              .padStart(2, "0")
          }

        </h2>

        <h2 className="text-2xl mb-4">
          Selected Seats:
        </h2>

        <p className="text-red-500 text-xl mb-4">
          {selectedSeats.join(", ")}
        </p>

        <h2 className="text-3xl font-bold mb-6">
          Total : ₹{totalPrice}
        </h2>

        <button
          onClick={() =>
            navigate("/food", {
              state: {
                movieId: id,
                seats: selectedSeats,
                total: totalPrice,
              },
            })
          }
          className="mt-8 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-xl font-semibold"
        >

          Proceed To Payment

        </button>

      </div>

    </div>
  )
}

export default SeatSelection