const express = require('express');
const router = express.Router();
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Phenomenon = require("../models/Phenomenon");


router.get('/map', isLoggedIn('/auth/login'), (req, res, next) => {
  Phenomenon.find().then(phenomena => {
    res.render('map',{
      phenomena: JSON.stringify(phenomena),
      //phenomenaList: phenomena,
      actual_page: 'map_page'
    });
  });
});


/*GET near phenomena*/
router.post('/nearPhenomena', (req, res, next) => {
  let {lat,lng} = req.body.location;
  //console.log(`Searching locations with(${lat},${lng})`);
  Phenomenon.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [40.4169473,-3.7035285]
        },
        $maxDistance: 10000
      }
    }
  }).then(nearPhenomena => {
    console.log(nearPhenomena);
    res.json(nearPhenomena);
  }).catch((e)=>{console.log(e)})
});
module.exports = router;



// Phenomenon.find().where("location").near({
//   center: {
//     type: "Point",
//     coordinates: [lat, lng]
//   },
//       maxDistance: 1000,
//       spherical: true
//   }
