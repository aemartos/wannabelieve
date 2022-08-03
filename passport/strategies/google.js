import dotenv from 'dotenv';
import { OAuth2Strategy } from "passport-google-oauth";
import passport from 'passport';
import User from '../../models/User.js';
dotenv.config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, (_, __, profile, done) => {
  const googleID = profile.id;
  User.findOne({ googleID }, (err, user) => {
    if (user) {
      return done(null, user);
    } else {
      const u = new User({ username: profile.displayName, googleID: profile.id })
      u.save().then(user => {
        console.log("READY USER");
        done(null, user);
      });
    }
  });
})
);
