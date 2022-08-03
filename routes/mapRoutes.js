import express from 'express';
import { isLoggedIn } from '../middlewares/isLogged.js';
import Phenomenon from "../models/Phenomenon.js";

const router = express.Router({ mergeParams: true });

router.get('/', isLoggedIn('/auth/login'), (req, res, next) => {
  Phenomenon.find().then(phenomena => {
    const phenom = phenomena.map((e) => {
      return {
        ...JSON.parse(JSON.stringify(e)),
        sighted: e.visitorsId.map(v => v.toString()).indexOf(req.user._id.toString()) !== -1
      }
    });
    res.render('map', {
      phenomena: JSON.stringify(phenom),
      actual_page: 'map_page',
      map: true,
      googleApiKey: process.env.GOOGLE_MAPS_API_KEY
    });
  });
});


/*------ MAP SEARCH ----*/

router.get('/mapsearch', isLoggedIn('/auth/login'), (req, res, next) => {
  let { t, r, b, l, query } = req.query;
  let regex = new RegExp(query, "gi");
  //default minimum coordinates
  let coordinates = [[[0, 0.01], [0, 0], [0.01, 0], [0, 0.01]]];
  //take coordinates from client request
  if (t && r && b && l) {
    coordinates = [[[l, t], [r, t], [r, b], [l, b], [l, t]]];
  }
  //find by literal search (query) or location by Google Places API
  Phenomenon.find({
    $or: [
      { "type": regex },
      { "name": regex },
      { "description": regex },
      { "type": regex },
      { "creatorId.username": regex },
      {
        location: {
          $geoWithin: {
            $geometry: {
              type: "Polygon",
              coordinates
            }
          }
        }
      }]
  })
    .then(phenomena => {
      res.json({ phenomena });
    });
});


export default router;
