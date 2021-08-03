const bcrypt = require('bcryptjs');

class PasswordService {
  async hashPassword(password) {
    const salt = 8;
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }
}

module.exports = new PasswordService();
