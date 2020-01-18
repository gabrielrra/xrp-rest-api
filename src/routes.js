const {Router} = require('express');
const AccountManager = require('./controllers/AccountManager');
const routes = Router();

routes.get('/info', AccountManager.getAccountInfo);
routes.post('/pay', AccountManager.sendPayment);

module.exports = routes;