const User = require('../model/userModel');

class AuthRepository {
  static async findUserWithEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = AuthRepository;
