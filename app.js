const express = require('express');
// const session = require('express-session');
const path = require('path');
const UserRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const reviewRouter = require('./routes/reviewRoute');
const addToFavouriteRouter = require('./routes/addToFavouriteRoute');
const addToCartRouter = require('./routes/addToCartRoute');
const addressRouter = require('./routes/userAddressRoute');
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
app.use('/api/v1/favourites', addToFavouriteRouter);
app.use('/api/v1/cart', addToCartRouter);
app.use('/api/v1/address', addressRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === 'production',
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
