const User = require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    });
}


//render signup page.
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');    // Go to Home page.
    }
    return res.render('user_sign_up',{
        title:'Sign Up'
    });
}


//render signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');    // Go to Home page.
    }
    return res.render('user_sign_in',{
        title:'Sign In'
    });
}

// Used for sign up a user.
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
    return res.redirect('/');
}



module.exports.destroySession=function(req,res){
    req.logout();   // logout is built in function provided by PassportJS to req
    return res.redirect('/');
}