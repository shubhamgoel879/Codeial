const User = require('../models/user');
module.exports.profile=function(req,res){
    res.render('user_profile',{
        title: 'User Profile'
    });
}


//render signup page.
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        title:'Sign Up'
    });
}


//render signin page
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:'Sign In'
    });
}

// Used for signing up a user.
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('Error in finding up a user');
           return;
       }
       if(!user){
           User.create(req.body,function(err,user){
               if(err){
                   console.log('Error in creating a user');
                   return;
               }
               return res.redirect('/user/sign-in');
           });
       }
       else{
           return res.redirect('back');
       }
   });

}

// Used for signing in a user
module.exports.createSession=function(req,res){
    //To do
}