const APIFeatures = require('../utils/APIFeatures');
const AddToFavourite = require('../model/addToFavoriteModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Product = require('../model/productModel');

const addToFavouriteList = catchAsync(async (req, res, next) => {
  if (!req.body.productId)
    return next(new AppError('please provide productId', 400));

  const product = await Product.findById(req.body.productId);
  if (!product) return next(new AppError('invalid productId', 400));

  const addToFavouriteItem = await AddToFavourite.create({
    user: req.user.id,
    product: product.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'product successfully added to favourite list',
    data: addToFavouriteItem,
  });
});

const getFavouriteItems = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    AddToFavourite.find({ user: req.user.id }),
    req.query
  );

  const allFavouriteItems = await features.query;

  if (allFavouriteItems.length === 0)
    return next(new AppError("Zero favorites? Let's change that!", 404));

  res.status(200).json({ status: 'success', data: allFavouriteItems });
});

const removeFavouritesItems = catchAsync(async (req, res, next) => {
  if (!req.body.productId)
    return next(new AppError('please provide productId', 400));

  const deletedData = await AddToFavourite.findOneAndDelete({
    user: req.user.id,
    product: req.body.productId,
  });

  if (!deletedData) return next(new AppError('No favourite item found', 404));

  res.status(200).json({
    status: 'success',
    message: 'item successfully removed from your Favourite List',
  });
});

module.exports = {
  addToFavouriteList,
  getFavouriteItems,
  removeFavouritesItems,
};
