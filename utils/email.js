const nodemailer = require('nodemailer');

const config = {
  service: 'gmail',
  auth: { user: process.env.OWNER_EMAIL, pass: process.env.EMAIL_PASS },
};

exports.EmailSender = async (to, subject, varificationLink) => {
  const verificationHtml = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #007bff;
          }
          p {
            margin-bottom: 20px;
          }
          .verification-link {
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Email Verification</h1>
          <p>Dear User, <br> Welcome to our platform! To complete your registration, please click the link below to verify your email:</p>
          <a class="verification-link" href=${varificationLink}>Verify Email</a>
        </div>
      </body>
    </html>
  `;

  const mailSet = nodemailer.createTransport(config);

  await mailSet.sendMail({
    from: process.env.OWNER_EMAIL,
    to,
    subject,
    html: verificationHtml,
  });
};
