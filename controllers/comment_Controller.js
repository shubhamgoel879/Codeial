const { response } = require('express');
const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create= async function(req,res){
    Post.findById(req.body.postId, async function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.postId
            }, async function(err,comment){
                if(err){
                    req.flash('error',err);
                    return;
                }
                post.comments.push(comment);  // it will be pushed in locals so we need to save it in database.
                post.save();
                req.flash('success', '😎 Comment Published!');
                comment=await comment.populate('user',' name email');
                // commentsMailer.newComment(comment);
                let job=queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('error in sending to the queue',err);
                    }
                    console.log('job enqueued',job.id);
                });
                res.redirect('/');
            });
        }
    });
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            req.flash('error',err);
            return;
        }
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            req.flash('success', 'Comment Deleted!');
            Post.findByIdAndUpdate(postId,{ $pull:{comments:req.params.id} },function(err,post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}