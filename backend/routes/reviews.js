
const express = require('express');
const { createReview, getProductReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, authorize('user'), createReview);
router.get('/:productId', getProductReviews);

module.exports = router;
