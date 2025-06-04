
const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('seller'), createProduct);

router.route('/:id')
  .get(getProductById);

module.exports = router;
