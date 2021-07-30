const { Router } = require('express');
const controllers = require('../controllers/btc-controllers');
const isAuthenticated = require('../middleware/authentication-check');

const btcRouter = Router();

btcRouter.get('/btcRate', isAuthenticated, controllers.getBtcRate);

module.exports = btcRouter;
