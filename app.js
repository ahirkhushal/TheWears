const express = require('express');
const path = require('path');
const UserRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const reviewRouter = require('./routes/reviewRoute');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorContoller');
const morgan = require('morgan');
const app = express();

if (process.env.NODE_ENV === 'production') app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
