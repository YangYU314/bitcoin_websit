var mongoose = require('./database');
var Schema = mongoose.Schema;
const request = require("request");

var comparePriceSchema = new Schema({
        exchange: String,
        quote: String,
        price: Number,
        timestamp: String
    },
    {
        collection:'compare_price'
    });

comparePriceSchema.statics.compare_price_data = function(callback){
    const url = "https://api.nomics.com/v1/markets/prices?key=2018-09-demo-dont-deploy-b69315e440beb145&currency=BTC";
    getData(url, function (err, result) {
        if (err){
            console.log("error");
        }else{
            var list;
            for (const key in result) {
                if (key == 0 || key == 4 || key == 7 || key == 8){
                    list = result[key];

                    //save in database
                    var newComparePrice = new Compare_price({
                        exchange: list.exchange,
                        quote: list.quote,
                        price: list.price,
                        timestamp: list.timestamp,
                    });

                    newComparePrice.save();

                    /*//save jason into the array
                    var mapArray = {};
                    mapArray["exchange"] = list.exchange;
                    mapArray["quote"] = list.quote;
                    mapArray["price"] = list.price;
                    mapArray["timestamp"] = list.timestamp;
                    temp.push(mapArray);*/
                }
            }

            Compare_price.findAllData(function(result){
                callback(result);
            });
        }
    });
}

//find all the data from collection compare price
comparePriceSchema.statics.findAllData = function (callback) {
    var data = [
        {$match: {}},
        {$sort: {'timestamp': 1}}
    ];
    this.aggregate(data, function(err, data){
        if(err){
            console.log("Query: findAllData Error!");
        }else{
            if(data.length > 0){
                callback(data);
            }else{
                callback(null);
            }
        }
    });
};

//function to get data from URL
function getData(url, callback){
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(error, body);
        }
    });
}

var Compare_price = mongoose.model('Compare_Price', comparePriceSchema, 'compare_price');
module.exports = Compare_price;