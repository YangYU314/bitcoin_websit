var mongoose = require('./database');
var Schema = mongoose.Schema;
const gdax = require('gdax');
const publicClient = new gdax.PublicClient();

var candleStickSchema = new Schema({
        product_id: String,
        time: Number,
        open: Number,
        close: Number,
        low: Number,
        high: Number,
        volume: Number
    },
    {
        collection:'candle_stick'
});

//update and get data from collection candle_stick
candleStickSchema.statics.candle_stick_data = function (product_id, callback){
    //update data
    Candle_stick.findNewest(product_id, function(result){
        if(result == null){
            publicClient.getProductHistoricRates(product_id, {granularity: 3600}, function (err, res, data){
                for (var i in data){
                    if (i >= 6){
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
        }else{
            var latestTime = result.time;
            publicClient.getProductHistoricRates(product_id, function (err, res, data){
                for (var i in data){
                    if (data[i][0] <= latestTime){
                        break;
                    }else{
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
        }
    });

    //get data
    Candle_stick.findData(product_id, function(result){
        callback(result);
    });
}

//find the newest row and get its time
candleStickSchema.statics.findNewest = function (product_id, callback) {
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

//find all the data and get its time, open, close, low, high
candleStickSchema.statics.findData = function (product_id, callback) {
    var data = [
        {$match: {product_id: product_id}},
        {$sort: {'time': 1}}
    ];
    this.aggregate(data, function(err, data){
        if(err){
            console.log("Query: findData Error!");
        }else{
            if(data.length > 0){
                callback(data);
            }else{
                callback(null);
            }
        }
    });
};

var Candle_stick = mongoose.model('Candle_stick', candleStickSchema, 'candle_stick');
module.exports = Candle_stick;