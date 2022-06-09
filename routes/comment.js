const express = require('express');
const passport = require('passport');
const router=express.Router();


const commentController=require('../controllers/commentController');

router.post('/create',passport.checkAuthentication,commentController.create);

module.exports=router;