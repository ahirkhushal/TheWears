const express = require('express');
const {
  productPost,
  reviewProduct,
  updateProduct,
  multerUploadProduct,
  deleteProduct,
  deleteImage,
} = require('../controller/productController');
const { protect } = require('../middleware/protect');
const { admin } = require('../controller/authController');

const router = express.Router();

router.post('/productPost', protect, admin, multerUploadProduct, productPost);
router.get('/productReview', reviewProduct);

router.use(protect, admin);

router.patch('/productUpdate', multerUploadProduct, updateProduct);
router.delete('/productDelete', deleteProduct);
router.delete('/deleteImage', deleteImage);

module.exports = router;
