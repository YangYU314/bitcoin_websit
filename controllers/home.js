var candleStickModel = require('../models/candle_stick');
var worldMapModel = require('../models/worldMap');

module.exports.showMainPage = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('home', {user: sess.username, preference: sess.preference});
    }else{
        res.render('home', {user: "Shenghui wu"});
        //res.render('login');
    }
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