const jwt = require('jsonwebtoken');
const AppError = require('./AppError');
const { EmailVarificationHtml } = require('./EmailMessages');
const { EmailSender } = require(process.env.NODE_ENV === 'test'
  ? '../test/mocks/nodemailerMock'
  : '../utils/email');
const { promisify } = require('util');

//signup handler function-----------------------------------------------------------

exports.emailVerificationOTPSent = async (userdata, email, req, next) => {
  const { verifyToken, generateOtp } = userdata.createEmailVarificationToken();

  userdata.EmailisVarified = false;
  userdata.SignUpTimeExpires = undefined;
  await userdata.save({ validateBeforeSave: false });

  try {
    const html = EmailVarificationHtml(req, generateOtp);
    await EmailSender(email, 'verification of Email', html);

    return verifyToken;
  } catch (err) {
    console.log(err);
    userdata.EmailVarificationToken = undefined;
    userdata.EmailvarificationExpires = undefined;

    await userdata.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'there was an error to sending the Email! please try again later!',
        500
      )
    );
  }
};

exports.signUpTimeValidator = async (condition, userData, next) => {
  if (condition < Date.now()) {
    userData.EmailisVarified = false;
    userData.SignUpTimeExpires = undefined;
    await userData.save({ validateBeforeSave: false });
    return next(new AppError('please verify the email address ', 400));
  }
};

exports.tokenGenrate = (userId, isRefreshToken = false) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: isRefreshToken
      ? process.env.JWT_REFRESH_EXPIRES_IN
      : process.env.JWT_EXPIRES_IN,
  });

  return token;
};

exports.tokenVerify = async (token) => {
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decode) return next(new AppError('please authenticate', 401));

  return decode;
};
