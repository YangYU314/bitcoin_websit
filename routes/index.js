var express = require('express');
var controller = require('../controllers/index');
var home = require('../controllers/home');
var router = express.Router();

/* GET home page. */
router.get('/', controller.showMainPage);
router.get('/login', controller.login);
router.post('/login',controller.validation_login);
router.get('/logout', controller.logout);
router.get('/register', controller.register);
router.post('/register', controller.validation_register);

//overall
router.get('/home', home.showMainPage);
router.post('/candle_stick', home.candle_stick);
router.get('/world_map', home.world_map);
router.post('/order_book', home.order_book);
router.get('/news', home.news);

//setting
router.get('/setting', home.showSetting);
router.post('/setting', home.validation_setting);

module.exports = router;
