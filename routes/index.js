const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");

/* GET home page */
router.get('/', isLoggedOut('/map'), (req, res, next) => {
  res.render('index', {actual_page: 'initial_page'});
});


router.get('/info', isLoggedIn("/auth/login"), (req, res, next) => {
  res.render('info-page', {actual_page: 'info_page'});
});

module.exports = router;
