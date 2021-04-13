import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
//import products from './data/products.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// To get from process.env
dotenv.config()

// To run database config
connectDB()

const app = express()

//Body parser - allow to accept JSON data in the body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

// Mounting of routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//To fetch Paypal clientId - similar to a config route
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//To make uploads folder static and point to /uploads
//Since __dirname is not available if using ES module, only in common js
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Custom error handling and 404 middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
