// Payment Model
const paymentSchema = {
  bookingId: String,
  amount: Number,
  currency: String,
  paymentMethod: String,
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
}

export default paymentSchema
