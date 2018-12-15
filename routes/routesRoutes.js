const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Route = require("../models/Route");
const User = require("../models/User");


router.get('/', isLoggedIn("/auth/login"), (req, res, next) => {
  Route.find().sort({createdAt: -1})
  .then(routesList => {
    //User.find({"_id": route.creatorId})
    console.log(routesList);
    if(routesList.length === 0) {
      res.render('routes/index', {
        routesList,
        actual_page: "routes_page",
        routes: true,
        noRoutes: true
      });
    } else {
      res.render('routes/index', {
        routesList,
        actual_page: "routes_page",
        routes: true
      });
    }
  })
});


router.post('/addRoute', isLoggedIn("/auth/login"), (req, res, next) => {
  const routetitle = req.body.routetitle;
  const user = req.user;
  if (routetitle === "") {
    req.flash("error", "you must write something");
    res.redirect("/routes");
    return;
  } else {
    Route.findOne({routetitle}, "routetitle", (err, title) => {
      if (title !== null) {
        req.flash("error", "the route title already exists");
        res.redirect("/routes");
        return;
      }
      Route.add(routetitle, user).then(() => {
        res.redirect('/routes');
      }).catch(err => {
        console.error(err, `Can't create route`);
      });
    });
  }
});


module.exports = router;
