import razorpay from "../config/razorpay.js"

// Payment Controller
export const initiatePayment =
  async (req, res) => {

    try {

      const options = {

        amount:
          Number(req.body.amount) * 100,

        currency: "INR",

        receipt:
          "order_rcptid_11",

      }

      const order =
        await razorpay.orders.create(
          options
        )

      res.json(order)

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: error.message,
      })

    }
}

export const verifyPayment = (req, res) => {
  // Verify payment
  res.json({ message: 'Verify payment' })
}

export const refundPayment = (req, res) => {
  // Refund payment
  res.json({ message: 'Refund payment' })
}