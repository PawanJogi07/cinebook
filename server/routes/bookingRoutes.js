import express from "express"

import {
  createBooking,
  getBookedSeats,
  getUserBookings,
  getAllBookings,
} from "../controllers/bookingController.js"

const router = express.Router()

router.post("/", createBooking)

router.get(
  "/admin/all",
  getAllBookings
)

router.get(
  "/user/:userId",
  getUserBookings
)

router.get(
  "/:movieId",
  getBookedSeats
)

export default router