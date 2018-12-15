const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const {isLoggedOut, isLoggedIn} = require('../middlewares/isLogged');

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get("/login", isLoggedOut('/map'), (req, res, next) => {
  req.flash("error");
  res.render("auth/login", {actual_page: 'login'});
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
    req.flash("error", "indicate username, password and email");
    res.render("auth/signup", {actual_page: 'signup'});
    return;
  }

  User.findOne({username}, "username", (err, user) => {
    if (user !== null) {
      req.flash("error", "the username already exists");
      res.render("auth/signup", {actual_page: 'signup'});
      return;
    } else {
      User.findOne({email}, "email", (err, user) => {
        if (user !== null) {
          req.flash("error", "the email already exists");
          res.render("auth/signup", {actual_page: 'signup'});
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
          .then(() => {res.redirect("/auth/signupOK")})
          .catch(err => {
            req.flash("error", "something went wrong");
            res.render("auth/signup", {actual_page: 'signupOK'})
          });
      });
    }
  });
});

router.get("/signupOK",  isLoggedOut('/map'), (req, res, next) => {
  res.render("auth/signupOK", {actual_page: 'signupOK'});
});

router.get("/facebook",  isLoggedOut('/map'), passport.authenticate("facebook"));
router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/map",
    failureRedirect: "/auth/login"
  })
);

router.get("/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "/map",
  failureRedirect: "/auth/login"
}));

router.get("/logout", isLoggedIn('/auth/login'), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
