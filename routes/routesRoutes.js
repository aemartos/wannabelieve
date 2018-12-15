const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");








module.exports = router;
