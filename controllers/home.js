var candleStickModel = require('../models/candle_stick');

module.exports.showMainPage = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('home', {user: sess.username});
    }else{
        res.render('home', {user: "Shenghui wu"});
        //res.render('login');
    }
}

module.exports.candle_stick = function(req, res){
    var product_id = req.body.product_id;
    candleStickModel.candle_stick_data(product_id, function(result){
        res.json(result);
    });
    //bitcoin.candle_stick()
    /*var temp = new Array();
    publicClient.getProductHistoricRates('BTC-USD', function(err, res, data){
        for (var i = 0; i < 10; i++){
            temp[i] = data[i];
        }
    });
    res.json({result: temp});*/
}
