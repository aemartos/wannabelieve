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
  let search = req.query.query;
  let regex = new RegExp(search, "gi");
  let lat = req.query.lat;
  let lng = req.query.lng;
  let dist = 10000;
  Phenomenon.find({$or: [
    {"type": regex},
    {"name": regex},
    {"description": regex},
    {"type": regex},
    /* {"creatorId.username": regex}, */
    { location: {
      $geoWithin: {
        $center: [[lat, lng], 0.25]
      }
    }
    }]})
  .then(phenomena => {
    res.json({phenomena});
  });
});


/*GET near phenomena*/
router.post('/nearPhenomena', (req, res, next) => {
  let {lat,lng} = req.body.location;
  //console.log(`Searching locations with(${lat},${lng})`);
  Phenomenon.find({ "location.coordinates": {$near : [lat,lng]}
    // location: {
    //   $near: {
    //     $geometry: {
    //       type: "Point",
    //       coordinates: [lat,lng]
    //     },
    //     // $maxDistance: 10000
    //   }
    //   // $geoWithin: {
    //   //   $center: [[lat, lng], 1]
    //   // }
    //   }
  }).limit(2).then(nearPhenomena => {
    //console.log(nearPhenomena);
    res.json(nearPhenomena);
  }).catch((e)=>{console.log(e)})
});
module.exports = router;
