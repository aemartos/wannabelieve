const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");

/* GET home page */
router.get('/', isLoggedOut('/map'), (req, res, next) => {
  res.render('index', {actual_page: 'initial_page'});
});

module.exports = router;
