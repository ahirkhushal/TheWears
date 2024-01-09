const crypto = require('crypto');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const moment = require('moment');
const AuthRepository = require('../repository/authRepository');
const {
  emailVerificationLinkSent,
  signUpTimeValidator,
  tokenGenrate,
} = require('../utils/authFunctions');

//SIGN-UP-----------------------------------------------------------------------------
//send email to email address------------------------------------------------------
exports.signupVarificationEmailSend = catchAsync(async (req, res, next) => {
  const existingEmail = await AuthRepository.findUserWithEmail(
    req?.body?.email
  );

  if (existingEmail?.isVarified)
    return next(new AppError('user already signed up! Please Login', 400));

  const userdata = new User({
    email: req.body.email,
  });

  await emailVerificationLinkSent(
    existingEmail || userdata,
    req.body.email,
    req,
    res,
    next
  );
});

// signup varification in email -------------------------------------------
exports.signupEmailVarify = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const verificationCode = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const userData = await User.findOne({
    EmailVarificationToken: verificationCode,
    EmailvarificationExpires: { $gt: Date.now() },
  });

  if (!userData)
    return next(new AppError('user is not exist or token has expired', 400));

  userData.EmailVarificationToken = undefined;
  userData.EmailvarificationExpires = undefined;

  userData.signupTimer();
  userData.EmailisVarified = true;

  await userData.save({ validateBeforeSave: false });

  res.status(200).json({ data: 'verification complete', userData });
});

//validation of email message page(NO TEST)---------------------------------------------
exports.signUpValidation = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.params.id);

  if (!userData)
    return next(AppError('invalid request! please try again', 400));

  if (userData.EmailvarificationExpires < Date.now())
    return next(new AppError('please verify the email', 400));

  signUpTimeValidator(
    userData.EmailisVarified && userData.SignUpTImeExpires,
    userData,
    next
  );

  if (userData.EmailisVarified && userData.isVarified)
    return next(new AppError('user already signed up! Please Login', 400));

  res.status(200).json({ status: 'success', data: userData });
});

// final signup after email varified -----------------------------------------
exports.signup = catchAsync(async (req, res, next) => {
  const userData = await User.findById(req.params.id);

  if (!userData) return next(new AppError('invalid ID', 400));

  signUpTimeValidator(userData.SignUpTImeExpires, userData, next);

  if (userData.isVarified)
    return next(new AppError('user already signed up! Please Login', 400));

  userData.username = req.body.username;
  userData.password = req.body.password;
  userData.role = req.body.role || 'user';
  userData.confirmPassword = req.body.confirmPassword;
  userData.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  userData.SignUpTImeExpires = undefined;
  userData.isVarified = true;
  await userData.save();

  tokenGenrate(res, 201, userData);
});

//LOG-IN-----------------------------------------------------------------------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('please enter required details', 400));

  const userData = await User.findOne({ email }).select('+password');

  if (
    !userData ||
    !(await userData.passwordCorrectCheck(password, userData.password))
  )
    return next(new AppError('email or password is wrong', 400));

  tokenGenrate(res, 200, userData);
});

//ADMIN---------------------------------------------------------------------------------
exports.admin = catchAsync(async (req, res, next) => {
  if (req.user.role === 'admin') next();
  else
    return next(
      new AppError('you have not authority to access this route', 403)
    );
});
