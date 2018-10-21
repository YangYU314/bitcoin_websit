var candleStickModel = require('../models/candle_stick');
var worldMapModel = require('../models/worldMap');
var orderBookModel = require('../models/order_book');
var newsModel = require('../models/news');
var ComparePriceModel = require('../models/compare_price');

module.exports.showMainPage = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('home', {user: sess.username, preference: sess.preference, newuser: sess.newuser});
    }else{
        //res.render('home', {user: "Shenghui Wu", preference: "BTC-USD"});
        res.render('index');
    }
}

//show setting
module.exports.showSetting = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('setting', {user: sess.username});
    }else{
        //res.render('setting', {user: "Shenghui Wu"});
        res.render('index');
    }
}

//compare price
module.exports.showComparePrice = function(req, res){
    ComparePriceModel.compare_price_data(function(result){
        res.json(result);
    })
}

//candle stick
module.exports.candle_stick = function(req, res){
    var product_id = req.body.product_id;
    candleStickModel.candle_stick_data(product_id, function(result){
        res.json(result);
    });
}

//world map
module.exports.world_map = function(req, res){
    worldMapModel.world_map_data(function(result){
        res.json(result);
    });
}

//order book
module.exports.order_book = function(req, res){
    var product_id = req.body.product_id;
    orderBookModel.order_book_data(product_id, function(result){
        res.json(result);
    });
}

//news
module.exports.news = function(req, res){
    newsModel.news_data(function(result){
        res.json(result);
    });
}