const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
//Any further routes can be accessed from here

console.log('Inside routes index.');
module.exports=router;  // module is used for get and post requests