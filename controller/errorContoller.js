const AppError = require('../utils/AppError');

const handleCastErrorDB = (err) => {
  const message = `invalid ${err.path} is ${err.value}`;

  return new AppError(message, 400);
};
const handleError = (err) =>
  new AppError(`${err.message} please login again`, 401);

const handleDuplicateField = (err) => {
  const message = `duplicate field value '${err.keyValue.name}'. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);

  const message = `invalid input data ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const sendErrDev = (err, res) => {
  res.status(err.statuscode).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
    isOperational: err.isOperational,
  });
};

const sendErrProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);

    res.status(err.statuscode).json({
      status: err.status,
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || 'error';

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, message: err.message };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateField(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDb(error);
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    )
      error = handleError(error);

    sendErrProd(error, res);
  }
};
