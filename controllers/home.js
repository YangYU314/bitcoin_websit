module.exports.showMainPage = function(req, res){
    var sess = req.session;
    if ("username" in sess && sess.username != null){
        res.render('home', {user: sess.username});
    }else{
        res.render('home', {user: "shenghui wu"});
        //res.render('login');
    }
}
