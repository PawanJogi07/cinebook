import express from 'express'

import {
  initiatePayment,
  verifyPayment,
  refundPayment,
} from '../controllers/paymentController.js'

const router = express.Router()

router.post(
  '/initiate',
  initiatePayment
)

router.post(
  '/create-order',
  initiatePayment
)

router.post(
  '/verify',
  verifyPayment
)

router.post(
  '/refund',
  refundPayment
)

export default router