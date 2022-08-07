const express = require('express');
const passport = require('passport');
const router=express.Router();


const comment_Controller=require('../controllers/comment_Controller');

router.post('/create',passport.checkAuthentication,comment_Controller.create);
router.get('/destroy/:id',passport.checkAuthentication,comment_Controller.destroy);
module.exports=router;