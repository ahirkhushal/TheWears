const express = require('express');
const {
  addToFavouriteList,
  getFavouriteItems,
  removeFavouritesItems,
} = require('../controller/addToFavouriteController');
const { protect } = require('../middleware/protect');

const router = express.Router();

router.use(protect);

router.post('/addtofavourite', addToFavouriteList);
router.get('/getFavouriteItems', getFavouriteItems);
router.delete('/removeFavourites', removeFavouritesItems);

module.exports = router;
