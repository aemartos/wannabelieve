const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = Schema({
  title:String,
  content: String,
  authorId: Object,
  imgReviewUrl: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Review = mongoose.model('Comment', reviewSchema);

module.exports = Review;