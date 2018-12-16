const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");
const {distanceCheck} = require ("../middlewares/distanceCheck");

const Phenomenon = require("../models/Phenomenon");
const User = require("../models/User");
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
    let phenomCreationDate=`${phenomenon.created_at.getDay()}/${phenomenon.created_at.getMonth()}/${phenomenon.created_at.getFullYear()}`
    let phenomCreator= new ObjectId(phenomenon.creatorId)

    User.findById(phenomCreator).then(creator => {
      var editUser = false;
      if (
        JSON.stringify(phenomenon.creatorId) === JSON.stringify(req.user._id)
      ) {
        editUser = true;
      }
      res.render("phenomena/detail", {
        phenomenon,
        creator,
        editUser,
        phenomCreationDate,
        actual_page: "phenomena_detailPage"
      });
    });
  });
});

router.post("/phenomena/:id/register", isLoggedIn("/auth/login"), (req, res) => {
let geoLat=req.body.latitude;
let geoLong=req.body.longitude;
let phenomRegister= new ObjectId(req.params.id);

Phenomenon.findById(phenomRegister).then(phenomenon =>{
  let phenLong=phenomenon.location.coordinates[1]
  let phenLat=phenomenon.location.coordinates[0]

  if(distanceCheck(geoLat,geoLong,phenLat,phenLong,"K")<1){
    console.log("you can register")

  } else {
    console.log("no puedes")
  }
})


});
module.exports = router;
