import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
//import products from './data/products.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middelware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'

// To get from process.env
dotenv.config()

// To run database config
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

// Mounting of routes
app.use('/api/products', productRoutes)

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
