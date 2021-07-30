const { Router } = require('express');
const {
  validateRegisterUser,
  validateLoginUser,
} = require('../middleware/validation');
const controllers = require('../controllers/users-controllers');

const usersRouter = Router();

usersRouter.post('/user/create', validateRegisterUser, controllers.createUser);

usersRouter.post('/user/login', validateLoginUser, controllers.loginUser);

module.exports = usersRouter;
