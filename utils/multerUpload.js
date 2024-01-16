const multer = require('multer');
const AppError = require('../utils/AppError');

const multerUpload = (arg) => {
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
      let name = `${arg}-${
        arg === 'user' || arg === 'review'
          ? req.user.id
          : file.originalname.split('.')[0]
      }-${Date.now()}`;

      const ext = file.mimetype.split('/')[1];
      const filename = [name, ext].join('.');

      cb(null, filename);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('not an image! please upload image', 400), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  return upload;
};

module.exports = multerUpload;
