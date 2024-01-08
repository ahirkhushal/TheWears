const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema({
  category: {
    type: String,
    require: [true, 'please select the category'],
  },
  name: {
    type: String,
    require: [true, 'please enter the product name'],
  },
  slug: String,
  description: {
    type: String,
    maxlength: [300, 'description length is cross the limits'],
    trim: true,
  },
  price: {
    type: Number,
    require: [true, 'please enter the price of product'],
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function (val) {
=        return val < this.price;
      },
      message: 'discount price ({VALUE}) shoud be below the regular price',
    },
  },
  size: {
    type: [String],
    require: [true, 'please selects the sizes'],
  },
  stock: {
    type: Number,
    require: [true, 'please provide stock availbility'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'ratings must be above 0'],
    max: [5, 'ratings must be below 5'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    require: [true, ' please upload atlist 1 image'],
    default: 'default.jpg',
  },
  hashtags: {
    type: [String],
    default: '#womenClothing',
  },
  createdAt: String,
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
