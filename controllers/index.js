var usersModel = require('../models/users');

module.exports.showMainPage = function(req, res) {
    res.render('index', { title: 'Express' });
}

module.exports.login = function(req, res) {
    res.render('login');
}

module.exports.validation_login = function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        if(username == sess.username){
            var result = sess.username;
            res.json({result: result});
        }else{
            usersModel.find_login(username, password, function(result) {
                if (result != 0){
                    res.json({result: 1});
                }else{
                    res.json({result: result});
                }
            });
        }
    }else{
        usersModel.find_login(username, password, function(result) {
            if (result != 0){
                sess.username = result;
            }
            res.json({result: result});
        })
    }
}

module.exports.logout = function(req, res) {
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        sess.username = null;
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
    var password = req.body.password;
    var email = req.body.email;
    usersModel.insert_register(firstname, lastname, username, password, email, function (result) {
        res.json({result: result});
    })
}
