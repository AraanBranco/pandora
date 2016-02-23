'use strict';

const debug = require('debug')('pandora:jwt-api');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../../../models/user');
const config = require('config');

module.exports = () => {
  passport.use('jwt-api', new JWTStrategy({
    secretOrKey: config.hash.jwt,
    audience: 'api'
  },
  (jwtPayload, done) => {
    let id = jwtPayload._id;

    User.findOne({_id: id})
      .exec()
      .then((user) => {
        done(null, user);
      })
      .catch(done);
  }
  ));
};