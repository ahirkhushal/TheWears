const crypto = require('crypto');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { EmailSender } = require(process.env.NODE_ENV === 'test'
  ? '../test/mocks/nodemailerMock'
  : '../utils/email');

const { resetPasswordEmail } = require('../utils/EmailMessages');

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const userData = await User.findOne({
    email: req.body.email,
    isVarified: true,
  });

  if (!userData) return next(new AppError('this email does not exist', 400));

  const resetToken = userData.createPasswordResetToken();
  await userData.save({ validateBeforeSave: false });

  try {
    const html = resetPasswordEmail(req, resetToken);
    await EmailSender(req.body.email, 'reset Password', html);

    res.status(200).json({
      message: 'forgotPassword mail send to you email address',
      resetToken,
    });
  } catch (error) {
    userData.passwordResetToken = undefined;
    userData.passwordResetTokenExpires = undefined;
    await userData.save({ validateBeforeSave: false });
    console.log(error);
    return next(
      new AppError(
        'there was an error sending the email. try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.query;

  const resetToken = crypto.createHash('sha256').update(token).digest('hex');

  const userData = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!userData)
    return next(new AppError('user is not exist or token has expired', 400));

  userData.password = req.body.password;
  userData.confirmPassword = req.body.confirmPassword;
  userData.passwordResetToken = undefined;
  userData.passwordResetTokenExpires = undefined;
  await userData.save();

  res.status(200).json({ message: 'password successfully changed' });
});