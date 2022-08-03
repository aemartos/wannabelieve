import express from 'express';
import mongoose from 'mongoose';
import { isLoggedIn } from "../middlewares/isLogged.js";

import User from "../models/User.js";
import Phenomenon from "../models/Phenomenon.js";

import { uploadProfilePicture } from "../config/cloudinary.js";

const router = express.Router();

/* GET home page */
router.get("/profile", isLoggedIn("/auth/login"), (req, res, next) => {

  const sightedQuery = { visitorsId: new mongoose.Types.ObjectId(`${req.user._id}`) }
  const registerQuery = { creatorId: new mongoose.Types.ObjectId(`${req.user._id}`) }
  const favQuery = { whoseFavId: new mongoose.Types.ObjectId(`${req.user._id}`) }

  let userCreationDate = `${req.user.createdAt.getDay()}/${req.user.createdAt.getMonth() + 1}/${req.user.createdAt.getFullYear()}`;

  Promise.all([
    Phenomenon.find(sightedQuery),
    Phenomenon.find(registerQuery),
    Phenomenon.find(favQuery)
  ]).then(
    ([sighted, registed, favourites]) => {
      let numSight = sighted.length;
      let numReg = registed.length;
      let numFav = favourites.length;


      console.log(sighted)
      res.render("userProfile", {
        numSight,
        sighted,
        numReg,
        registed,
        numFav,
        favourites,
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

export default router;
