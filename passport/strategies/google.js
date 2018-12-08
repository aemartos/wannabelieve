const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const passport = require('passport');
const User = require('../../models/User');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    const googleId = profile.id;
    User.findOne({googleID: googleId}, (err, user) => {
      if (user) {
        return done(null, user);
      } else {
        const u = new User({username:profile.displayName, googleID:profile.id})
        u.save().then(user => {
          console.log("READY USER");
          done(null, user);
        });
      }
    });
  })
);
