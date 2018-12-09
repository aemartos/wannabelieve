const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

/* GET home page */
router.get('/profile', isLoggedIn('/auth/login'), (req, res, next) => {
  res.render('userProfile/index', {actual_page: 'userProfile_page'});
});


module.exports = router;
