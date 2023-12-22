const jwt = require('jsonwebtoken');
const AppError = require('./AppError');
const { EmailVarificationHtml } = require('./EmailMessages');
const { EmailSender } = require(process.env.NODE_ENV === 'test'
  ? '../test/mocks/nodemailerMock'
  : '../utils/email');

//signup handler function-----------------------------------------------------------

exports.emailVerificationLinkSent = async (userdata, email, req, res, next) => {
  const verfiyToken = userdata.createEmailVarificationToken();

  userdata.EmailisVarified = false;
  userdata.SignUpTImeExpires = undefined;
  await userdata.save({ validateBeforeSave: false });

  try {
    const html = EmailVarificationHtml(req, verfiyToken);
    await EmailSender(email, 'verification of Email', html);

    res.status(200).json({
      status: 'success',
      data: 'varification email send to your email',
      link: `${req.protocol}://${req.get(
        'host'
      )}/api/v1/users/verificationEmail?token=${verfiyToken}`,
    });
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
    userData.SignUpTImeExpires = undefined;
    await userData.save({ validateBeforeSave: false });
    return next(new AppError('please verify the email address ', 400));
  }
};

exports.tokenGenrate = (res, userData) => {
  const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({ status: 'success', data: userData, token });
};
