
const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('sellerId', 'name email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get all reviews for this product
    const reviews = await Review.find({ productId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      ...product.toObject(),
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Seller only)
const createProduct = async (req, res) => {
  try {
    const { title, description, imageURL, category } = req.body;

    if (!title || !description || !imageURL || !category) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const product = await Product.create({
      title,
      description,
      imageURL,
      category,
      sellerId: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
