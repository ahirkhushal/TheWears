const EmailVarificationHtml = (req, generateOtp) => {
  return `
  <h1>Email Verification</h1>
  <p>Dear User, <br> Welcome to Thewears! To complete your registration, please use the OTP provided below:</p>
  <h2>Your OTP: ${generateOtp}</h2>
  <p>Please enter this OTP on the verification page to verify your email.</p>
  <p>If you didn't request this, you can safely ignore this email.</p>
  <p>Thank you for choosing Thewears!</p>`;
};

const resetPasswordEmail = (req, verifyToken) => {
  const resetPasswordLink = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword?token=${verifyToken}`;
  //   console.log(resetPasswordLink);
  return `
  <h1>Reset Password</h1>
  <p>Dear User, <br> We received a request to reset the password for your Rose&Robe account, please click the link below to reset the password:</p>
    <a class="verification-link" href=${resetPasswordLink}>Reset Password</a>`;
};

module.exports = { EmailVarificationHtml, resetPasswordEmail };
