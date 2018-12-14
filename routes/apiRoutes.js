const express = require('express');
const router = express.Router();
const Phenomenon = require("../models/Phenomenon");

/* API page */
router.get('/getAllPhenomena', (req, res, next) => {
  Phenomenon.find()
    .then((phenomena) => {res.json(phenomena);})
    .catch((error)=>{console.log(error); res.json({error})});
});

module.exports = router;
