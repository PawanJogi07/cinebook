import Booking from "../models/Booking.js"

import nodemailer from "nodemailer"

export const createBooking = async (req, res) => {

  try {

    console.log(
      "BOOKING BODY:",
      req.body
    )

    const {
      movieId,
      seats,
      total,
      userId,
      email,
    } = req.body || {}

    if (
      !movieId ||
      !seats ||
      !total ||
      !userId
    ) {

      return res.status(400).json({
        message:
          "Missing booking fields",
      })

    }

    const booking =
      await Booking.create({

        movieId,
        seats,
        total,
        userId,

      })

    console.log(
      "Booking Saved:",
      booking
    )

    // EMAIL ENABLED

    if (email) {

      try {

        const transporter =
          nodemailer.createTransport({

            host:
              "smtp.gmail.com",

            port:
              465,

            secure:
              true,

            auth: {

              user:
                "pjpawan007@gmail.com",

              pass:
                "tqxg iwkz xmds yrle",

            },

          })

        await transporter.verify()

        console.log(
          "SMTP READY"
        )

        await transporter.sendMail({

          from:
            "pjpawan007@gmail.com",

          to:
            email,

          subject:
            "CineBook Ticket Confirmation 🎬",

          html: `

            <h1>Booking Confirmed 😄🔥</h1>

            <p>Movie ID: ${movieId}</p>

            <p>Seats: ${seats.join(", ")}</p>

            <p>Total Paid: ₹${total}</p>

          `,

        })

        console.log(
          "Email Sent Successfully"
        )

      } catch (mailError) {

        console.log(
          "EMAIL ERROR:",
          mailError.message
        )

      }

    }

    res.status(201).json({
      success: true,
      booking,
    })

  } catch (error) {

    console.log(
      "BOOKING ERROR:",
      error
    )

    res.status(500).json({
      message:
        error.message,
    })

  }
}

export const getBookedSeats = async (req, res) => {

  try {

    const bookings =
      await Booking.find({
        movieId:
          req.params.movieId,
      })

    const bookedSeats =
      bookings.flatMap(
        (booking) =>
          booking.seats
      )

    res.json(bookedSeats)

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    })

  }
}

export const getUserBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find({

          userId:
            req.params.userId,

        })

      res.json(bookings)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
}

export const getAllBookings =
  async (req, res) => {

    try {

      const bookings =
        await Booking.find()

      res.json(bookings)

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      })

    }
}