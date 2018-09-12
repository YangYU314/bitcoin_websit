var usersModel = require('../models/users');
var crypto = require('crypto');

module.exports.showMainPage = function(req, res) {
    res.render('index', { title: 'Express' });
}

module.exports.login = function(req, res) {
    res.render('login');
}

module.exports.validation_login = function(req, res){
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password, 'utf8').digest();
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        if(username == sess.username){
            var result = sess.username;
            res.json({result: result});
        }else{
            res.json({result: 1});
        }
    }else{
        usersModel.find_login(username, password, function(result) {
            if (result != 0){
                sess.username = result.username;
                sess.preference = result.preference;
            }
            res.json({result: result});
        })
    }
}

module.exports.logout = function(req, res) {
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        sess.username = null;
        sess.preference = null;
        res.json({result: 0});
    }
}

module.exports.register = function(req, res) {
    res.render('register');
}

module.exports.validation_register = function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password, 'utf8').digest();
    var email = req.body.email;
    var preference = req.body.preference;
    console.log(firstname, lastname, username, password, email, preference);
    usersModel.insert_register(firstname, lastname, username, password, email, preference, function (result) {
        res.json({result: result});
    })
}
