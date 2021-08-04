const UserService = require('../services/user-service');
const { HttpCodes, responseMessages } = require('../helpers/constants');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isUnique = await UserService.isUserUnique(email);

    if (!isUnique) {
      return res
        .status(HttpCodes.CONFLICT)
        .json({ message: responseMessages.emailConflict });
    }

    const addedUser = await UserService.createUser({ name, email, password });

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

    const isUserValid = await UserService.isUserValid({ email, password });

    if (!isUserValid) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: responseMessages.invalidCreds });
    }

    const user = await UserService.loginUser(email);

    return res.json({
      message: responseMessages.loginSuccess,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser };
