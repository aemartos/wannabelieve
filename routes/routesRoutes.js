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


router.get('/add/:phenomenonId', isLoggedIn("/auth/login"), (req, res, next) => {
  let alreadyIn = '';
  Route.find().populate('creatorId').sort({createdAt: -1})
  .then(routes => {
    let routesList = routes.map(r=>{return { ...JSON.parse(JSON.stringify(r)), numFavs: r.whoseFavId.length, alreadyIn}});
    console.log(routesList.phenomenoId);
    routesList.forEach((e,i)=>{
      if(e.phenomenoId.indexOf(req.params.phenomenonId) !== -1) {
        e.alreadyIn = 'active';
        console.log(true);
      }
    });
    const phenomenon = req.params.phenomenonId;
    if(routesList.length === 0) {
      res.render('routes/index', {
        routesList,
        actual_page: "routes_page",
        phenomenon,
        addingPhenomenon: true,
        routes: true,
        noRoutes: true
      });
    } else {
      res.render('routes/index', {
        routesList,
        actual_page: "routes_page",
        phenomenon,
        addingPhenomenon: true,
        routes: true
      });
    }
  })
});

router.post('/:id/add/:phenomenonId', isLoggedIn("/auth/login"), (req, res, next) => {
  const backURL = req.header('Referer') || '/routes';
  Route.findById(req.params.id).then(route => {
    Phenomenon.findById(req.params.phenomenonId).then(phenom => {
      if(route.phenomenoId.indexOf(req.params.phenomenonId) === -1) {
        route.phenomenoId.push(phenom);
        phenom.routesImIn.push(route);
        phenom.save().then(()=>{
          route.save().then(()=>{
            res.redirect(`/phenomena/${req.params.phenomenonId}`);
          });
        });
      } else {
        req.flash("error", "already in this route");
        res.redirect(backURL);
        return;
      }
    });
  });
});

router.post('/:id/delete/:phenomenonId', isLoggedIn("/auth/login"), (req, res, next) => {
  Route.findById(req.params.id).then(route => {
    Phenomenon.findById(req.params.phenomenonId).then(phenom => {
      route.phenomenoId.pull(phenom);
      phenom.routesImIn.pull(route);
      phenom.save().then(()=>{
        route.save().then(()=>{
          res.redirect(`/routes/${req.params.id}/edit`);
        });
      });
    });
  });
});

router.post('/addRoute', isLoggedIn("/auth/login"), (req, res, next) => {
  const routetitle = req.body.routetitle;
  const creatorId = req.user;
  const backURL = req.header('Referer') || '/routes';
  if (routetitle === "") {
    req.flash("error", "you must write something");
    res.redirect(backURL);
    return;
  } else {
    Route.findOne({routetitle}, "routetitle", (err, title) => {
      if (title !== null) {
        req.flash("error", "the route title already exists");
        res.redirect(backURL);
        return;
      }
      Route.create({routetitle, creatorId})
      .then(() => {
        res.redirect(backURL);
      }).catch(err => {
        console.error(err, `Can't create route`);
      });
    });
  }
});


router.get('/:id/detail', isLoggedIn("/auth/login"), (req, res, next) => {
  let canEdit = undefined;
  Route.findById(req.params.id).populate('creatorId').populate({path: 'reviewsId', populate: {path: 'authorId'}}).populate('phenomenoId').then(route => {
    //console.log(route.reviewsId[0].authorId);
    const phenomena = JSON.stringify(route.phenomenoId);
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
      phenomena,
      route,
      canEdit,
      fav,
      routes: true
    });
  })
});


router.post('/:id/postComment', isLoggedIn("/auth/login"), (req, res, next) => {
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

router.post('/:id/toggleFav', isLoggedIn("/auth/login"), (req, res, next) => {
  const userId = req.user._id;
  Route.findById(req.params.id).then(route => {
    if (route.whoseFavId.indexOf(userId) === -1) {
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

router.get("/:id/edit/", isLoggedIn("/auth/login"), (req, res, next) => {
  Route.findById(req.params.id).populate('phenomenoId').then(route => {
    res.render("routes/edit", {
      route,
      actual_page: "routeEdit_page",
      routes: true
    });
  });
});

router.post("/:id/edit/", isLoggedIn("/auth/login"), (req, res, next) => {
  const {routetitle, description} = req.body;
  Route.findByIdAndUpdate(req.params.id, {routetitle, description})
    .then(() => res.redirect(`/routes/${req.params.id}/detail`));
});


router.get('/:id/delete', isLoggedIn("/auth/login"), (req, res, next) => {
  Route.findByIdAndDelete(req.params.id).then(()=> {
    res.redirect('/routes');
  })
});

module.exports = router;
