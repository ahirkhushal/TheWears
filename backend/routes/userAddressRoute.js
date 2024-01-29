const express = require('express');
const { protect } = require('../middleware/protect');
const {
  postAddress,
  getUserAddress,
  getOneAddress,
  UpdateAddress,
  deleteAddress,
} = require('../controller/addressController');

const router = express.Router();

router.use(protect);

router.post('/AddressPost', postAddress);
router.get('/getUserAddress', getUserAddress);
router.get('/getOneAddress', getOneAddress);
router.patch('/updateAddress', UpdateAddress);
router.delete('/deleteAddress', deleteAddress);

module.exports = router;
