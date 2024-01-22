const express = require('express');
const {
  addToFavouriteList,
  getFavouriteItems,
  removeFavouritesItems,
} = require('../controller/addToFavouriteController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.post('/addtofavourite', protect, addToFavouriteList);
router.get('/getFavouriteItems', protect, getFavouriteItems);
router.delete('/removeFavourites', protect, removeFavouritesItems);

module.exports = router;
