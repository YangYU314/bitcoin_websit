var express = require('express');
var controller = require('../controllers/index');
var home = require('../controllers/home');
var router = express.Router();

/* GET home page. */
router.get('/', controller.showMainPage);
router.get('/test', controller.showTest);
router.get('/login', controller.login);
router.post('/login',controller.validation_login);
router.get('/logout', controller.logout);
router.get('/register', controller.register);
router.post('/register', controller.validation_register);

//overall
router.get('/home', home.showMainPage);
router.post('/candle_stick', home.candle_stick);


module.exports = router;
