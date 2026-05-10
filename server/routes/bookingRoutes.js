import express from "express"

import {
  createBooking,
  getBookedSeats,
  getUserBookings,
  getAllBookings,
} from "../controllers/bookingController.js"

const router = express.Router()

// create booking

router.post(
  "/",
  createBooking
)

// admin all bookings

router.get(
  "/admin/all",
  getAllBookings
)

// user bookings

router.get(
  "/user/:userId",
  getUserBookings
)

// booked seats by movie

router.get(
  "/:movieId",
  getBookedSeats
)

export default router