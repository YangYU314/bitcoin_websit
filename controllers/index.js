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
                sess.newuser = result.newuser;
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
        sess.newuser = null;
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
    usersModel.insert_register(firstname, lastname, username, password, email, preference, function (result) {
        res.json({result: result});
    })
}

//get person information
module.exports.person = function(req, res){
    var username = req.body.username;
    usersModel.person_information(username, function (err, result) {
        if(err){
            console.log(err);
        }else{
            res.json({result: result[0]});
        }
    });
}

//set setting
module.exports.validation_setting = function(req, res){
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var old_password = null;
    var new_password = null;
    var final = null;
    if (req.body.password != false && req.body.password1 != false && req.body.password2 != false){
        old_password = crypto.createHash('sha256').update(req.body.password, 'utf8').digest();
        if (req.body.password1 != req.body.password2){
            final = 0;
        }else{
            new_password = crypto.createHash('sha256').update(req.body.password1, 'utf8').digest();
        }
    }else if(req.body.password == false && req.body.password1 == false && req.body.password2 == false){
        final = null;
    }else{
        final = 1;
    }
    var email = req.body.email;
    var preference = req.body.preference;

    if (final != null){
        res.json({result: final});
    }else{
        usersModel.setting(username, firstname, lastname, old_password, new_password, email, preference, function (result) {
            res.json({result: result});
        });
    }
}

//judge if he is a new user
module.exports.newUser = function (req, res) {
    var username = req.body.username;
    usersModel.person_newuser(username, function(result){
        res.json({result: result});
    })
}
