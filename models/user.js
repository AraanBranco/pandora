'use strict';

const mongoose = require('mongoose');
const schema = require('./schema/user');
const crypt = require('../helpers/crypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');

// Methods
schema.methods.generate = function(password) {
  return crypt.hash(password);
};

schema.methods.comparePassword = function(password) {
  return crypt.compare(password, this.password);
};

schema.methods.getToken = function() {
  let token = _.pick(this.toObject(), '_id');
  token.aud = 'api';
  return jwt.sign(token, config.hash.jwt);
};

const Model = mongoose.model('User', schema);

module.exports = Model;