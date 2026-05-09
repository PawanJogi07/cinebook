import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({

  movieId: {
    type: String,
    required: true,
  },

  seats: {
    type: [String],
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

})

const Booking =
  mongoose.model("Booking", bookingSchema)

export default Booking