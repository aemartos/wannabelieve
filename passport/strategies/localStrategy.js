import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-local';
import User from '../../models/User.js';

passport.use(new Strategy({
  usernameField: 'username',
  passwordField: 'password'
},
  (username, password, done) => {
    User.findOne({
      username
    })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {
            message: 'Incorrect username'
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, {
            message: 'Incorrect password'
          });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));
