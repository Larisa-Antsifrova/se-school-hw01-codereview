require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

class TokenService {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: '4h' });
  }
}

module.exports = new TokenService(JWT_SECRET_KEY);
