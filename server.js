process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log(err.stack.split('at')[1]);
  console.log('UNCAUGHT EXECPTION , sutting down......');
  process.exit(1);
});

require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('db connected'));

const port = process.env.PORT || 2405;
const server = app.listen(port, () => {
  console.log(`application is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err);
  console.log('UNHANDLED REJECTION , sutting down......');
  server.close(() => {
    process.exit(1);
  });
});
