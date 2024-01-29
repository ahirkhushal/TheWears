const EmailVarificationHtml = (req, verfiyToken) => {
  const VerificationLink = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/verificationEmail?token=${verfiyToken}`;
  //   console.log(VerificationLink);
  return `
  <h1>Email Verification</h1>
  <p>Dear User, <br> Welcome to our platform! To complete your registration, please click the link below to verify your email:</p>
    <a class="verification-link" href=${VerificationLink}>Verify Email</a>`;
};

const resetPasswordEmail = (req, verfiyToken) => {
  const resetPasswordLink = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword?token=${verfiyToken}`;
  //   console.log(resetPasswordLink);
  return `
  <h1>Reset Password</h1>
  <p>Dear User, <br> We received a request to reset the password for your Rose&Robe account, please click the link below to reset the password:</p>
    <a class="verification-link" href=${resetPasswordLink}>Reset Password</a>`;
};

module.exports = { EmailVarificationHtml, resetPasswordEmail };
