const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');
const passport = require('passport');


router.get('/profile/:id',passport.checkAuthentication,user_controller.profile);
router.post('/update/:id',passport.checkAuthentication,user_controller.update);
router.get('/sign-up',user_controller.signup);
router.get('/sign-in',user_controller.signin);
router.post('/create',user_controller.create);


//use passport as a middleware to authenticate.
router.post('/create-session',passport.authenticate('local',{
    failureRedirect:'/user/sign-in'
}),user_controller.createSession);


router.get('/sign-out',user_controller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),user_controller.createSession);

module.exports=router;