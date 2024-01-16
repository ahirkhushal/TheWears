const express = require('express');

const {
  reviewPost,
  multerUploadProduct,
  getAllReviews,
  getOneReview,
  updateReview,
  updateReviewImages,
  deleteReview,
  deleteReviewImage,
} = require('../controller/reviewController');

const { protect } = require('../middleware/protect');

const router = express.Router();

router.use(protect);

router.post('/reviewPost', multerUploadProduct, reviewPost);
router.get('/allReviews', getAllReviews);
router.get('/oneReview', getOneReview);
router.patch('/updateReview', updateReview);
router.patch('/updateReviewImages', multerUploadProduct, updateReviewImages);
router.delete('/deleteReview', deleteReview);
router.delete('/deleteReviewImage', deleteReviewImage);

// router.use(protect, admin);

// router.patch('/productUpdate', multerUploadProduct, updateProduct);
// router.delete('/productDelete', deleteProduct);
// router.delete('/deleteImage', deleteImage);

module.exports = router;

// restrictTo('user', 'admin'),
