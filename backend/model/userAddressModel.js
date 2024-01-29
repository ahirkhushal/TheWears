const mongoose = require('mongoose');
const validator = require('validator');
const AppError = require('../utils/AppError');

const UserAddressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, ['en-US'], { strictMode: false });
      },
      message: 'Invalid mobile number',
    },
  },
  pinCode: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return validator.isPostalCode(val.toString(), 'IN');
      },
      message: 'Please enter a valid PIN code!',
    },
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
  },
  saveAs: {
    type: String,
    enum: ['HOME', 'OFFICE', 'OTHER'],
    required: true,
    uppercase: true,
    default: 'OTHER',
  },
});

// when you render the address entering form then check before get form likeuser habve max 3 address ir not if not give him access of enter address and render address form
// ex: when you render form for add address apply route like this'
// router.get(/address , addressmax3checkmiddleware , renderAddressform)

UserAddressSchema.pre('save', async function (next) {
  const userAddressCount = await mongoose
    .model('Address')
    .countDocuments({ user: this.user });
  console.log(
    userAddressCount,
    '<<<<<<<<<<<<<<<<<<<<---------------------------userAddressCount'
  );

  if (userAddressCount + 1 > 3) {
    return next(
      new AppError('Maximum number of addresses reached for this user', 400)
    );
  }

  next();
});

const Address = mongoose.model('Address', UserAddressSchema);

module.exports = Address;
