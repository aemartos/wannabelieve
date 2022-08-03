import passport from 'passport';

import './serializers.js';
import './strategies/localStrategy.js';
import './strategies/facebook.js';
import './strategies/google.js';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}
