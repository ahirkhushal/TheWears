const crypto = require('crypto');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const moment = require('moment');
const AuthRepository = require('../repository/authRepository');
const {
  signUpTimeValidator,
  tokenGenrate,
  emailVerificationOTPSent,
} = require('../utils/authFunctions');

//SIGN-UP-----------------------------------------------------------------------------
//send email to email address------------------------------------------------------
// exports.signupVarificationEmailSend = catchAsync(async (req, res, next) => {
//   const existingEmail = await AuthRepository.findUserWithEmail(
//     req?.body?.email
//   );

//   if (existingEmail?.isVarified)
//     return next(new AppError('user already signed up! Please Login', 400));

//   const userdata = new User({
//     email: req.body.email,
//   });

//   await emailVerificationLinkSent(
//     existingEmail || userdata,
//     req.body.email,
//     req,
//     res,
//     next
//   );
// });

// // signup varification in email -------------------------------------------
// exports.signupEmailVarify = catchAsync(async (req, res, next) => {
//   const { token } = req.query;

//   const verificationCode = crypto
//     .createHash('sha256')
//     .update(token)
//     .digest('hex');

//   const userData = await User.findOne({
//     EmailVarificationToken: verificationCode,
//     EmailvarificationExpires: { $gt: Date.now() },
//   });

//   if (!userData)
//     return next(new AppError('user is not exist or token has expired', 400));

//   userData.EmailVarificationToken = undefined;
//   userData.EmailvarificationExpires = undefined;

//   userData.signupTimer();
//   userData.EmailisVarified = true;

//   await userData.save({ validateBeforeSave: false });

//   res.status(200).json({ data: 'verification complete', userData });
// });

// //validation of email message page(NO TEST)---------------------------------------------
// exports.signUpValidation = catchAsync(async (req, res, next) => {
//   const userData = await User.findById(req.params.id);

//   if (!userData)
//     return next(AppError('invalid request! please try again', 400));

//   if (userData.EmailvarificationExpires < Date.now())
//     return next(new AppError('please verify the email', 400));

//   signUpTimeValidator(
//     userData.EmailisVarified && userData.SignUpTImeExpires,
//     userData,
//     next
//   );

//   if (userData.EmailisVarified && userData.isVarified)
//     return next(new AppError('user already signed up! Please Login', 400));

//   res.status(200).json({ status: 'success', data: userData });
// });

// final signup after email varified -----------------------------------------
exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, confirmPassword, userName, role = false } = req.body;

  const existingEmail = await AuthRepository.findUserWithEmail(email);

  if (existingEmail && existingEmail.EmailisVarified)
    return next(new AppError('Email already in use!', 400));

  if (!email || !password)
    return next(new AppError('please enter required details!', 400));

  const userData = existingEmail
    ? await User.findByIdAndUpdate(
        existingEmail.id,
        { password, userName },
        { new: true }
      )
    : await User.create({
        username: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role === true ? 'admin' : 'user',
      });

  const verifyToken = await emailVerificationOTPSent(
    userData,
    email,
    req,
    next
  );

  res.status(200).json({
    status: 'success',
    message: 'OTP sent to your Email',
    data: userData,
    verifyToken,
  });
});

// // signup varification through OTP email -------------------------------------------
exports.signupVarification = catchAsync(async (req, res, next) => {
  const { verifyToken, OTP } = req.body;

  const verificationCode = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex');

  const userData = await User.findOne({
    EmailVarificationToken: verificationCode,
    EmailvarificationExpires: { $gt: Date.now() },
  });

  if (!userData)
    return next(new AppError('user is not exist or token has expired', 400));

  if (userData.generateOtp !== OTP)
    return next(new AppError('Invalid OTP! try again', 400));

  // // Generate tokens
  const accessToken = tokenGenrate(userData.id);
  const refreshToken = tokenGenrate(userData.id, true);
  userData.EmailVarificationToken = undefined;
  userData.EmailvarificationExpires = undefined;
  userData.generateOtp = undefined;
  userData.EmailisVarified = true;
  userData.refreshToken = refreshToken;

  await userData.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ data: 'verification complete', userData, accessToken });
});

//LOG-IN-----------------------------------------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('please enter required details!', 400));

  const userData = await User.findOne({ email, EmailisVarified: true }).select(
    '+password'
  );

  if (!userData)
    return next(new AppError('Account is not created with this Email!', 400));

  const isPasswordCorrect = await userData.passwordCorrectCheck(
    password,
    userData.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError('Email or password is wrong', 400));
  }

  // Generate tokens
  const accessToken = tokenGenrate(userData.id);
  const refreshToken = tokenGenrate(userData.id, true);

  userData.refreshToken = refreshToken;
  await userData.save({ validateBeforeSave: false });

  return res.status(200).json({
    status: 'success',
    data: userData,
    accessToken,
  });
});

//REFRESH TOEKN
exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  const userData = await User.findOne({ refreshToken });

  if (!userData) {
    return next(new AppError('Invalid refresh token', 400));
  }

  // Generate a new access token
  const accessToken = tokenGenrate(userData);

  res.status(200).json({
    status: 'success',
    accessToken,
  });
});

//ADMIN---------------------------------------------------------------------------------
exports.admin = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') next();
  else
    return next(
      new AppError('you have not authority to access this route', 403)
    );
});
