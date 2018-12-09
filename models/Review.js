const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = Schema({
  title:String,
  content: String,
  authorId: { type: Object, default: {} },
  imgReviewUrl: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;