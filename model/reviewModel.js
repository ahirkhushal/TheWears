const mongoose = require('mongoose');
const Product = require('./productModel');

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

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nReviews: { $sum: 1 },
        avgRatings: { $avg: '$ratings' },
      },
    },
  ]);

  console.log(stats, '-----<><>');

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: stats[0].avgRatings,
      ratingsQuantity: stats[0].nReviews,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.post(/^findOneAnd/, async function (review) {
  await review?.constructor.calcAverageRatings(review.product);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
