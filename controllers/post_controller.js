const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            req.flash('error','Error while creating the post');
            return;
        }
        req.flash('success', '😎 Post Published!');
        return res.redirect('back');
    });
}

module.exports.destroy = async function (req, res) {
    try{
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await post.remove();
            await Comment.deleteMany({ post: req.params.id });
        }
        req.flash('success','Post Deleted!'); 
        return res.redirect('back');
    }catch(err){
        req.flash('Error',err);
        return;
    }
}