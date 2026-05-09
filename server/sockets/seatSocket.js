export const handleSeatSocket = (io) => {

  let lockedSeats = []

  io.on("connection", (socket) => {

    console.log("User Connected")

    socket.emit("initialSeats", lockedSeats)

    socket.on("lockSeat", (seat) => {

      if (!lockedSeats.includes(seat)) {

        lockedSeats.push(seat)

        io.emit("seatLocked", seat)

      }
    })

    socket.on("unlockSeat", (seat) => {

      lockedSeats =
        lockedSeats.filter((s) => s !== seat)

      io.emit("seatUnlocked", seat)

    })

  })
}