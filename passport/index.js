const passport = require('passport');

require('./serializers');
require('./strategies/localStrategy');
require('./strategies/facebook');
require('./strategies/google');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}
