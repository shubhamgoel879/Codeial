const { response } = require('express');
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.postId,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postId
            },function(err,comment){
                post.comments.push(comment);  // it will be pushed in locals so we need to save it in database.
                post.save();
                res.redirect('/');
            });
        }
    });
}