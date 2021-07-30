require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HttpCodes } = require('../helpers/constants');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('JWT token is not provided.');
    }

    jwt.verify(token, JWT_SECRET_KEY);

    next();
  } catch (error) {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
