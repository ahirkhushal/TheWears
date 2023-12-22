const verificationEmailResponse = {
  status: 'success',
  data: 'varification email send to your email',
  link: 'http://localhost:2405/api/v1/users/verificationEmail/verificationToken',
};

const registrationResponseData = {
  status: 'success',
  data: {
    _id: '6575938680c8ac40d7a09223',
    email: 'test@gmail.com',
    role: 'user',
    photo: 'default.jpg',
    isVarified: true,
    EmailisVarified: true,
    __v: 0,
    username: 'khushal',
    password: '$2b$12$CALHQOukDpKh9JqXiVPfMOk3xJFkzJPtGlYThh9kcWoOSw9/cH2PW',
    createdAt: 'December 10th 2023, 4:01:34 pm',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzU5Mzg2ODBjOGFjNDBkN2EwOTIyMyIsImlhdCI6MTcwMjIwNDI5NSwiZXhwIjoxNzA5OTgwMjk1fQ.KABAVOmKVdgmWZbo2VilN-ElWOHBA9aMLMfr9kZMHdA',
};

const emailvarificationFailedResponse = {
  message: 'user is not exist or token has expired',
  status: 'fail',
  stack:
    'Error: user is not exist or token has expired\n    at /home/khushal/www/MY OWN PROJECTS/ROSEANDROBE/controller/authController.js:51:17\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
  isOperational: true,
};

const loginErrorResponse = {
  message: 'email or password is wrong',
  status: 'fail',
  stack:
    'Error: email or password is wrong\n' +
    '    at /home/khushal/www/MY OWN PROJECTS/rose&robe/controller/authController.js:129:17\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
  isOperational: true,
};

const userSignupError = {
  message:
    'User validation failed: confirmPassword: confirm password is not same as password',
  status: 'error',
  stack:
    'ValidationError: User validation failed: confirmPassword: confirm password is not same as password\n' +
    '    at Document.invalidate (/home/khushal/www/MY OWN PROJECTS/ROSEANDROBE/node_modules/mongoose/lib/document.js:3173:32)\n' +
    '    at /home/khushal/www/MY OWN PROJECTS/ROSEANDROBE/node_modules/mongoose/lib/document.js:2966:17\n' +
    '    at /home/khushal/www/MY OWN PROJECTS/ROSEANDROBE/node_modules/mongoose/lib/schematype.js:1367:9\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)',
};

const forgotpasswordResponse = {
  message: 'forgotPassword mail send to you email address',
  resetToken:
    '3fd103106d9cab6e5fdc7581f10233c9cc4d880a1e28ab38f23484e01183500b',
};

const forgotPasswordFailresponse = {
  message: 'this email does not exist',
  status: 'fail',
  stack:
    'Error: this email does not exist\n' +
    '    at /home/khushal/www/myprojects/RoseAndRobe/controller/forgotPassword.js:16:30\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
  isOperational: true,
};

const resetPasswordValidationFailResponse = {
  message:
    'User validation failed: confirmPassword: confirm password is not same as password',
  status: 'error',
  stack:
    'ValidationError: User validation failed: confirmPassword: confirm password is not same as password\n    at Document.invalidate (/home/khushal/www/myprojects/RoseAndRobe/node_modules/mongoose/lib/document.js:3173:32)\n    at /home/khushal/www/myprojects/RoseAndRobe/node_modules/mongoose/lib/document.js:2966:17\n    at /home/khushal/www/myprojects/RoseAndRobe/node_modules/mongoose/lib/schematype.js:1367:9\n    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)',
};

const resetPasswordFailResponse = {
  message: 'user is not exist or token has expired',
  status: 'fail',
  stack:
    'Error: user is not exist or token has expired\n    at /home/khushal/www/myprojects/RoseAndRobe/controller/forgotPassword.js:55:17\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
  isOperational: true,
};

module.exports = {
  verificationEmailResponse,
  registrationResponseData,
  emailvarificationFailedResponse,
  loginErrorResponse,
  userSignupError,
  forgotpasswordResponse,
  forgotPasswordFailresponse,
  resetPasswordFailResponse,
  resetPasswordValidationFailResponse,
};
