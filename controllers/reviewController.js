const Review = require('../models/Review');
const Book = require('../models/Book');

// Get reviews for a specific book (with bookId query param)
exports.getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) return res.status(400).json({ message: 'bookId query parameter required' });

    const reviews = await Review.find({ bookId }).populate('userId', 'name'); // Optional: populate user info
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit a new review
exports.addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;
    if (!bookId || !userId || !rating) {
      return res.status(400).json({ message: 'bookId, userId and rating are required' });
    }

    const review = new Review({ bookId, userId, rating, comment });
    await review.save();

    // Update book average rating
    const reviews = await Review.find({ bookId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: avgRating });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
