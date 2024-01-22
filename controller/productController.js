const moment = require('moment');
const Product = require('../model/productModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObject');
const multerUpload = require(process.env.NODE_ENV === 'test'
  ? '../test/mocks/multerMock'
  : '../utils/multerUpload');
const AppError = require('../utils/AppError');
const path = require('path');
const fs = require('fs');

const upload = multerUpload('product');
const multerUploadProduct = upload.array('images', 6);

const productPost = catchAsync(async (req, res, next) => {
  const productData = await Product.create({
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    size: req.body.size,
    stock: req.body.stock,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    images: req.files.map((img) => img.filename),
    hashtags: req.body.hashtags,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });

  res.status(200).json({ status: 'success', data: productData });
});

const reviewAllProduct = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query).filter().sort();

  const productData = await features.query;

  res.status(200).json({ data: productData });
});

const reviewOneProduct = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.query.product).populate(
    'reviews'
  );

  if (!productData) return next(new AppError('product does not exist', 400));

  res.status(200).json({ status: 'success', data: productData });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const filterObject = filterObj(
    req.body,
    'category',
    'name',
    'description',
    'size',
    'hashtags'
  );

  if (req.files) filterObject.images = req.files.map((img) => img.filename);
  if (req.body.discountPrice)
    filterObject.discountPrice = Number(req.body.discountPrice);
  if (req.body.price) filterObject.price = Number(req.body.price);
  if (req.body.stock) filterObject.stock = Number(req.body.stock);

  const existingProduct = await Product.findById(req.query.id);

  if (!existingProduct) {
    return next(new AppError('Product not found', 404));
  }

  Object.assign(existingProduct, filterObject);

  const productdata = await existingProduct.save();
  res.status(200).json({ status: 'success', data: productdata });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.query.id);

  if (!productData) return next(new AppError('document is not found', 404));

  process.env.NODE_ENV === 'test' ||
    productData.images
      .map((image) => path.join(__dirname, '..', 'public', 'img', image))
      .forEach((img) =>
        fs.unlink(img, (err) =>
          err ? console.log(err) : console.log('image deleted')
        )
      );

  await Product.deleteOne({ _id: productData.id });

  res.status(200).json({
    status: 'success',
    message: 'product successfully deleted!',
  });
});

const deleteImage = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.query.id);

  if (!productData) return next(new AppError('document is not found', 404));

  const newImages = productData.images.filter((img) => img !== req.body.image);

  const imagePath = path.join(__dirname, '..', 'public', 'img', req.body.image);

  process.env.NODE_ENV === 'test' ||
    fs.unlink(imagePath, (err) =>
      err
        ? next(new AppError('image not found', 404))
        : console.log('image deleted')
    );

  productData.images = newImages;
  await productData.save();

  res.status(200).json({
    status: 'success',
    message: 'image successfully deleted!',
  });
});

module.exports = {
  productPost,
  multerUploadProduct,
  reviewAllProduct,
  reviewOneProduct,
  updateProduct,
  deleteProduct,
  deleteImage,
};
