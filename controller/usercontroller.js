const User = require('../model/userModel');
const AppError = require('../utils/AppError');
const { tokenVerify } = require('../utils/authFunctions');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObject');
const multerUpload = require('../utils/multerUpload');

//MULTER CONFIGRATION

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('not an image! please upload image', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });
const upload = multerUpload('user');
exports.uploadUserPhoto = upload.single('photo');

//GET_DATA---------------------------------------------------------------------------
exports.dataGet = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const userData = await User.find();

  res.status(200).json({ status: 'success', data: userData });
});

//UPDATE USER PROFILE
exports.userProfileUpdate = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('you can not update password', 400));
  }

  const filteredObject = filterObj(req.body, 'username');

  if (req.file) filteredObject.photo = req.file.filename;

  const decode = await tokenVerify(req.token);

  const updateData = await User.findByIdAndUpdate(decode.id, filteredObject, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: updateData });
});

exports.userProfileDelete = catchAsync(async (req, res, next) => {
  const decode = await tokenVerify(req.token);

  await User.findByIdAndDelete(decode.id);

  res.status(200).json('user deleted successfully');
});
