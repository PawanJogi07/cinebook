// Theatre Model
const theatreSchema = {
  name: String,
  city: String,
  address: String,
  phone: String,
  screens: [{ screenNumber: Number, totalSeats: Number }],
  createdAt: { type: Date, default: Date.now }
}

export default theatreSchema
