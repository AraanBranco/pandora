'use strict';

const passport = require('passport');

module.exports = () => {
  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize User
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Strategies Auth
  require('./strategies/email-api');
};