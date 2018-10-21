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
            for (const key in result) {
                Compare_price.find_timestamp(result[key].timestamp, function(res){
                    if (res != null) {
                        //save in database
                        var newComparePrice = new Compare_price({
                            exchange: result[key].exchange,
                            quote: result[key].quote,
                            price: result[key].price,
                            timestamp: result[key].timestamp
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
                });
            }

            Compare_price.findAllData(function(result){
                callback(result);
            });
        }
    });
}

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

//find if the timestamp exists
comparePriceSchema.statics.find_timestamp = function(timestamp, callback){
    var data = [
        {$match: {timestamp: timestamp}},
        {$limit: 1}
    ];

    this.aggregate(data, function(err, data){
        if(err){
            console.log("Query: find_timestamp Error!");
        }else{
            if(data.length > 0){
                callback(null);
            }else{
                callback(timestamp);
            }
        }
    });
}

//find all the data from collection compare price
comparePriceSchema.statics.findAllData = function (callback) {
    var data = [
        {$match: {quote: "USD"}},
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

var Compare_price = mongoose.model('Compare_Price', comparePriceSchema, 'compare_price');
module.exports = Compare_price;