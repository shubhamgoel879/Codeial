module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('user_id','Hello');
    res.cookie('name','Shubham');
    res.render('home',{
        title:'Home'
    });
};