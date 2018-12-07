const passport = require('passport');

require('./serializers');
require('./localStrategy');
require('./facebook');
require('./google');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}
