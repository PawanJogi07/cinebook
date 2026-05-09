import Booking from "../models/Booking.js"

import nodemailer from "nodemailer"

export const createBooking = async (req, res) => {

  try {

    const {
      movieId,
      seats,
      total,
      userId,
      email,
    } = req.body

    const booking =
      await Booking.create({

        movieId,
        seats,
        total,
        userId,

      })

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            "pjpawan007@gmail.com",

          pass:
            "tqxg iwkz xmds yrle",

        },

      })

    await transporter.sendMail({

      from:
        "yourgmail@gmail.com",

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

    res.status(201).json(booking)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }
}

export const getBookedSeats = async (req, res) => {

  try {

    const bookings =
      await Booking.find({
        movieId: req.params.movieId,
      })

    const bookedSeats =
      bookings.flatMap(
        (booking) => booking.seats
      )

    res.json(bookedSeats)

  } catch (error) {

    res.status(500).json({
      message: error.message,
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
        message: error.message,
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
        message: error.message,
      })

    }
}