const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");
const { distanceCheck } = require("../middlewares/distanceCheck");

const Phenomenon = require("../models/Phenomenon");
const User = require("../models/User");
const Review = require("../models/Review")
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
  let query = { created_at: -1 };

  Phenomenon.find()
    .sort(query)
    .then(phenomena => {
      res.render("phenomena/main", {
        phenomena,
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
  Phenomenon.findById(req.params.id).then(phenomenon => {
    let phenomCreationDate = `${phenomenon.created_at.getDay()}/${phenomenon.created_at.getMonth()}/${phenomenon.created_at.getFullYear()}`;
    let phenomCreator = new ObjectId(phenomenon.creatorId);
    let queryVisited = {
      $and: [
        { _id: ObjectId(`${req.params.id}`) },
        { visitorsId: ObjectId(`${req.user._id}`) }
      ]
    };

    let queryFavourite = {
      $and: [
        { _id: ObjectId(`${req.user._id}`) },
        { favPhenoms: ObjectId(`${req.params.id}`) }
      ]
    };

    Promise.all([
      User.findById(phenomCreator),
      Phenomenon.find(queryVisited),
      User.find(queryFavourite)
    ]).then(([creator, visit, favourites]) => {
      const visited = () => {
        if (visit.length == 1) {
          return true;
        } else {
          return false;
        }
      };

      const editUser = () => {
        if (
          JSON.stringify(phenomenon.creatorId) === JSON.stringify(req.user._id)
        ) {
          return true;
        } else {
          return false;
        }
      };

      const favourite = () =>{
        if(favourites.length==1){
          return true
        } else {
          return false
        }
      }

      res.render("phenomena/detail", {
        phenomenon,
        creator,
        editUser,
        visited,
        favourite,
        phenomCreationDate,
        actual_page: "phenomena_detailPage"
      });
    });
  });
});

router.post(
  "/phenomena/:id/register",
  isLoggedIn("/auth/login"),
  (req, res) => {
    let geoLat = req.body.latitude;
    let geoLong = req.body.longitude;
    let phenomRegister = new ObjectId(req.params.id);
    let userId = new ObjectId(req.user._id);
    let queryVisited = {
      $and: [
        { _id: ObjectId(`${phenomRegister}`) },
        { visitorsId: ObjectId(`${userId}`) }
      ]
    };

    Phenomenon.find(queryVisited).then(visited => {
      if (visited.length == 1) {
        console.log("ya has estado aqui");
        res.redirect(`/phenomena/${phenomRegister}`);
      } else {
        Phenomenon.findById(phenomRegister).then(phenomenon => {
          let phenLong = phenomenon.location.coordinates[1];
          let phenLat = phenomenon.location.coordinates[0];

          if (distanceCheck(geoLat, geoLong, phenLat, phenLong, "K") < 0.2) {
            Phenomenon.findByIdAndUpdate(phenomRegister, {
              $push: { visitorsId: userId }
            }).then(() => res.redirect(`/phenomena/${phenomRegister}`));
          } else {
            res.redirect(`/phenomena/${phenomRegister}`);
            console.log("no puedes");
          }
        });
      }
    });
  }
);


router.post(
  "/phenomena/:id/favourite",
  isLoggedIn("/auth/login"),
  (req, res) => {
    let phenomFav = new ObjectId(req.params.id);
    let userId = new ObjectId(req.user._id);
    let queryFavourite = {
      $and: [
        { _id: ObjectId(`${userId}`) },
        { favPhenoms: ObjectId(`${phenomFav}`) }
      ]
    };

    User.find(queryFavourite).then(favourite => {
      if (favourite.length == 1) {
        console.log("ya es favorito");
        res.redirect(`/phenomena/${phenomFav}`);
      } else {
        User.findByIdAndUpdate(userId, {
            $push: { favPhenoms: phenomFav }
          }).then(() => res.redirect(`/phenomena/${phenomFav}`));
        }
      });
    });



    router.post(
      "/uploadComment",
      (req, res) => {
        let content = req.body.comment;
        let authorId = req.user._id};
        let phenomId = req.body.phenomId};
        console.log(phenomId)
        
        Review.create({ content, authorId }).then(
          review => {
            
            let reviewId=new ObjectId(`${review._id}`)
            console.log(reviewId)
            Phenomenon.findByIdAndUpdate(phenomId,{$push:{reviewsId:reviewId}})
            .then(() => {
              res.redirect(`/phenomena/${phenomId}`);
            });
    
          }
        );
      }
    );
          
module.exports = router;
