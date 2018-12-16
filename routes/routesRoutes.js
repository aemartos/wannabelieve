const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');
const Route = require("../models/Route");
const User = require("../models/User");
const Phenomenon = require("../models/Phenomenon");


router.get('/', isLoggedIn("/auth/login"), (req, res, next) => {
  Route.find().sort({createdAt: -1})
  .then(routesList => {
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

// router.get('/', isLoggedIn("/auth/login"), (req, res, next) => {
//   Route.find().sort({createdAt: -1})
//   .then(routesList => {
//     //console.log(routesList);
//     if(routesList.length === 0) {
//       res.render('routes/index', {
//         routesList,
//         actual_page: "routes_page",
//         routes: true,
//         noRoutes: true
//       });
//     } else {
//       routesList.forEach((e,i)=>{
//         User.find({"_id": e.creatorId}).then((usersList)=>{
//           console.log(usersList);
//           res.render('routes/index', {
//             routesList,
//             usersList,
//             actual_page: "routes_page",
//             routes: true
//           });
//         });
//       });
//     }
//   })
// });


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


router.get('/:id/detail', (req,res) => {
  let canEdit = undefined;
  Route.findById(req.params.id).then(route => {
    //console.log(route.createdAt);
    let creationDate = `${route.createdAt.getDay()}/${route.createdAt.getMonth()}/${route.createdAt.getFullYear()}`;
    //console.log(creationDate);
    User.findOne({"_id": route.creatorId}).then(user =>{
      if (user._id.toString() === req.user._id.toString()) {
        canEdit = true;
      } else {
        canEdit = false;
      }
      res.render('routes/detail', {
        actual_page: "routeDetail_page",
        creationDate,
        route,
        user,
        canEdit,
        routes: true
      });
    });
  })
});

router.get("/:id/edit/", (req, res) => {
  Route.findById(req.params.id).then(route => {
    res.render("routes/edit", {
      route,
      actual_page: "routeEdit_page",
      routes: true
    });
  });
});

router.post("/:id/edit/", (req, res) => {
  const {routetitle, description} = req.body;
  Route.findByIdAndUpdate(req.params.id, {routetitle, description})
    .then(() => res.redirect(`/routes/${req.params.id}/detail`));
});


router.get('/:id/delete', (req,res) => {
  Route.findByIdAndDelete(req.params.id).then(()=> {
    res.redirect('/routes');
  })
});


module.exports = router;
