const moment = require('moment');
const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');
const multerUpload = require('../utils/multerUpload');
const AppError = require('../utils/AppError');
const filterObj = require('../utils/filterObject');
const path = require('path');
const fs = require('fs');
const upload = multerUpload('review');
const multerUploadProduct = upload.array('photo', 6);

const ImageDeleter = (photo, next, message, statusCode) => {
  const imagePath = path.join(__dirname, '..', 'public', 'img', photo);

  process.env.NODE_ENV === 'test' ||
    fs.unlink(imagePath, (e) =>
      e ? next(new AppError(e, 404)) : console.log('image deleted')
    );

  if (message) return next(new AppError(message, statusCode));
};

const reviewPost = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    review: req.body.review,
    ratings: req.body.ratings,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    images: req.files.map((img) => img.filename),
    product: req.query.product,
    user: req.user.id,
  });

  res.status(200).json({ status: 'success', data: review });
});

const getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find();

  if (review.length === 0)
    return res.status(200).json({
      status: 'success',
      data: 'No reviews available for this product.',
    });

  res.status(200).json({ status: 'success', data: review });
});

const getOneReview = catchAsync(async (req, res, next) => {
  const reviewData = await Review.findById(req.query.review);

  if (!reviewData)
    return next(new AppError('there is no document available', 400));

  res.status(200).json({ status: 'success', data: reviewData });
});

const updateReview = catchAsync(async (req, res, next) => {
  const filteredObject = filterObj(req.body, 'review');

  if (!filteredObject.review)
    return next(new AppError("you can't update review", 400));

  const reviewData = await Review.findById(req.query.review);

  if (reviewData.user.id === req.user.id || req.user.role === 'admin') {
    const updatedReviewData = await Review.findByIdAndUpdate(
      reviewData.id,
      filteredObject,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!reviewData)
      return next(new AppError('there is no document available', 400));

    res.status(200).json({ status: 'success', data: updatedReviewData });
  } else {
    return next(
      new AppError(
        'you do not have permission to update another users review',
        403
      )
    );
  }
});

const updateReviewImages = catchAsync(async (req, res, next) => {
  const reviewData = await Review.findById(req.query.review);

  if (!reviewData) {
    return ImageDeleter(req.files[0].filename, next, 'document not found', 400);
  }

  if (reviewData.user.id === req.user.id || req.user.role === 'admin') {
    if (!req.files) return next(new AppError('please upload image!', 400));

    if (
      reviewData.images.length >= 5 &&
      (+req.query.img >= 5 || isNaN(+req.query.img))
    ) {
      const Error = 'you can upload maximum 5 images';
      return ImageDeleter(req.files[0].filename, next, Error, 400);
    }

    if (!(Number(req.query.img) <= reviewData.images.length - 1)) {
      req.query.img = reviewData.images.length;
    } else {
      ImageDeleter(req.files[0].filename);
    }

    reviewData.images[req.query.img] = req.files[0].filename;

    await reviewData.save();

    res.status(200).json({ status: 'success', data: reviewData });
  } else {
    const Error = 'you do not have permission to update another users images';
    return ImageDeleter(req.files[0].filename, next, Error, 403);
  }
});

const deleteReview = catchAsync(async (req, res, next) => {
  const reviewData = await Review.findById(req.query.review);

  if (!reviewData) return next(new AppError('document not found', 400));

  if (reviewData.user.id === req.user.id || req.user.role === 'admin') {
    process.env.NODE_ENV === 'test' ||
      reviewData.images
        .map((image) => path.join(__dirname, '..', 'public', 'img', image))
        .forEach((img) =>
          fs.unlink(img, (err) =>
            err ? console.log(err) : console.log('image deleted')
          )
        );

    await Review.findByIdAndDelete(reviewData.id);

    res.status(200).json({ status: 'success', data: 'review deleted' });
  } else {
    return next(
      new AppError(
        'you do not have permission to update another users review',
        403
      )
    );
  }
});

const deleteReviewImage = catchAsync(async (req, res, next) => {
  const reviewData = await Review.findById(req.query.review);

  if (!reviewData) return next(new AppError('document is not found', 400));

  if (reviewData.user.id === req.user.id || req.user.role === 'admin') {
    const newImages = reviewData.images.filter((img) => img !== req.body.image);

    ImageDeleter(req.body.image);

    reviewData.images = newImages;
    await reviewData.save();

    res.status(200).json({
      status: 'success',
      message: 'image successfully deleted!',
    });
  } else {
    return next(
      new AppError(
        'you do not have permission to update another users review',
        403
      )
    );
  }
});

module.exports = {
  reviewPost,
  multerUploadProduct,
  getAllReviews,
  getOneReview,
  updateReview,
  updateReviewImages,
  deleteReview,
  deleteReviewImage,
};
