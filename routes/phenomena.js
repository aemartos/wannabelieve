const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");
const { distanceCheck } = require("../middlewares/distanceCheck");

const Phenomenon = require("../models/Phenomenon");
const User = require("../models/User");
const Review = require("../models/Review");
const ObjectId = require("mongoose").Types.ObjectId;

const uploadMethods = require("../config/cloudinary.js");
const uploadPhenomPicture = uploadMethods.uploadPhenomPicture;

router.get("/phenomena/new", isLoggedIn("/auth/login"), (req, res) => {
  res.render("phenomena/new", { actual_page: "addPhenom_page" });
});

router.post("/addPhenomenon", uploadPhenomPicture.array("file"), (req, res) => {
  var imgPhenomUrls = [];

  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      imgPhenomUrls.push(req.files[i].url);
    }
  }

  const { name, description, type } = req.body;
  const creatorId = req.user;
  const location = {
    type: "Point",
    coordinates: [req.body.latitude, req.body.longitude]
  };

  Phenomenon.create({
    imgPhenomUrls,
    name,
    description,
    type,
    creatorId,
    location
  })
    .then(phenomenon => {
      console.log(`Se ha publicado el fenomeno`);
      res.redirect("/phenomena");
    })
    .catch(e => {
      console.log(`There is an error: ${e}`);
    });
});

router.get("/phenomena", isLoggedIn("/auth/login"), (req, res, next) => {
  // Sorting by last created
  let query = { createdAt: -1 };

  Phenomenon.find()
    .sort(query)
    .then(phenomena => {
      const phenomList = phenomena.map(p => {
        return {
          ...JSON.parse(JSON.stringify(p)),
          numFavs: p.whoseFavId.length,
          numRevs: p.reviewsId.length
        };
      });
      res.render("phenomena/main", {
        phenomList,
        actual_page: "phenomena_page",
        phenomenon: true
      });
    });
});

router.get("/phenomena/:id/edit/", (req, res) => {
  Phenomenon.findById(req.params.id).then(phenomenon => {
    res.render("phenomena/edit", {
      phenomenon,
      actual_page: "phenomena_editPage"
    });
  });
});

router.post("/phenomena/:id/edit/", (req, res) => {
  const { name, type, description } = req.body;
  const id = req.params.id;
  Phenomenon.findByIdAndUpdate(id, { name, type, description }).then(() =>
    res.redirect("/phenomena")
  );
});

router.get("/phenomena/:id/delete", (req, res) => {
  Phenomenon.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/phenomena");
  });
});

router.get("/phenomena/:id", isLoggedIn("/auth/login"), (req, res) => {
  Phenomenon.findById(req.params.id)
    .populate("creatorId")
    .populate({ path: "reviewsId", populate: { path: "authorId" } })
    .populate("routesImIn")
    .then(phenomenon => {
      const reviews = phenomenon.reviewsId.map(revs => {
        let min =
          revs.createdAt.getMinutes().toString().length === 1
            ? `0${revs.createdAt.getMinutes()}`
            : revs.createdAt.getMinutes();
        return {
          ...JSON.parse(JSON.stringify(revs)),
          formatDate: `${revs.createdAt.getDate()}/${revs.createdAt.getMonth() +
            1}/${revs.createdAt.getFullYear()}`,
          formatTime: `${revs.createdAt.getHours()}:${min}`
        };
      });

      let phenomCreationDate = `${phenomenon.createdAt.getDate()}/${phenomenon.createdAt.getMonth() +
        1}/${phenomenon.createdAt.getFullYear()}`;

      //editUser - false (no es el mismo)  
      //editUser - true (es el mismo)  
      const editUser = phenomenon.creatorId._id === req.user._id

      // visited - false (no ecuentra el userID)
      // visited - true (encuentra el userID)
      const visited = phenomenon.visitorsId.indexOf(req.user._id) !== -1;

      // favourite - false (no ecuentra el userID)
      // favourite - true (encuentra el userID)
      const favourite = phenomenon.whoseFavId.indexOf(req.user._id) !== -1;
        console.log(favourite)

      res.render("phenomena/detail", {
        phenomenon,
        reviews,
        phenomCreationDate,
        editUser,
        visited,
        favourite,
        actual_page: "phenomena_detailPage"
      });
    });
});

router.post(
  "/phenomena/:id/register",
  isLoggedIn("/auth/login"),
  (req, res) => {

    let geoLat = req.body.latitude;
    let geoLong = req.body.longitude;

    let userId = req.user._id
    
    //geolocate check
    if(geoLat ==undefined || geoLong == undefined){
      req.flash("error", "geolocation not found");
      res.redirect(`/phenomena/${req.params.id}`);
    } else {
      Phenomenon.findById(req.params.id).then(phenomenon=>{
        //distance check

        let phenLat = phenomenon.location.coordinates[0];
        let phenLong = phenomenon.location.coordinates[1];

        if (distanceCheck(geoLat, geoLong, phenLat, phenLong, "K") > 0.1) {
          req.flash("error", "you need to be near (min 150m)");
          res.redirect(`/phenomena/${req.params.id}`);
          //already register check
        } else if(phenomenon.visitorsId.indexOf(userId) !==-1){
          req.flash("error", "ya has registrado esta visita");
          res.redirect(`/phenomena/${req.params.id}`);
        } else {
          phenomenon.visitorsId.push(userId);
          phenomenon.save();
          res.redirect(`/phenomena/${req.params.id}`);
          
        }
      })
    }
  }
);

router.post(
  "/phenomena/:id/favourite",
  isLoggedIn("/auth/login"),
  (req, res) => {
    let userId = req.user._id;
    Phenomenon.findById(req.params.id).then(phenomenon=>{

      if(phenomenon.whoseFavId.indexOf(userId) !==-1){
        req.flash("error", "already in favs");
        console.log("ya es favorito");
        res.redirect(`/phenomena/${req.params.id}`);
      } else {
        phenomenon.whoseFavId.push(userId);
        phenomenon.save()
        res.redirect(`/phenomena/${req.params.id}`)
      }
    })
  }
);

router.post("/phenomena/:id/postReview", (req, res) => {
  let content = req.body.content;
  let authorId = new ObjectId(req.user._id);

  Review.create({ content, authorId }).then(review => {
    Promise.all([
      Phenomenon.findByIdAndUpdate(req.params.id, {
        $push: { reviewsId: `${review._id}` }
      }),
      User.findByIdAndUpdate(authorId, {
        $push: { reviewsId: `${review._id}` }
      })
    ])
      .then(() => res.redirect(`/phenomena/${req.params.id}`))

  });
});

module.exports = router;
