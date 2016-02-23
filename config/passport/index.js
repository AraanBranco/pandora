'use strict';

const debug = require('debug')('pandora:passport');
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
  debug('Loading Strategies');
  require('./strategies/email-api')();
  require('./strategies/jwt-api')();
};

module.exports.authenticate = (strategy) => passport.authenticate(strategy, {
  session: false,
  failureRedirect: '/api/auth/unauthorized'
});