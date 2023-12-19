require('dotenv').config({ path: 'test.env' });
const mongoose = require('mongoose');

const DB = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
);

exports.setUpDb = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
