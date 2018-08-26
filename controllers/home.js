const gdax = require('gdax');
const publicClient = new gdax.PublicClient();

module.exports.showMainPage = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('home', {user: sess.username});
    }else{
        res.render('home', {user: "shenghui wu"});
        //res.render('login');
    }
}

var temp = new Array();
publicClient.getProductHistoricRates('BTC-USD', function(err, res, data){
    for (var i = 0; i < 10; i++){
        temp[i] = data[i];
    }
})

module.exports.showData = function(req, res){
    res.json({result: temp});
}
