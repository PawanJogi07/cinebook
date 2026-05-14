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

// FIXED MIDDLEWARE - ORDER MATTERS

// Middleware

app.use(cors({
  origin: "*"
}))

app.use(express.json({
  limit: "50mb"
}))

app.use(express.urlencoded({
  extended: true
}))
// DEBUG BODY

app.use((req, res, next) => {
  console.log("METHOD:", req.method)
  console.log("URL:", req.url)
  console.log("BODY:", req.body)
  console.log("HEADERS:", req.headers['content-type'])
  next()
})

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected')
})
.catch((error) => {
  console.log(error)
})

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