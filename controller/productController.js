const moment = require('moment');
const Product = require('../model/productModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObject');
const multerUpload = require('../utils/multerUpload');
const AppError = require('../utils/AppError');
const path = require('path');
const fs = require('fs');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `product-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('not an image! please upload image', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

const upload = multerUpload('product');
const multerUploadProduct = upload.array('images', 6);

const productPost = catchAsync(async (req, res, next) => {
  const productData = await Product.create({
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    size: JSON.parse(req.body.size),
    stock: req.body.stock,
    ratingsAverage: req.body.ratingsAverage,
    ratingsQuantity: req.body.ratingsQuantity,
    images: req.files.map((img) => img.filename),
    hashtags: JSON.parse(req.body.hashtags),
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });

  res.status(200).json({ data: productData });
});

const reviewProduct = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query).filter().sort();

  const productData = await features.query;

  res.status(200).json({ productData });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const filterObject = filterObj(
    req.body,
    'category',
    'name',
    'description',
    'price',
    'size',
    'stock',
    'hashtags'
  );

  if (req.files) filterObject.images = req.files.map((img) => img.filename);
  if (req.body.size) filterObject.size = JSON.parse(req.body.size);
  if (req.body.hashtags) filterObject.hashtags = JSON.parse(req.body.hashtags);

  const productdata = await Product.findByIdAndUpdate(
    req.query.id,
    filterObject,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!productdata) return next(new AppError('data not found', 404));

  res.status(200).json({ status: 'success', data: productdata });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const productData = await Product.findById(req.query.id);

  if (!productData) return next(new AppError('document is not found', 404));

  productData.images
    .map((image) => path.join(__dirname, '..', 'public', 'img', image))
    .forEach((img) =>
      fs.unlink(img, (err) =>
        err ? console.log(err.message) : console.log('image deleted')
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

  fs.unlink(imagePath, (err) =>
    err ? console.log(err.message) : console.log(' image deleted')
  );

  productData.images = newImages;
  await productData.save();

  console.log(productData);
  res.status(200).json({
    status: 'success',
    message: 'image successfully deleted!',
    productData,
  });
});

module.exports = {
  productPost,
  multerUploadProduct,
  reviewProduct,
  updateProduct,
  deleteProduct,
  deleteImage,
};
