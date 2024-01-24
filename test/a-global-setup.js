const User = require('../model/userModel');
const product = require('../model/productModel');
const { setUpDb } = require('./fixtures/db');
const AddToFavourite = require('../model/addToFavoriteModel');

before(async () => await setUpDb());

after(async () => {
  console.log(
    '-----------------------db disconnected------------------------------'
  );
  await User.deleteMany();
  await product.deleteMany();
  await AddToFavourite.deleteMany();
  process.exit(0);
});
