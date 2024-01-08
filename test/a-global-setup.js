const User = require('../model/userModel');
const product = require('../model/productModel');
const { setUpDb } = require('./fixtures/db');

before(async () => await setUpDb());

after(async () => {
  await User.deleteMany();
  await product.deleteMany();
  process.exit(0);
});
