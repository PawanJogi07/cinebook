import { useLocation } from "react-router-dom"

import jsPDF from "jspdf"

function Success() {

  const location = useLocation()

  const {
    seats,
    total,
    movieName,
  } = location.state || {}

  const ticketId =
    Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()

  const bookingDate =
    new Date().toLocaleDateString()

  const bookingTime =
    new Date().toLocaleTimeString()

  const downloadTicket = () => {

    const doc = new jsPDF()

    doc.setFillColor(0, 0, 0)

    doc.rect(0, 0, 210, 297, "F")

    doc.setTextColor(255, 255, 255)

    doc.setFontSize(28)

    doc.text("CineBook Ticket", 20, 30)

    doc.setDrawColor(255, 0, 0)

    doc.line(20, 40, 190, 40)

    doc.setFontSize(16)

    doc.text(
      `Movie: ${movieName || "Avengers Endgame"}`,
      20,
      70
    )

    doc.text(
      `Theatre: PVR Cinemas`,
      20,
      90
    )

    doc.text(
      `Seats: ${seats.join(", ")}`,
      20,
      110
    )

    doc.text(
      `Total Paid: ₹${total}`,
      20,
      130
    )

    doc.text(
      `Ticket ID: ${ticketId}`,
      20,
      150
    )

    doc.text(
      `Date: ${bookingDate}`,
      20,
      170
    )

    doc.text(
      `Time: ${bookingTime}`,
      20,
      190
    )

    doc.setFontSize(22)

    doc.setTextColor(255, 0, 0)

    doc.text(
      "Enjoy Your Movie 🍿",
      20,
      240
    )

    doc.save("CineBook-Ticket.pdf")
  }

  return (

    <div className="bg-black min-h-screen flex items-center justify-center text-white p-4">

      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-[600px]">

        <h1 className="text-4xl md:text-5xl font-bold text-green-500 text-center mb-10">
          Booking Confirmed
        </h1>

        <div className="space-y-6 text-lg md:text-xl">

          <div className="flex justify-between">
            <span>Movie</span>

            <span>
              {movieName || "Avengers Endgame"}
            </span>
          </div>

          <div className="flex justify-between">

            <span>Theatre</span>

            <span>PVR Cinemas</span>

          </div>

          <div className="flex justify-between">

            <span>Seats</span>

            <span>{seats.join(", ")}</span>

          </div>

          <div className="flex justify-between">

            <span>Total Paid</span>

            <span>₹{total}</span>

          </div>

          <div className="flex justify-between">

            <span>Ticket ID</span>

            <span>{ticketId}</span>

          </div>

        </div>

        <div className="mt-10 text-center">

          <button
            onClick={downloadTicket}
            className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg text-xl font-semibold"
          >

            Download Ticket

          </button>

        </div>

      </div>

    </div>
  )
}

export default Success