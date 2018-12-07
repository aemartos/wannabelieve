const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

/* GET home page */
router.get('/', isLoggedOut('/map'), (req, res, next) => {
  res.render('index', {actual_page: 'initial_page'});
});

router.get('/map', isLoggedIn('/auth/login'), (req, res, next) => {
  res.render('map', {actual_page: 'map_page'});
});

module.exports = router;
