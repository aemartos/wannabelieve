const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");

const Phenomenon = require("../models/Phenomenon");

const uploadMethods = require("../config/cloudinary.js");
const uploadPhenomPicture = uploadMethods.uploadPhenomPicture;

router.get("/phenomena/new", isLoggedIn("/auth/login"), (req, res) => {
  res.render("phenomena/new");
});

router.post("/addPhenomenon", uploadPhenomPicture.array("file"), (req, res) => {
  var imgPhenomUrls = [];

  if (req.files.length > 0) {
    console.log("hola");
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
        actual_page: "phenomena_page"
      });
    });
});

router.get("/phenomena/:id/edit/", (req, res) => {
  Phenomenon.findById(req.params.id).then(phenomenon => {
    res.render("phenomena/edit", { phenomenon });
  });
});

router.post("/phenomena/:id/edit/", (req, res) => {
  const { name, type, description } = req.body;
  const id = req.params.id;
  Phenomenon.findByIdAndUpdate(id, { name, type, description }).then(() =>
    res.redirect("/profile")
  );
});

router.get("/phenomena/:id/delete", (req, res) => {
  Phenomenon.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/profile");
  });
});

router.get("/phenomena/:id", isLoggedIn("/auth/login"), (req, res) => {
  let phenomenaId = req.params.id;
  Phenomenon.findById(phenomenaId).then(phenomenon => {
    console.log(phenomenon);
    res.render("phenomena/detail", { phenomenon });
  });
});

module.exports = router;
