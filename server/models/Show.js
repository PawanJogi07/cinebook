// Show Model
const showSchema = {
  movieId: String,
  theatreId: String,
  screenNumber: Number,
  startTime: Date,
  endTime: Date,
  price: Number,
  availableSeats: [String],
  bookedSeats: [String],
  createdAt: { type: Date, default: Date.now }
}

export default showSchema
