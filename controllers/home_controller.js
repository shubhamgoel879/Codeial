const Post=require('../models/post');
module.exports.home=function(req,res){

    /* Post.find will find all possible post objects in an array, 
    each object having content as string and user as objectId 
    so we have to populate our user using ref collection='User', now user is now having name, email etc. */


    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err) {console.log('Error in finding all posts');return}
        return res.render('home',{
            title:'Home',
            posts:posts
        });
    });
};