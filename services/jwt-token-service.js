require('dotenv').config();
const jwt = require('jsonwebtoken');

class TokenService {
  constructor() {
    this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: '4h' });
  }
}

module.exports = new TokenService();
