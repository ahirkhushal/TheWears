const express = require('express');
const {
  AddtoCart,
  getCartItems,
  updateCartItems,
  removeCartItem,
} = require('../controller/addToCartController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.use(protect);

router.post('/addToCart', AddtoCart);
router.get('/getCartDetail', getCartItems);
router.patch('/updateCartItems', updateCartItems);
router.delete('/removeCartItem', removeCartItem);

module.exports = router;
