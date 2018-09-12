const mongoose = require('./database');
const Schema = mongoose.Schema;
const request = require("request");

const worldMapSchema = new Schema({
    city: String,
    countryCode: String,
    latitude: String,
    longitude: String,
    },
    {
        collection: 'worldMap'
});

worldMapSchema.statics.world_map_data = function(callback){
    const url = "https://bitnodes.earn.com/api/v1/snapshots/latest";
    getData(url, function (err, result) {
        if (err){
            console.log("error");
        }else{
            var temp = new Array();
            var nodeData = result.nodes;
            var list;
            var la;
            var lo;
            var city;
            var countryCode;

            for (const key in nodeData) {
                //filter specific elements
                list = nodeData[key];
                city = list[6];
                countryCode = list[7];
                la = list[8];
                lo = list[9];

                //save in database
                // var newMap = new worldMap(
                //     {
                //         city: city,
                //         countryCode: countryCode,
                //         latitude: la,
                //         longitude: lo,
                //     });
                //
                // newMap.save();

                //save jason into the array
                var mapArray = {};
                mapArray["city"] = city;
                mapArray["countryCode"] = countryCode;
                mapArray["latitude"] = la;
                mapArray["longitude"] = lo;
                temp.push(mapArray);
            }
            //console.log(temp);
             callback(temp);
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

var worldMap = mongoose.model('WorldMap', worldMapSchema, 'worldMap');
module.exports = worldMap;