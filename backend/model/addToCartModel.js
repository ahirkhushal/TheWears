const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const addToCartSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
  selectSize: { type: String, required: true },
  quantity: {
    type: Number,
    default: 1,
    min: [1, 'you can buy minimum 1 product'],
    max: [10, 'you can buy maximum 5 products at once!'],
    // validate: {
    //   validator: async function (value) {
    //     const product = this.product;
    //     if (!product) return true;
    //     const stock = product.stock;
    //     return value >= 1 && value <= stock;
    //   },
    //   message: 'Invalid quantity or insufficient stock.',
    // },
  },
  price: {
    type: Number,
    default: 0,
  },
});

addToCartSchema.pre('save', async function (next) {
  const populatedProduct = await this.populate({
    path: 'product',
    select: 'price',
  });

  if (!this.product) return next(new AppError('invalid productId', 400));

  this.price = populatedProduct.product.price * this.quantity;

  next();
});

addToCartSchema.pre(/^find/, function (next) {
  this.populate({ path: 'product' }).populate({
    path: 'user',
    select: 'username',
  });
  next();
});

const AddToCart = mongoose.model('AddToCart', addToCartSchema);

module.exports = AddToCart;
