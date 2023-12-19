module.exports = (err, req, res, next) => {
  // console.log(err);
  err.statuscode = err.statuscode || 500;
  err.status = err.status || 'error';

  res.status(err.statuscode).json({
    message: err.message,
    status: err.status,
    stack: err.stack,
    isOperational: err.isOperational,
  });
};
