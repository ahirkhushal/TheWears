const express = require('express');
const {
  signupVarificationEmailSend,
  signupEmailVarify,
  signup,
  login,
  signUpValidation,
  admin,
} = require('../controller/authController');
const {
  dataGet,
  userProfile,
  userProfileUpdate,
  uploadUserPhoto,
  userProfileDelete,
} = require('../controller/usercontroller');
const { protect } = require('../middleware/protect');
const {
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controller/forgotPassword');

const router = express.Router();

router.post('/signup', signupVarificationEmailSend);
router.post('/verificationEmail', signupEmailVarify);
router.post('/signUpvalidation/:id', signUpValidation);
router.post('/signupdetails/:id', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword', resetPassword);

router.use(protect);

router.get('/getData/:id', admin, dataGet);
router.get('/userProfile', userProfile);
router.patch('/updatePassword', updatePassword);
router.patch('/userProfileUpdate', uploadUserPhoto, userProfileUpdate);
router.delete('/userProfileDelete', userProfileDelete);

router.get('/', (req, res) => {
  res.status(200).json({ statis: 'success' });
});

module.exports = router;
