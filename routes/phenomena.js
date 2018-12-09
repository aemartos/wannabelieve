const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");

const Phenomenon = require("../models/Phenomenon");

const uploadMethods = require("../config/cloudinary.js");
const uploadPhenomPicture = uploadMethods.uploadPhenomPicture;

router.get("/phenomena/new", isLoggedIn("/auth/login"), (req, res) => {
  res.render("phenomena/new");
});

router.post("/addPhenomenon", uploadPhenomPicture.single("file"), (req, res) => {
  const imgPhenomUrl= req.file.url;
  const {name,description,type}= req.body;
  const creatorId = req.user;

  Phenomenon.create({ imgPhenomUrl, name, description, type, creatorId }).then(phenomenon => {
    console.log(`Se ha publicado el fenomeno`);
    res.redirect("/phenomena");
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

router.get("/phenomena/:id", isLoggedIn("/auth/login"), (req, res) => {
  let phenomenaId = req.params.id;
  Phenomenon.findById(phenomenaId).then(phenomenon => {
    res.render("phenomena/detail", { phenomenon });
  });
});



module.exports = router;
