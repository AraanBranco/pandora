'use strict';

const debug = require('debug')('pandora:jwt-api');
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../../models/user');

module.exports = () => {
  passport.use('jwt-api', new JWTStrategy({
    secretOrKey: process.env.NODE_JWT_SALT,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
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