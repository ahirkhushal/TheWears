require('dotenv').config({ path: 'test.env' });
const mongoose = require('mongoose');
const Product = require('../../model/productModel');
const { setProductId } = require('../c-tokenManager');

const DB = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

exports.setUpDb = async () => {
  try {
    console.log(
      '---------------------------------------db connected---------------------------------------------'
    );
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const seedData = {
      category: 'underwear',
      name: 'test procust',
      description: 'this is test products data',
      price: 20000,
      discountPrice: 200,
      size: ['M', 'XL', 'L'],
      images: [
        'mock-image-1.jpg',
        'mock-image-2.jpg',
        'mock-image-3.jpg',
        'mock-image-4.jpg',
        'mock-image-5.jpg',
        'mock-image-6.jpg',
      ],
      stock: 1000,
      ratingsAverage: 4.8,
      ratingsQuantity: 10,
      hashtags: ['#women', '#skirt'],
    };

    const data = await Product.create(seedData);

    setProductId(data.id);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
