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

const loginErrorResponse = {
  message: 'email or password is wrong',
  status: 'fail',
  stack:
    'Error: email or password is wrong\n' +
    '    at /home/khushal/www/MY OWN PROJECTS/rose&robe/controller/authController.js:129:17\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
  isOperational: true,
};

module.exports = {
  verificationEmailResponse,
  registrationResponseData,
  loginErrorResponse,
};