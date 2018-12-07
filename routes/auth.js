const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get("/login", isLoggedOut('/map'), (req, res, next) => {
  res.render("auth/login", {
    message: req.flash("error"),
    actual_page: 'login'
  });
});

router.post("/login",  isLoggedOut('/map'), passport.authenticate("local", {
  successRedirect: "/map",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup",  isLoggedOut('/map'), (req, res, next) => {
  res.render("auth/signup", {actual_page: 'signup'});
});

router.post("/signup",  isLoggedOut('/map'), (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate username, password and email"
    });
    return;
  }

  User.findOne({username}, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {message: "The username already exists"});
      return;
    } else {
      User.findOne({email}, "email", (err, user) => {
        if (user !== null) {
          res.render("auth/signup", {message: "The email already exists"});
          return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
          username,
          email,
          password: hashPass
        });

        newUser.save()
          .then(() => {res.redirect("/")})
          .catch(err => {res.render("auth/signup", {message: "Something went wrong"})})
      });
    }
  });
});

router.get("/facebook",  isLoggedOut('/map'), passport.authenticate("facebook"));
router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/map",
    failureRedirect: "/auth/login"
  })
);

router.get("/logout", isLoggedIn('/auth/login'), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
