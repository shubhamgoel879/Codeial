const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {

    /* Post.find will find all possible post objects in an array, 
    each object having content as string and user as objectId 
    so we have to populate our user using ref collection='User', now user is now having name, email etc. */

    let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });


    let users = await User.find({});

    return res.render('home', {
        title: 'Home',
        posts: posts,
        all_users: users
    });
};