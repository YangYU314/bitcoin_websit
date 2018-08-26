var mongoose = require('mongoose');

//connect mongodb
mongoose.connect('mongodb://localhost/cryptocurrency', function(err){
    if (!err){
        console.log('mongodb connected');
    }else{
        console.log('connected failed');
    }
})

module.exports = mongoose;