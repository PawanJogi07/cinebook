import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

import { createServer } from 'http'
import { Server } from 'socket.io'

import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import theatreRoutes from './routes/theatreRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

import { errorMiddleware } from './middleware/errorMiddleware.js'
import { handleSeatSocket } from './sockets/seatSocket.js'

const app = express()

const httpServer = createServer(app)

const io = new Server(httpServer, {

  cors: {
  origin: "*",
  methods: ["GET", "POST"]
}

})

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log('MongoDB Connected')

})
.catch((error) => {

  console.log(error)

})

// Middleware

app.use(cors({
  origin: "*"
}))

// Routes

app.use('/api/auth', authRoutes)

app.use('/api/movies', movieRoutes)

app.use('/api/bookings', bookingRoutes)

app.use('/api/theatres', theatreRoutes)

app.use('/api/payments', paymentRoutes)

// Health Check

app.get('/api/health', (req, res) => {

  res.json({
    message: 'CineBook API Running'
  })

})

// Socket Connection

handleSeatSocket(io)

// Error Middleware

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {

  console.log(`Server Running On ${PORT}`)

})

export { app, io }