const mongoose = require('mongoose');

const addToFavouriteSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
    unique: [true, 'you already selected this product for favourite list!'],
  },
});

addToFavouriteSchema.pre(/^find/, function (next) {
  this.populate({ path: 'product' }).populate({
    path: 'user',
    select: 'username',
  });

  next();
});

const AddToFavourite = mongoose.model('AddToFavourite', addToFavouriteSchema);

module.exports = AddToFavourite;
