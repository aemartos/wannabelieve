const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");


router.get('/map', isLoggedIn('/auth/login'), (req, res, next) => {
  Phenomenon.find().then(phenomena => {
    res.render('map',{
      phenomena: JSON.stringify(phenomena),
      actual_page: 'map_page',
      map: true
    });
  });
});


/*------ MAP SEARCH ----*/

router.get('/mapsearch', isLoggedIn('/auth/login'), (req, res, next) => {
  let {t,r,b,l,query} = req.query;
  let regex = new RegExp(query, "gi");
  //default minimum coordinates
  let coordinates =  [[[0, 0.01], [0, 0], [0.01, 0], [0, 0.01]]];
  //take coordinates from client request
  if (t && r && b && l) {
    coordinates =  [[[l, t], [r, t], [r, b], [l, b], [l, t]]];
  }
  //find by literal search (query) or location by Google Places API
  Phenomenon.find({$or: [
    {"type": regex},
    {"name": regex},
    {"description": regex},
    {"type": regex},
    /* {"creatorId.username": regex}, */
    {
      location: {
        $geoWithin: {
          $geometry: {
            type : "Polygon",
            coordinates
          }
        }
      }
    }]})
  .then(phenomena => {
    res.json({phenomena});
  });
});


module.exports = router;
