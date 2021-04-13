import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
//import { protect, admin } from '../middleware/authMiddleware.js

const router = express.Router()

// router.get('/api/products', (req, res) => {
//   res.json(products)
// })

// router.get('/api/products/:id', (req, res) => {
//   const product = products.find((product) => product._id === req.params.id)
//   res.json(product)
// })

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({})

//     res.json(products)
//   })
// )
router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
