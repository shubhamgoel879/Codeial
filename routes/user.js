const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/user_controller');

router.get('/profile',user_controller.profile);
router.get('/sign-up',user_controller.signup);
router.get('/sign-in',user_controller.signin);
router.post('/create',user_controller.create);
router.post('/create-session',user_controller.createSession);

module.exports=router;