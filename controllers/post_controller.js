const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {      // Type of ajax request id xmlHttpRequest it xhr
            post=await post.populate('user','name');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            })
        }
        req.flash('success', '😎 Post Published!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'Error while creating the post');
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await post.remove();
            await Comment.deleteMany({ post: req.params.id });
        }
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id,
                    message:"Post deleted successfully"
                }
            });
        }
        req.flash('success', 'Post Deleted!');
        return res.redirect('back');
    } catch (err) {
        req.flash('Error', err);
        return;
    }
}