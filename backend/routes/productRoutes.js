import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// router.get('/api/products', (req, res) => {
//   res.json(products)
// })

// router.get('/api/products/:id', (req, res) => {
//   const product = products.find((product) => product._id === req.params.id)
//   res.json(product)
// })

// @description Fetch all products
// @route  GET /api/products
// @access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //const product = products.find((product) => product._id === req.params.id)
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      //res.status(404).json({ message: 'Product not found' })
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
