const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

const User = require("../models/User");

const uploadMethods = require("../config/cloudinary.js");
const uploadProfilePicture = uploadMethods.uploadProfilePicture;

/* GET home page */
router.get('/profile', isLoggedIn('/auth/login'), (req, res, next) => {
  res.render('userProfile', {actual_page: 'userProfile_page'});
});

router.get('/profile/edit', isLoggedIn('/auth/login'), (req, res, next) => {
  res.render('userProfile/edit', {actual_page: 'editUserProfile_page'});
});

router.post('/editProfile', uploadProfilePicture.single("file"), (req,res) => {
    const photoProfile=req.file.url;
  const {username, email,userId} = req.body;
  
  User.findByIdAndUpdate(userId,{username, email,photoProfile})
     .then(() =>  res.redirect(`/profile`))
})


module.exports = router;
