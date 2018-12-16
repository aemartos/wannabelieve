const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Route = require("../models/Route");
const User = require("../models/User");
const Phenomenon = require("../models/Phenomenon");
const Review = require("../models/Review");


router.get('/', isLoggedIn("/auth/login"), (req, res, next) => {
  Route.find().populate('creatorId').sort({createdAt: -1})
  .then(routes => {
    const routesList = routes.map(r=>{return { ...JSON.parse(JSON.stringify(r)), numFavs: r.whoseFavId.length}});
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
  const creatorId = req.user;
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
      Route.create({routetitle, creatorId})
      .then(() => {
        res.redirect('/routes');
      }).catch(err => {
        console.error(err, `Can't create route`);
      });
    });
  }
});


router.get('/:id/detail', (req, res, next) => {
  let canEdit = undefined;
  Route.findById(req.params.id).populate('creatorId').populate({path: 'reviewsId', populate: {path: 'authorId'}}).populate('phenomenoId').then(route => {
    //console.log(route.reviewsId[0].authorId);
    let creationDate = `${route.createdAt.getDate()}/${route.createdAt.getMonth() + 1}/${route.createdAt.getFullYear()}`;
    if (route.creatorId._id.toString() === req.user._id.toString()) {
      canEdit = true;
    } else {
      canEdit = false;
    }
    const fav = route.whoseFavId.indexOf(req.user._id) !== -1;
    res.render('routes/detail', {
      actual_page: "routeDetail_page",
      creationDate,
      route,
      canEdit,
      fav,
      routes: true
    });
  })
});


router.post('/:id/postComment', (req, res, next) => {
  const {content} = req.body;
  const authorId = req.user._id;
  Route.findById(req.params.id).then(route => {
    Review.create({content, authorId}).then(review => {
      route.reviewsId.push(review);
      route.save().then(()=>{
        res.redirect(`/routes/${req.params.id}/detail`);
      });
    });
  });
});

router.post('/:id/toggleFav', (req, res, next) => {
  const userId = req.user._id;
  Route.findById(req.params.id).then(route => {
    if (route.whoseFavId.indexOf(userId)  === -1) {
        User.findById(userId).then(user=>{
          user.favRoutes.push(route)
          route.whoseFavId.push(user);
          route.save().then(()=>{
            user.save().then(()=>{
              res.redirect(`/routes/${req.params.id}/detail`);
            })
          })
      });
    } else {
      User.findById(userId).then(user=>{
        user.favRoutes.pull(route)
        route.whoseFavId.pull(user);
        route.save().then(()=>{
          user.save().then(()=>{
            res.redirect(`/routes/${req.params.id}/detail`);
          })
        })
      });
    }
  });
});

router.get("/:id/edit/", (req, res, next) => {
  Route.findById(req.params.id).then(route => {
    res.render("routes/edit", {
      route,
      actual_page: "routeEdit_page",
      routes: true
    });
  });
});

router.post("/:id/edit/", (req, res, next) => {
  const {routetitle, description} = req.body;
  Route.findByIdAndUpdate(req.params.id, {routetitle, description})
    .then(() => res.redirect(`/routes/${req.params.id}/detail`));
});


router.get('/:id/delete', (req, res, next) => {
  Route.findByIdAndDelete(req.params.id).then(()=> {
    res.redirect('/routes');
  })
});


module.exports = router;
