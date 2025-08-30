import dotenv from 'dotenv';
import { Strategy } from 'passport-facebook';
import passport from 'passport';
import User from '../../models/User.js';
dotenv.config();
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

// Only initialize Facebook strategy if credentials are available
if (FACEBOOK_CLIENT_ID && FACEBOOK_CLIENT_SECRET) {
  passport.use(new Strategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback"
  }, async (_, __, profile, done) => {
    try {
      const facebookID = profile.id;
      const user = await User.findOne({ facebookID });
      if (user) {
        return done(null, user);
      } else {
        const u = new User({ username: profile.displayName, facebookID: profile.id });
        const savedUser = await u.save();
        console.log("READY USER");
        done(null, savedUser);
      }
    } catch (err) {
      done(err);
    }
  }));
} else {
  console.log('Facebook OAuth not configured - skipping strategy initialization');
}
