const AddToCart = require('../model/addToCartModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObject');

const AddtoCart = catchAsync(async (req, res, next) => {
  const AddtoCartData = await AddToCart.create({
    user: req.user.id,
    product: req.query.productId,
    selectSize: req.body.selectSize,
  });

  res.status(200).json({
    status: 'success',
    data: AddtoCartData,
    message: 'item successfully added to cart',
  });
});

const getCartItems = catchAsync(async (req, res, next) => {
  const cartItems = await AddToCart.find({ user: req.user.id });

  if (cartItems.length === 0)
    return next(new AppError('Empty cart! Start shopping now', 404));

  res.status(200).json({ status: 'success', data: cartItems });
});

const updateCartItems = catchAsync(async (req, res, next) => {
  const filterObject = filterObj(req.body, 'quantity', 'selectSize');

  const existingCartItem = await AddToCart.findById(req.query.id);

  if (!existingCartItem) return next(new AppError('Product not found', 404));

  Object.assign(existingCartItem, filterObject);
  const productdata = await existingCartItem.save();
  res.status(200).json({ status: 'success', data: productdata });
});

const removeCartItem = catchAsync(async (req, res, next) => {
  const removeCartItem = await AddToCart.findByIdAndDelete(req.query.id);

  if (!removeCartItem) return next(new AppError('data not found', 404));

  res.status(200).json({ status: 'success', message: 'product removed' });
});

module.exports = { AddtoCart, getCartItems, updateCartItems, removeCartItem };
