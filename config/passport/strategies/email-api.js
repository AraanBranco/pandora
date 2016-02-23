'use strict';

const debug = require('debug')('pandora:email-api');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user');

module.exports = () => {
  passport.use('email-api', new LocalStrategy({
      'usernameField': 'email',
      'passwordField': 'password'
    },
    (email, password, done) => {
      User.findOne({email: email})
        .exec()
        .then((user) => {
          if(user && user.comparePassword(password)){
            done(null, user);
          } else {
            let err = new Error('Email or password invalid');
            err.status = 401;
            done(err);
          }
        })
        .catch(done);
    }
  ));
};