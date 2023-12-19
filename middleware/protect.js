const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');

//protect middleware---------------------------------------------------------------------------
exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(new AppError('unauthorized user, please login.', 401));

  console.log('ok');

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const userData = await User.findById(decoded.id);

  if (!userData)
    return next(new AppError('User not found or does not exist.', 400));

  req.user = userData;

  next();
});
