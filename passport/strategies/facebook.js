import dotenv from 'dotenv';
import { Strategy } from 'passport-facebook';
import passport from 'passport';
import User from '../../models/User.js';
dotenv.config();
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

passport.use(new Strategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook/callback"
}, (_, __, profile, done) => {
  const facebookID = profile.id;
  User.findOne({ facebookID }, (err, user) => {
    if (user) {
      return done(null, user);
    } else {
      const u = new User({ username: profile.displayName, facebookID: profile.id })
      u.save().then(user => {
        console.log("READY USER");
        done(null, user);
      });
    }
  });
}
));
