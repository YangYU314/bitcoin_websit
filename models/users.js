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

userSchema.statics.find_username = function(username, callback){
    return this
        .find({username: username})
        .select({username:1})
        .exec(callback)
}

var users = mongoose.model('Users', userSchema, 'users');
module.exports = users;