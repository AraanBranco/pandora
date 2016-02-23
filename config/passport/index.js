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
  debug('Loaded Strategies');
  require('./strategies/email-api');
};