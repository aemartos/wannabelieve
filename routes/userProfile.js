const express = require("express");
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require("../middlewares/isLogged");

const User = require("../models/User");
const Phenomenon = require("../models/Phenomenon");
const ObjectId = require("mongoose").Types.ObjectId;

const uploadMethods = require("../config/cloudinary.js");
const uploadProfilePicture = uploadMethods.uploadProfilePicture;

/* GET home page */
router.get("/profile", isLoggedIn("/auth/login"), (req, res, next) => {
  let queryReg = { creatorId: new ObjectId(`${req.user._id}`) };
  let queryVisits = { visitorsId: new ObjectId(`${req.user._id}`) };
  let numFavs = req.user.favPhenoms.length
  let userCreationDate = `${req.user.createdAt.getDay()}/${req.user.createdAt.getMonth()}/${req.user.createdAt.getFullYear()}`;

  Promise.all([Phenomenon.find(queryReg), Phenomenon.find(queryVisits)]).then(
    ([phenReg, phenVisits]) => {
      let numberReg = phenReg.length;
      let numberVisits = phenVisits.length;

      res.render("userProfile", {
        numFavs,
        numberReg,
        numberVisits,
        userCreationDate,
        actual_page: "userProfile_page",
        profile: true
      });
    }
  );
});

router.get("/profile/edit", isLoggedIn("/auth/login"), (req, res, next) => {
  res.render("userProfile/edit", { actual_page: "editUserProfile_page" });
});

router.post("/editProfile", uploadProfilePicture.single("file"), (req, res) => {
  if (req.file == undefined) {
    var photoProfile = null;
  } else {
    photoProfile = req.file.url;
  }

  const { username, email, userId, caption, description } = req.body;

  User.findByIdAndUpdate(userId, { username, email, photoProfile, caption, description }).then(() =>
    res.redirect(`/profile`)
  );
});

module.exports = router;
