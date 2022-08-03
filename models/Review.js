import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  title: String,
  content: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  phenomId: { type: Schema.Types.ObjectId, ref: 'Phenomenon' },
  imgReviewUrl: String,
}, {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
