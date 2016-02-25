'use strict';

const mongoose = require('mongoose');
const schema = require('./schema/user');
const crypt = require('../helpers/crypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

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
  return jwt.sign(token, process.env.NODE_JWT_SALT);
};

const Model = mongoose.model('User', schema);

module.exports = Model;