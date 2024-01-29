const express = require('express');
const {
  productPost,
  reviewAllProduct,
  reviewOneProduct,
  updateProduct,
  deleteProduct,
  deleteImage,
} = require('../controller/productController');
const { multerUploadProduct } = require('../controller/productController');

const { protect } = require('../middleware/protect');
const { admin } = require('../controller/authController');

const router = express.Router();

router.post('/productPost', protect, admin, multerUploadProduct, productPost);
router.get('/productReview', reviewAllProduct);
router.get('/OneProduct', protect, reviewOneProduct);

router.use(protect, admin);

router.patch('/productUpdate', multerUploadProduct, updateProduct);
router.delete('/productDelete', deleteProduct);
router.delete('/deleteImage', deleteImage);

module.exports = router;
