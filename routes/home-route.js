const { Router } = require('express');
const controllers = require('../controllers/home-controllers');

const homeRouter = Router();

homeRouter.get('/', controllers.showHomeMessage);

module.exports = homeRouter;
