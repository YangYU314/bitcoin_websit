var mongoose = require('./database');
var Schema = mongoose.Schema;
const gdax = require('gdax');
const publicClient = new gdax.PublicClient();

var orderBookSchema = new Schema({
        product_id: String,
        time: Number,
        open: Number,
        close: Number,
        low: Number,
        high: Number,
        volume: Number
    },
    {
        collection:'order_book'
    });

//update and get data from collection order book
orderBookSchema.statics.order_book_data = function (product_id, callback){
    //update data
    Candle_stick.update_data(product_id, function(results){
        if (results == 1){
            //get data
            Candle_stick.findAllData(product_id, function(result){
                callback(result);
            });
        }
    });
}

//update data
orderBookSchema.statics.update_data = function (product_id, callback){
    Candle_stick.findNewest(product_id, function (result) {
        if (result == null) {
            publicClient.getProductHistoricRates(product_id, {granularity: 3600}, function (err, res, data) {
                for (var i in data) {
                    if (i >= 6) {
                        var newData = new Candle_stick({
                            product_id: product_id,
                            time: data[i][0],
                            open: data[i][3],
                            close: data[i][4],
                            low: data[i][1],
                            high: data[i][2],
                            volume: data[i][5]
                        });
                        newData.save();
                    }
                }
            });

            publicClient.getProductHistoricRates(product_id, function (err, res, data) {
                for (var i in data) {
                    if (data[i][0] <= latestTime) {
                        break;
                    } else {
                        var newData = new Candle_stick({
                            product_id: product_id,
                            time: data[i][0],
                            open: data[i][3],
                            close: data[i][4],
                            low: data[i][1],
                            high: data[i][2],
                            volume: data[i][5]
                        });
                        newData.save();
                    }
                }
                callback(1);
            });
        } else {
            var latestTime = result.time;
            publicClient.getProductHistoricRates(product_id, function (err, res, data) {
                for (var i in data) {
                    if (data[i][0] <= latestTime) {
                        break;
                    } else {
                        var newData = new Candle_stick({
                            product_id: product_id,
                            time: data[i][0],
                            open: data[i][3],
                            close: data[i][4],
                            low: data[i][1],
                            high: data[i][2],
                            volume: data[i][5]
                        });
                        newData.save();
                    }
                }
                callback(1);
            });
        }
    });
}

//get last price from collection candle_stick
orderBookSchema.statics.last_price_data = function (product_id, callback){
    //update data
    Candle_stick.update_data(product_id, function(results){
        if (results == 1){
            //get data
            Candle_stick.findData(product_id, function(result){
                callback(result);
            });
        }
    });
}

//find the newest row and get its time
orderBookSchema.statics.findNewest = function (product_id, callback) {
    var newest = [
        {$match: {product_id: product_id}},
        {$sort: {'time': -1}},
        {'$limit': 1}
    ];
    this.aggregate(newest, function(err, data){
        if(err){
            console.log("Query: findNewest Error!");
        }else{
            if(data.length > 0){
                callback(data[0]);
            }else{
                callback(null);
            }
        }
    });
};

var Order_book = mongoose.model('Order_Book', orderBookSchema, 'order_book');
module.exports = Order_book;