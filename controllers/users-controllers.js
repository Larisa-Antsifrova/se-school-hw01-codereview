require('dotenv').config();
const User = require('../repositories/users-repository');
const PasswordService = require('../services/password-service');
const TokenService = require('../services/jwt-token-service');
const isUniqueUser = require('../helpers/is-unique');
const { HttpCodes, responseMessages } = require('../helpers/constants');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUnique = await isUniqueUser(email);

    if (!isUnique) {
      return res
        .status(HttpCodes.CONFLICT)
        .json({ message: responseMessages.emailConflict });
    }

    const hashedPassword = await PasswordService.hashPassword(password);

    const addedUser = await User.addNewUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(HttpCodes.CREATED)
      .json({ message: responseMessages.registrationSuccess, user: addedUser });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);

    if (!user) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: responseMessages.invalidCreds });
    }

    const isPasswordCorrect = await PasswordService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: responseMessages.invalidCreds });
    }

    const { id, name, email: userEmail } = user;
    const token = TokenService.generateToken({ id, name });

    return res.json({
      message: responseMessages.loginSuccess,
      user: { name, token, email: userEmail },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
