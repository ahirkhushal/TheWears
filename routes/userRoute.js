const express = require('express');
const {
  signupVarificationEmailSend,
  signupEmailVarify,
  signup,
  login,
  signUpValidation,
} = require('../controller/authController');
const { dataGate } = require('../controller/usercontroller');
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
router.patch('/updatePassword', protect, updatePassword);
router.get('/getData/:id', protect, dataGate);

router.get('/', (req, res) => {
  res.status(200).json({ statis: 'success' });
});

module.exports = router;
