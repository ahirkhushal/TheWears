const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userschema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
  },

  email: {
    type: String,
    required: [true, 'email address is required'],
    unique: [true, 'this email is already exist'],
    validate: [validator.isEmail, 'please enter valud email address'],
  },

  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },

  photo: {
    type: String,
    default: 'default.jpg',
  },

  isVarified: {
    type: Boolean,
    default: false,
  },

  EmailisVarified: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [8, 'password should contain minimum 8 characters'],
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, 'confirm password is required'],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'confirm password is not same as password',
    },
  },

  EmailVarificationToken: String,
  passwordResetToken: String,
  EmailvarificationExpires: Date,
  passwordResetTokenExpires: Date,
  SignUpTImeExpires: Date,
  createdAt: String,
});

userschema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userschema.methods.createEmailVarificationToken = function () {
  const varifyToken = crypto.randomBytes(32).toString('hex');

  this.EmailVarificationToken = crypto
    .createHash('sha256')
    .update(varifyToken)
    .digest('hex');

  this.EmailvarificationExpires = Date.now() + 10 * 60 * 1000;

  return varifyToken;
};

userschema.methods.createPasswordResetToken = function () {
  const varifyToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(varifyToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return varifyToken;
};

userschema.methods.signupTimer = function () {
  this.SignUpTImeExpires = Date.now() + 10 * 60 * 1000;
};

userschema.methods.passwordCorrectCheck = async function (enteredPass, dbPass) {
  return await bcrypt.compare(enteredPass, dbPass);
};

const User = mongoose.model('User', userschema);

module.exports = User;
