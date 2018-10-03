var mongoose = require('./database');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    preference: String
});

userSchema.statics.find_login = function(username, password, callback){
    return this
        .find({username: username, password: password})
        .select({username:1, preference:1})
        .exec(function (err, result){
            if(err){
                console.log(err);
            }else{
                if (result.length > 0){
                    callback(result[0]);
                }else{
                    callback(0);
                }
            }
        })
}

userSchema.statics.insert_register = function(firstname, lastname, username, password, email, preference, callback){
    users.find_username(username, function(err, res){
        if(err){
            console.log(err);
        }else{
            if (res.length > 0){
                callback(0);
            }else{
                var newUser = new users(
                    {
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        password: password,
                        email: email,
                        preference: preference
                    })
                newUser.save();
                callback(1);
            }
        }
    });
}

userSchema.statics.setting = function(username, firstname, lastname, old_password, new_password, email, preference, callback){
    users.updateOne({username: username}, {$set:{firstname: firstname, lastname: lastname, email: email}}, function(err, data){
        if(err){
            console.log("Query: Update Error!");
        }else{
            if (old_password == null){
                callback("Modify Success!");
            }else{
                var password = "";
                users.person_password(username, function(err, res){
                    if(err){
                        console.log(err);
                    }else{
                        password = res[0].password;
                        if(password == old_password){
                            users.updateOne({username: username}, {$set:{password: new_password}}, function(err, data){
                                if(err){
                                    console.log("Query: Update Error!");
                                }else{
                                    callback("Modify Success!");
                                }
                            });
                        }else{
                            callback("Wrong old password!");
                        }
                    }
                });
            }
        }
    });
}

userSchema.statics.find_username = function(username, callback){
    return this
        .find({username: username})
        .select({username:1})
        .exec(callback)
}

userSchema.statics.person_information = function(username, callback){
    return this
        .find({username: username})
        .select({username:1, firstname:1, lastname:1, email:1})
        .exec(callback)
}

userSchema.statics.person_password = function(username, callback){
    return this
        .find({username: username})
        .select({password:1})
        .exec(callback)
}

var users = mongoose.model('Users', userSchema, 'users');
module.exports = users;