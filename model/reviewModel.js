const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'review is required'],
    },
    ratings: {
      type: Number,
      min: [1, 'minimum review should be 1'],
      max: [5, 'maximum review should be 5'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'review must belong to a product'],
    },
    images: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function () {
  this.populate({
    path: 'user',
    select: 'username photo',
  });
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
