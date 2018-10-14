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
router.post('/person', controller.person);
router.post('/setting', controller.validation_setting);

//overall
router.get('/home', home.showMainPage);
router.post('/candle_stick', home.candle_stick);
router.get('/world_map', home.world_map);
router.post('/order_book', home.order_book);
router.get('/news', home.news);
router.get('/setting', home.showSetting);
router.get('/compare_price', home.showComparePrice);

module.exports = router;
