import dotenv from 'dotenv';
import { OAuth2Strategy } from "passport-google-oauth";
import passport from 'passport';
import User from '../../models/User.js';
dotenv.config();
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// Only initialize Google strategy if credentials are available
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  }, async (_, __, profile, done) => {
    try {
      const googleID = profile.id;
      const user = await User.findOne({ googleID });
      if (user) {
        return done(null, user);
      } else {
        const u = new User({ username: profile.displayName, googleID: profile.id });
        const savedUser = await u.save();
        console.log("READY USER");
        done(null, savedUser);
      }
    } catch (err) {
      done(err);
    }
  }));
} else {
  console.log('Google OAuth not configured - skipping strategy initialization');
}
