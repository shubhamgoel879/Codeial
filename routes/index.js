const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
//Any further routes can be accessed from here

router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
module.exports=router;  // module is used for get and post requests