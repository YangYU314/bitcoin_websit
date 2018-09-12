const mongoose = require('./database');
const Schema = mongoose.Schema;
const request = require("request");

const newsSchema = new Schema({
    articleTitle: String,
    articleImage: String,
    articleDescrption: String,
    articleUrl: String,
},
{
    collection: 'news'
});

//latest news articles
newsSchema.statics.news_data = function(callback){
    const url = "https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=41ba5d283bf84e3f953210cb1530948c";
    getData(url, function (err, result){
        if (err) {
            console.log("error");
        } else {
            var temp = new Array();
            var newsData = result.articles;
            var list;
            var title;
            var image;
            var descrption;
            var url;
            for (var i = 0; i < newsData.length; i++){
                title = newsData[i].title;
                image = newsData[i].urlToImage;
                descrption = newsData[i].description;
                url = newsData[i].url;
                var newsArray = {};
                newsArray["articleTitle"] = title;
                newsArray["articleImage"] = image;
                newsArray["articleDescrption"] = descrption;
                newsArray["articleUrl"] = url;
                temp.push(newsArray);
            }
            callback(temp);
        }
    });
}

//function to get data from URL
function getData(url, callback) {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(error, body);
        }
    });
}

var news = mongoose.model('News', newsSchema, 'news');
module.exports = news;