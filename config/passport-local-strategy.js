const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport mainly for signin
passport.use(new LocalStrategy({
    usernameField: 'email',    // we have to specify username field as per schema.
    passReqToCallback: true
},
    function (req, email, password, done) {
        // find a user and establishing identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error','⚠️'+' '+err);
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error','⚠️ Invalid Username/Password');
                return done(null, false);   // done takes 2 args, null means no error, false means not able to authenticate. 
            }
            return done(null, user);
        });
    }
));



//serializing function- Putting ID in cookie that is to be sent to browser.
passport.serializeUser(function (user, done) {
    //user.id will get auto encrypted.
    done(null, user.id);
});

//Deserializing function- Getting ID from the cookie that is received on server from browser.
passport.deserializeUser(function (id, done) {

    //console.log('User Deseirialized-',id);
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null, user);
    });
});


//check if user is authenticated.
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/user/sign-in');

};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views.
        res.locals.user = req.user;
    }
    return next();
}



module.exports = passport;


