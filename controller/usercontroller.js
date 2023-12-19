const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');

//GET_DATA---------------------------------------------------------------------------
exports.dataGate = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const userData = await User.find();

  res.status(200).json({ status: 'success', data: userData });
});
