const Address = require('../model/userAddressModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const postAddress = catchAsync(async (req, res, next) => {
  const address = await Address.create({
    user: req.user.id,
    fullName: req.body.fullName,
    mobileNumber: req.body.mobileNumber,
    pinCode: req.body.pinCode,
    city: req.body.city,
    state: req.body.state,
    streetAddress: req.body.streetAddress,
    area: req.body.area,
    saveAs: req.body.saveAs,
  });

  res.status(201).json({ status: 'success', data: address });
});

const getUserAddress = catchAsync(async (req, res, next) => {
  const getAddress = await Address.find({ user: req.user.id });

  if (getAddress.length == 0)
    return next(
      new AppError(
        "Looks like you haven't provided any addresses. Add a new address to get started.",
        404
      )
    );

  res.status(200).json({ status: 'success', data: getAddress });
});

const getOneAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findById(req.query.id);

  if (!address) return next(new AppError('no address found!', 404));

  res.status(200).json({ status: 'success', data: address });
});

const UpdateAddress = catchAsync(async (req, res, next) => {
  const updatedAddress = await Address.findByIdAndUpdate(
    req.query.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedAddress) return next(new AppError('no data found', 404));

  res.status(200).json({ status: 'success', data: updatedAddress });
});

const deleteAddress = catchAsync(async (req, res, next) => {
  const deletedAddres = await Address.findByIdAndDelete(req.query.id);

  if (!deletedAddres) return next(new AppError('address not found', 404));

  res
    .status(200)
    .json({ status: 'success', message: 'address deleted successfully' });
});

module.exports = {
  postAddress,
  getUserAddress,
  getOneAddress,
  UpdateAddress,
  deleteAddress,
};
