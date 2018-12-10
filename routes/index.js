const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");

/* GET home page */
router.get('/', isLoggedOut('/map'), (req, res, next) => {
  res.render('index', {actual_page: 'initial_page'});
});

router.get('/map', isLoggedIn('/auth/login'), (req, res, next) => {

  Phenomenon.find().then(phenomena => {
    res.render('map',{phenomena:JSON.stringify(phenomena), actual_page: 'map_page'});
  });

});

module.exports = router;
