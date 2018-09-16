var mongoose = require('./database');
var Schema = mongoose.Schema;
const gdax = require('gdax');
const publicClient = new gdax.PublicClient();

var orderBookSchema = new Schema({
        product_id: String,
        sequence: Number,
        bids: Array,
        asks: Array
    },
    {
        collection:'order_book'
    });

//update and get data from collection order book
orderBookSchema.statics.order_book_data = function (product_id, callback){
    //update data
    Order_book.update_data(product_id, function(results){
        if (results == 1){
            //get data
            Order_book.findAllData(product_id, function(result){
                callback(result);
            });
        }
    });
}

//update data
orderBookSchema.statics.update_data = function (product_id, callback){
    publicClient.getProductOrderBook(product_id, { level: 2 }).then(book => {
        var newData = new Order_book({
            product_id: product_id,
            sequence: book.sequence,
            bids: book.bids,
            asks: book.asks
        });
        newData.save();
        callback(1);
    });
}

//find all the data and get its sequence, bids, asks
orderBookSchema.statics.findAllData = function (product_id, callback) {
    var data = [
        {$match: {product_id: product_id}},
        {$sort: {'sequence': -1}},
        {$limit: 1}
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

var Order_book = mongoose.model('Order_Book', orderBookSchema, 'order_book');
module.exports = Order_book;