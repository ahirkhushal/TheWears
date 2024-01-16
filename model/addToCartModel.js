const mongoose = require('mongoose');

const addToCartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', require: true },
  tour: { type: mongoose.Schema.ObjectId, ref: 'Tour', require: true },
});

const AddToCart = mongoose.model('AddToCart', addToCartSchema);

module.exports = AddToCart;
